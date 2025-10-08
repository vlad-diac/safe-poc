#!/usr/bin/env python3
"""
Advanced Multi-Website Crawler with Adaptive Content Extraction
Uses Crawlee for intelligent crawling and Trafilatura for universal content extraction
"""

import asyncio
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Dict, List
import re

from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext
from crawlee.storages import Dataset
from trafilatura import extract, extract_metadata
from trafilatura.settings import use_config
import trafilatura


class AdvancedMultiSiteCrawler:
    """
    Advanced crawler that works dynamically with any website structure.
    
    Features:
    - Uses Crawlee for robust crawling with automatic retries and rate limiting
    - Uses Trafilatura for intelligent content extraction (works on any site)
    - Adaptive extraction of main content, metadata, links, and code snippets
    - Better handling of different website structures
    """
    
    def __init__(self, sitemap_path: str, output_dir: str = "output"):
        """Initialize the advanced crawler."""
        self.sitemap_path = sitemap_path
        self.output_dir = Path(output_dir)
        self.dataset = None
        
        # Configure trafilatura for better extraction
        self.config = use_config()
        self.config.set("DEFAULT", "EXTRACTION_TIMEOUT", "0")
        
    def parse_sitemap(self) -> List[Dict[str, str]]:
        """Parse sitemap XML and extract URLs."""
        tree = ET.parse(self.sitemap_path)
        root = tree.getroot()
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        urls = []
        for url_elem in root.findall('ns:url', namespace):
            loc = url_elem.find('ns:loc', namespace)
            lastmod = url_elem.find('ns:lastmod', namespace)
            priority = url_elem.find('ns:priority', namespace)
            
            if loc is not None:
                urls.append({
                    'url': loc.text,
                    'lastmod': lastmod.text if lastmod is not None else '',
                    'priority': priority.text if priority is not None else ''
                })
        
        return urls
    
    def extract_with_trafilatura(self, html: str, url: str) -> Dict:
        """
        Use Trafilatura to intelligently extract content from any website.
        This works across different website structures automatically.
        """
        # Extract main content with metadata
        extracted_text = extract(
            html,
            output_format='markdown',
            include_comments=False,
            include_tables=True,
            include_links=True,
            with_metadata=False,
            config=self.config
        )
        
        # Extract metadata separately for more control
        metadata = extract_metadata(html)
        
        # Also get JSON format for structured data
        extracted_json = extract(
            html,
            output_format='json',
            include_comments=False,
            include_tables=True,
            include_links=True,
            with_metadata=True,
            config=self.config
        )
        
        result = {
            'url': url,
            'markdown_content': extracted_text or '',
            'metadata': {},
            'structured_data': extracted_json
        }
        
        # Parse metadata
        if metadata:
            result['metadata'] = {
                'title': metadata.title or '',
                'author': metadata.author or '',
                'description': metadata.description or '',
                'sitename': metadata.sitename or '',
                'date': metadata.date or '',
                'categories': metadata.categories or [],
                'tags': metadata.tags or [],
                'language': metadata.language or ''
            }
        
        return result
    
    def extract_code_snippets(self, soup) -> List[Dict[str, str]]:
        """Extract code snippets from BeautifulSoup object."""
        snippets = []
        code_blocks = soup.find_all(['pre', 'code'])
        
        for block in code_blocks:
            # Skip inline code
            if block.name == 'code' and block.parent.name != 'pre':
                continue
            
            code_text = block.get_text()
            if not code_text.strip():
                continue
            
            # Try to detect language
            language = ''
            classes = block.get('class', [])
            for cls in classes:
                if isinstance(cls, str):
                    if cls.startswith('language-'):
                        language = cls.replace('language-', '')
                    elif cls.startswith('lang-'):
                        language = cls.replace('lang-', '')
            
            # Also check parent pre tag
            if not language and block.name == 'code' and block.parent.name == 'pre':
                parent_classes = block.parent.get('class', [])
                for cls in parent_classes:
                    if isinstance(cls, str):
                        if cls.startswith('language-'):
                            language = cls.replace('language-', '')
                        elif cls.startswith('lang-'):
                            language = cls.replace('lang-', '')
            
            snippets.append({
                'language': language,
                'code': code_text
            })
        
        return snippets
    
    def extract_links(self, soup, base_url: str) -> List[Dict[str, str]]:
        """Extract all links from the page."""
        from urllib.parse import urljoin
        
        links = []
        for link in soup.find_all('a', href=True):
            href = link.get('href')
            text = link.get_text(strip=True)
            absolute_url = urljoin(base_url, href)
            
            links.append({
                'text': text,
                'url': absolute_url,
                'is_internal': 'docs.safe.global' in absolute_url
            })
        
        return links
    
    def create_markdown_output(self, data: Dict, code_snippets: List, 
                              links: List, sitemap_metadata: Dict) -> str:
        """Create comprehensive markdown output."""
        parts = []
        
        # Frontmatter
        parts.append("---")
        parts.append(f"url: {data['url']}")
        
        metadata = data.get('metadata', {})
        if metadata.get('title'):
            parts.append(f"title: {metadata['title']}")
        if metadata.get('description'):
            parts.append(f"description: {metadata['description']}")
        if metadata.get('author'):
            parts.append(f"author: {metadata['author']}")
        if metadata.get('date'):
            parts.append(f"date: {metadata['date']}")
        if sitemap_metadata.get('lastmod'):
            parts.append(f"lastmod: {sitemap_metadata['lastmod']}")
        if sitemap_metadata.get('priority'):
            parts.append(f"priority: {sitemap_metadata['priority']}")
        if metadata.get('language'):
            parts.append(f"language: {metadata['language']}")
        if metadata.get('sitename'):
            parts.append(f"sitename: {metadata['sitename']}")
        if metadata.get('categories'):
            parts.append(f"categories: {', '.join(metadata['categories'])}")
        if metadata.get('tags'):
            parts.append(f"tags: {', '.join(metadata['tags'])}")
        
        parts.append("---")
        parts.append("")
        
        # Main title
        if metadata.get('title'):
            parts.append(f"# {metadata['title']}")
            parts.append("")
        
        # Main content (already in markdown format from Trafilatura)
        if data.get('markdown_content'):
            parts.append(data['markdown_content'])
            parts.append("")
        
        # Code snippets summary
        if code_snippets:
            parts.append("---")
            parts.append("")
            parts.append("## Code Snippets")
            parts.append("")
            parts.append(f"This page contains **{len(code_snippets)}** code snippet(s).")
            parts.append("")
            
            # Count by language
            languages = {}
            for snippet in code_snippets:
                lang = snippet['language'] or 'unknown'
                languages[lang] = languages.get(lang, 0) + 1
            
            if languages:
                parts.append("**Languages:**")
                for lang, count in sorted(languages.items()):
                    parts.append(f"- `{lang}`: {count}")
                parts.append("")
        
        # Links summary
        if links:
            internal_links = [l for l in links if l.get('is_internal')]
            external_links = [l for l in links if not l.get('is_internal')]
            
            parts.append("---")
            parts.append("")
            parts.append("## Related Links")
            parts.append("")
            
            if internal_links:
                parts.append("### Internal Documentation Links")
                parts.append("")
                # Remove duplicates and limit
                seen = set()
                for link in internal_links[:30]:
                    url = link['url']
                    if url not in seen and url != data['url']:
                        seen.add(url)
                        text = link['text'] if link['text'] else url
                        parts.append(f"- [{text}]({url})")
                parts.append("")
            
            if external_links:
                parts.append("### External References")
                parts.append("")
                seen = set()
                for link in external_links[:15]:
                    url = link['url']
                    if url not in seen:
                        seen.add(url)
                        text = link['text'] if link['text'] else url
                        parts.append(f"- [{text}]({url})")
                parts.append("")
        
        return "\n".join(parts)
    
    def url_to_filename(self, url: str) -> str:
        """Convert URL to a safe filename."""
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
    
    async def crawl(self):
        """Main crawl method using Crawlee and Trafilatura."""
        # Create output directory
        self.output_dir.mkdir(parents=True, exist_ok=True)
        print(f"📁 Output directory: {self.output_dir}")
        
        # Parse sitemap
        urls = self.parse_sitemap()
        print(f"🔍 Found {len(urls)} URLs in sitemap\n")
        
        # Create sitemap lookup for metadata
        sitemap_lookup = {item['url']: item for item in urls}
        
        # Statistics
        stats = {
            'processed': 0,
            'successful': 0,
            'failed': 0
        }
        
        # Initialize Crawlee crawler with adjusted settings
        crawler = BeautifulSoupCrawler(
            max_requests_per_crawl=len(urls) + 10,  # Add buffer
            max_request_retries=3,
            max_crawl_depth=0,  # Don't follow links, only crawl provided URLs
            max_session_rotations=1,
            # Disable aggressive autoscaling
            autoscaled_pool_options={
                'desired_concurrency': 2,  # Keep it low and stable
                'max_concurrency': 3,
            },
        )
        
        @crawler.router.default_handler
        async def request_handler(context: BeautifulSoupCrawlingContext) -> None:
            """Handle each request with intelligent extraction."""
            url = context.request.url
            stats['processed'] += 1
            
            print(f"[{stats['processed']}/{len(urls)}] Processing: {url}")
            
            try:
                # Get the HTML content
                html = str(context.soup)
                
                # Use Trafilatura for intelligent content extraction
                extracted_data = self.extract_with_trafilatura(html, url)
                
                # Extract additional elements
                code_snippets = self.extract_code_snippets(context.soup)
                links = self.extract_links(context.soup, url)
                
                # Get sitemap metadata
                sitemap_meta = sitemap_lookup.get(url, {})
                
                # Create markdown
                markdown = self.create_markdown_output(
                    extracted_data, 
                    code_snippets, 
                    links,
                    sitemap_meta
                )
                
                # Save to file
                filename = self.url_to_filename(url)
                output_path = self.output_dir / filename
                
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(markdown)
                
                print(f"  ✓ Saved: {filename}")
                print(f"    - {len(code_snippets)} code snippets")
                print(f"    - {len(links)} links")
                
                stats['successful'] += 1
                
                # Push data to Crawlee dataset (optional, for analysis)
                await context.push_data({
                    'url': url,
                    'filename': filename,
                    'code_snippets_count': len(code_snippets),
                    'links_count': len(links),
                    'title': extracted_data.get('metadata', {}).get('title', '')
                })
                
            except Exception as e:
                stats['failed'] += 1
                print(f"  ✗ Error: {e}")
        
        # Run the crawler with all URLs from sitemap
        url_list = [url_data['url'] for url_data in urls]
        print(f"🚀 Starting crawl of {len(url_list)} URLs...\n")
        
        await crawler.run(url_list)
        
        # Print summary
        print("\n" + "="*50)
        print("📊 Crawling Summary")
        print("="*50)
        print(f"Total URLs: {len(urls)}")
        print(f"✓ Successful: {stats['successful']}")
        print(f"✗ Failed: {stats['failed']}")
        print(f"📁 Files saved to: {self.output_dir.absolute()}")
        print("="*50)


async def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Advanced multi-website crawler with adaptive content extraction'
    )
    parser.add_argument(
        '--sitemap',
        default='data/safe-sitemap.xml',
        help='Path to sitemap XML file'
    )
    parser.add_argument(
        '--output',
        default='output',
        help='Output directory for markdown files'
    )
    
    args = parser.parse_args()
    
    print("🚀 Advanced Multi-Website Crawler")
    print("=" * 50)
    print("Features:")
    print("  ✓ Adaptive content extraction (works on any website)")
    print("  ✓ Intelligent main content detection")
    print("  ✓ Automatic metadata extraction")
    print("  ✓ Smart retry and rate limiting")
    print("  ✓ Code snippet detection")
    print("  ✓ Link analysis")
    print("=" * 50)
    print()
    
    crawler = AdvancedMultiSiteCrawler(args.sitemap, args.output)
    await crawler.crawl()


if __name__ == '__main__':
    asyncio.run(main())
