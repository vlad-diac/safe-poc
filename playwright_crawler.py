#!/usr/bin/env python3
"""
Playwright-based Crawler for JavaScript-Heavy Websites
Uses Crawlee's PlaywrightCrawler for sites that require JavaScript rendering
"""

import asyncio
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Dict, List
import re

from crawlee.crawlers import PlaywrightCrawler, PlaywrightCrawlingContext
from trafilatura import extract, extract_metadata
from trafilatura.settings import use_config


class JavaScriptSiteCrawler:
    """
    Crawler for JavaScript-heavy websites using headless browser.
    
    Best for:
    - Single Page Applications (React, Vue, Angular)
    - Sites with dynamic content loading
    - Sites that require user interactions
    - Sites with heavy client-side rendering
    """
    
    def __init__(self, sitemap_path: str, output_dir: str = "output-js"):
        self.sitemap_path = sitemap_path
        self.output_dir = Path(output_dir)
        self.config = use_config()
        self.config.set("DEFAULT", "EXTRACTION_TIMEOUT", "0")
        
    def parse_sitemap(self) -> List[Dict[str, str]]:
        """Parse sitemap XML."""
        tree = ET.parse(self.sitemap_path)
        root = tree.getroot()
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        urls = []
        for url_elem in root.findall('ns:url', namespace):
            loc = url_elem.find('ns:loc', namespace)
            if loc is not None:
                lastmod = url_elem.find('ns:lastmod', namespace)
                priority = url_elem.find('ns:priority', namespace)
                urls.append({
                    'url': loc.text,
                    'lastmod': lastmod.text if lastmod is not None else '',
                    'priority': priority.text if priority is not None else ''
                })
        return urls
    
    def extract_content(self, html: str, url: str) -> Dict:
        """Extract content using Trafilatura."""
        extracted_text = extract(
            html,
            output_format='markdown',
            include_comments=False,
            include_tables=True,
            include_links=True,
            with_metadata=False,
            config=self.config
        )
        
        metadata = extract_metadata(html)
        
        result = {
            'url': url,
            'markdown_content': extracted_text or '',
            'metadata': {}
        }
        
        if metadata:
            result['metadata'] = {
                'title': metadata.title or '',
                'author': metadata.author or '',
                'description': metadata.description or '',
                'date': metadata.date or '',
            }
        
        return result
    
    def url_to_filename(self, url: str) -> str:
        """Convert URL to filename."""
        from urllib.parse import urlparse
        parsed = urlparse(url)
        path = parsed.path.strip('/')
        filename = path.replace('/', '-')
        filename = re.sub(r'[<>:"|?*]', '', filename)
        if not filename:
            filename = 'index'
        if not filename.endswith('.md'):
            filename += '.md'
        return filename
    
    def create_markdown(self, data: Dict, sitemap_meta: Dict) -> str:
        """Create markdown output."""
        parts = []
        parts.append("---")
        parts.append(f"url: {data['url']}")
        
        metadata = data.get('metadata', {})
        if metadata.get('title'):
            parts.append(f"title: {metadata['title']}")
        if metadata.get('description'):
            parts.append(f"description: {metadata['description']}")
        if sitemap_meta.get('lastmod'):
            parts.append(f"lastmod: {sitemap_meta['lastmod']}")
        
        parts.append("---")
        parts.append("")
        
        if metadata.get('title'):
            parts.append(f"# {metadata['title']}")
            parts.append("")
        
        if data.get('markdown_content'):
            parts.append(data['markdown_content'])
        
        return "\n".join(parts)
    
    async def crawl(self):
        """Crawl with Playwright for JavaScript rendering."""
        self.output_dir.mkdir(parents=True, exist_ok=True)
        print(f"🎭 Playwright Crawler - For JavaScript-Heavy Sites")
        print(f"📁 Output directory: {self.output_dir}\n")
        
        urls = self.parse_sitemap()
        print(f"🔍 Found {len(urls)} URLs\n")
        
        sitemap_lookup = {item['url']: item for item in urls}
        stats = {'processed': 0, 'successful': 0, 'failed': 0}
        
        # Configure Playwright crawler
        crawler = PlaywrightCrawler(
            max_requests_per_crawl=len(urls),
            max_request_retries=3,
            headless=True,  # Run in headless mode
            browser_type='chromium',  # Can be 'chromium', 'firefox', or 'webkit'
        )
        
        @crawler.router.default_handler
        async def request_handler(context: PlaywrightCrawlingContext) -> None:
            """Handle requests with browser automation."""
            url = context.request.url
            stats['processed'] += 1
            
            print(f"[{stats['processed']}/{len(urls)}] 🎭 Rendering: {url}")
            
            try:
                # Wait for page to fully load
                await context.page.wait_for_load_state('networkidle')
                
                # Optional: Wait for specific selectors if needed
                # await context.page.wait_for_selector('main', timeout=5000)
                
                # Get the rendered HTML
                html = await context.page.content()
                
                # Extract content
                extracted_data = self.extract_content(html, url)
                sitemap_meta = sitemap_lookup.get(url, {})
                markdown = self.create_markdown(extracted_data, sitemap_meta)
                
                # Save file
                filename = self.url_to_filename(url)
                output_path = self.output_dir / filename
                
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(markdown)
                
                print(f"  ✓ Saved: {filename}")
                stats['successful'] += 1
                
                await context.push_data({
                    'url': url,
                    'filename': filename,
                    'title': extracted_data.get('metadata', {}).get('title', '')
                })
                
            except Exception as e:
                stats['failed'] += 1
                print(f"  ✗ Error: {e}")
        
        # Run crawler
        await crawler.run([url_data['url'] for url_data in urls])
        
        # Summary
        print(f"\n{'='*50}")
        print("📊 Summary")
        print(f"{'='*50}")
        print(f"Total: {len(urls)}")
        print(f"✓ Successful: {stats['successful']}")
        print(f"✗ Failed: {stats['failed']}")
        print(f"📁 Output: {self.output_dir.absolute()}")


async def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Playwright crawler for JavaScript-heavy websites'
    )
    parser.add_argument('--sitemap', default='data/safe-sitemap.xml')
    parser.add_argument('--output', default='output-js')
    
    args = parser.parse_args()
    
    print("🚀 Installing Playwright browsers (first time only)...")
    print("   Run: playwright install chromium")
    print()
    
    crawler = JavaScriptSiteCrawler(args.sitemap, args.output)
    await crawler.crawl()


if __name__ == '__main__':
    asyncio.run(main())
