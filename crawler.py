#!/usr/bin/env python3
"""
Safe Documentation Crawler
Crawls documentation pages from sitemap and converts them to markdown files.
Enhanced with recursive crawling and JSON export for RAG indexing.
"""

import os
import json
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse, urljoin, urldefrag, quote
import time
import re
from typing import Dict, List, Tuple, Set, Optional
from collections import deque
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md


class SafeDocsCrawler:
    def __init__(self, sitemap_path: str, output_dir: str = "output", 
                 base_domain: str = "docs.safe.global", recursive: bool = True,
                 max_depth: int = 5, auto_discover_sitemaps: bool = True,
                 use_xml_sitemaps: bool = False, xml_sitemaps_url: Optional[str] = None):
        """
        Initialize the crawler.
        
        Args:
            sitemap_path: Path to the sitemap XML file
            output_dir: Directory to save markdown files
            base_domain: Base domain to restrict crawling to
            recursive: Whether to recursively crawl links
            max_depth: Maximum depth for recursive crawling
            auto_discover_sitemaps: Whether to discover and parse additional sitemaps
            use_xml_sitemaps: Whether to use xml-sitemaps.com to generate sitemap
            xml_sitemaps_url: Starting URL for xml-sitemaps.com crawler
        """
        self.sitemap_path = sitemap_path
        self.output_dir = Path(output_dir)
        self.base_domain = base_domain
        self.recursive = recursive
        self.max_depth = max_depth
        self.auto_discover_sitemaps = auto_discover_sitemaps
        self.use_xml_sitemaps = use_xml_sitemaps
        self.xml_sitemaps_url = xml_sitemaps_url
        
        # Tracking sets and data structures
        self.visited_urls: Set[str] = set()
        self.url_queue: deque = deque()
        self.url_metadata: Dict[str, Dict] = {}
        self.link_graph: Dict[str, Dict[str, List[str]]] = {}
        self.page_data: List[Dict] = []
        self.processed_sitemaps: Set[str] = set()
        self.navigation_links: Set[str] = set()
        
        # Statistics
        self.stats = {
            'total_visited': 0,
            'total_skipped': 0,
            'total_failed': 0,
            'sitemaps_discovered': 0,
            'navigation_links_found': 0,
            'start_time': None,
            'end_time': None
        }
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
    def parse_sitemap(self, sitemap_source: str) -> List[Dict[str, str]]:
        """
        Parse a sitemap XML file or URL and extract URLs with metadata.
        
        Args:
            sitemap_source: Path to local sitemap file or URL to remote sitemap
            
        Returns:
            List of dictionaries containing URL information
        """
        try:
            # Check if it's a URL or local file
            if sitemap_source.startswith(('http://', 'https://')):
                # Fetch remote sitemap
                response = self.session.get(sitemap_source, timeout=30)
                response.raise_for_status()
                root = ET.fromstring(response.content)
            else:
                # Parse local file
                tree = ET.parse(sitemap_source)
                root = tree.getroot()
            
            # Handle XML namespace
            namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            
            urls = []
            
            # Check if this is a sitemap index (contains other sitemaps)
            sitemap_elems = root.findall('ns:sitemap', namespace)
            if sitemap_elems:
                print(f"  Found sitemap index with {len(sitemap_elems)} sub-sitemaps")
                for sitemap_elem in sitemap_elems:
                    loc = sitemap_elem.find('ns:loc', namespace)
                    if loc is not None and loc.text not in self.processed_sitemaps:
                        print(f"  → Parsing sub-sitemap: {loc.text}")
                        self.processed_sitemaps.add(loc.text)
                        sub_urls = self.parse_sitemap(loc.text)
                        urls.extend(sub_urls)
                return urls
            
            # Parse regular sitemap
            for url_elem in root.findall('ns:url', namespace):
                url_data = {}
                loc = url_elem.find('ns:loc', namespace)
                lastmod = url_elem.find('ns:lastmod', namespace)
                priority = url_elem.find('ns:priority', namespace)
                
                if loc is not None:
                    url_data['url'] = loc.text
                    url_data['lastmod'] = lastmod.text if lastmod is not None else ''
                    url_data['priority'] = priority.text if priority is not None else ''
                    urls.append(url_data)
            
            return urls
        except Exception as e:
            print(f"  ✗ Failed to parse sitemap {sitemap_source}: {e}")
            return []
    
    def fetch_page(self, url: str) -> Tuple[BeautifulSoup, requests.Response]:
        """
        Fetch a page and return BeautifulSoup object.
        
        Args:
            url: URL to fetch
            
        Returns:
            Tuple of (BeautifulSoup object, Response object)
        """
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            return soup, response
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None, None
    
    def extract_metadata(self, soup: BeautifulSoup, url: str, sitemap_data: Dict) -> Dict[str, str]:
        """
        Extract metadata from the page.
        
        Args:
            soup: BeautifulSoup object
            url: Page URL
            sitemap_data: Data from sitemap
            
        Returns:
            Dictionary containing metadata
        """
        metadata = {
            'url': url,
            'title': '',
            'description': '',
            'lastmod': sitemap_data.get('lastmod', ''),
            'priority': sitemap_data.get('priority', ''),
        }
        
        # Extract title
        title_tag = soup.find('title')
        if title_tag:
            metadata['title'] = title_tag.get_text(strip=True)
        
        # Try to find h1 if title is not descriptive
        h1_tag = soup.find('h1')
        if h1_tag and not metadata['title']:
            metadata['title'] = h1_tag.get_text(strip=True)
        
        # Extract description from meta tags
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            metadata['description'] = meta_desc.get('content')
        
        # Extract Open Graph metadata
        og_desc = soup.find('meta', property='og:description')
        if og_desc and og_desc.get('content') and not metadata['description']:
            metadata['description'] = og_desc.get('content')
        
        return metadata
    
    def extract_main_content(self, soup: BeautifulSoup) -> BeautifulSoup:
        """
        Extract the main content area from the page.
        
        Args:
            soup: BeautifulSoup object
            
        Returns:
            BeautifulSoup object containing main content
        """
        # Try common content selectors
        main_content = None
        
        # Try various common content container selectors
        selectors = [
            'main',
            'article',
            '[role="main"]',
            '.main-content',
            '.content',
            '#content',
            '.documentation-content',
            '.doc-content',
        ]
        
        for selector in selectors:
            main_content = soup.select_one(selector)
            if main_content:
                break
        
        # If no main content found, try to find the largest content div
        if not main_content:
            # Look for divs with substantial content
            divs = soup.find_all('div')
            max_length = 0
            for div in divs:
                text_length = len(div.get_text(strip=True))
                if text_length > max_length:
                    max_length = text_length
                    main_content = div
        
        return main_content if main_content else soup
    
    def extract_sections(self, content: BeautifulSoup) -> List[Dict[str, str]]:
        """
        Extract sections with headers from content.
        
        Args:
            content: BeautifulSoup object
            
        Returns:
            List of sections with headers and content
        """
        sections = []
        
        # Find all headers
        headers = content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        
        for i, header in enumerate(headers):
            section = {
                'level': int(header.name[1]),
                'title': header.get_text(strip=True),
                'id': header.get('id', ''),
                'content': ''
            }
            
            # Get content until next header
            current = header.next_sibling
            content_parts = []
            
            while current:
                if hasattr(current, 'name') and current.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
                    break
                if hasattr(current, 'get_text'):
                    text = current.get_text(strip=True)
                    if text:
                        content_parts.append(text)
                current = current.next_sibling
            
            section['content'] = ' '.join(content_parts)
            sections.append(section)
        
        return sections
    
    def normalize_url(self, url: str) -> str:
        """
        Normalize URL by removing fragments and trailing slashes.
        
        Args:
            url: URL to normalize
            
        Returns:
            Normalized URL
        """
        # Remove fragments
        url, _ = urldefrag(url)
        # Remove trailing slash
        url = url.rstrip('/')
        return url
    
    def is_valid_url(self, url: str) -> bool:
        """
        Check if URL is valid for crawling.
        
        Args:
            url: URL to check
            
        Returns:
            True if valid, False otherwise
        """
        if not url:
            return False
        
        # Skip non-http(s) URLs
        if not url.startswith(('http://', 'https://')):
            return False
        
        # Skip files
        if url.endswith(('.pdf', '.zip', '.jpg', '.png', '.gif', '.svg', '.css', '.js')):
            return False
        
        # Only crawl same domain
        if self.base_domain not in url:
            return False
        
        return True
    
    def extract_navigation_links(self, soup: BeautifulSoup, base_url: str) -> List[str]:
        """
        Extract links specifically from navigation elements.
        
        Args:
            soup: BeautifulSoup object
            base_url: Base URL for resolving relative links
            
        Returns:
            List of navigation URLs
        """
        nav_links = []
        
        # Common navigation selectors
        nav_selectors = [
            'nav',
            'header nav',
            '[role="navigation"]',
            '.navigation',
            '.nav',
            '.menu',
            '.sidebar',
            '.side-nav',
            '[class*="nav"]',
            '[id*="nav"]',
        ]
        
        for selector in nav_selectors:
            nav_elements = soup.select(selector)
            for nav in nav_elements:
                for link in nav.find_all('a', href=True):
                    href = link.get('href')
                    absolute_url = urljoin(base_url, href)
                    absolute_url = self.normalize_url(absolute_url)
                    
                    if self.is_valid_url(absolute_url) and absolute_url not in nav_links:
                        nav_links.append(absolute_url)
        
        return nav_links
    
    def extract_links(self, content: BeautifulSoup, base_url: str) -> List[Dict[str, str]]:
        """
        Extract all links from content.
        
        Args:
            content: BeautifulSoup object
            base_url: Base URL for resolving relative links
            
        Returns:
            List of links with text and URLs
        """
        links = []
        
        for link in content.find_all('a', href=True):
            href = link.get('href')
            text = link.get_text(strip=True)
            
            # Resolve relative URLs
            absolute_url = urljoin(base_url, href)
            absolute_url = self.normalize_url(absolute_url)
            
            is_internal = self.base_domain in absolute_url
            
            links.append({
                'text': text,
                'url': absolute_url,
                'is_internal': is_internal
            })
        
        return links
    
    def extract_code_snippets(self, content: BeautifulSoup) -> List[Dict[str, str]]:
        """
        Extract code snippets from content.
        
        Args:
            content: BeautifulSoup object
            
        Returns:
            List of code snippets with language and content
        """
        snippets = []
        
        # Find code blocks
        code_blocks = content.find_all(['pre', 'code'])
        
        for block in code_blocks:
            # Skip inline code
            if block.name == 'code' and block.parent.name != 'pre':
                continue
            
            code_text = block.get_text()
            
            # Try to detect language
            language = ''
            classes = block.get('class', [])
            for cls in classes:
                if cls.startswith('language-'):
                    language = cls.replace('language-', '')
                elif cls.startswith('lang-'):
                    language = cls.replace('lang-', '')
            
            # Also check parent pre tag
            if not language and block.name == 'code' and block.parent.name == 'pre':
                parent_classes = block.parent.get('class', [])
                for cls in parent_classes:
                    if cls.startswith('language-'):
                        language = cls.replace('language-', '')
                    elif cls.startswith('lang-'):
                        language = cls.replace('lang-', '')
            
            snippets.append({
                'language': language,
                'code': code_text
            })
        
        return snippets
    
    def convert_to_markdown(self, soup: BeautifulSoup, metadata: Dict, 
                           sections: List[Dict], links: List[Dict], 
                           code_snippets: List[Dict]) -> str:
        """
        Convert extracted content to markdown format.
        
        Args:
            soup: Main content BeautifulSoup object
            metadata: Page metadata
            sections: Extracted sections
            links: Extracted links
            code_snippets: Extracted code snippets
            
        Returns:
            Markdown formatted string
        """
        markdown_parts = []
        
        # Add frontmatter with metadata
        markdown_parts.append("---")
        markdown_parts.append(f"title: {metadata['title']}")
        markdown_parts.append(f"url: {metadata['url']}")
        if metadata['description']:
            markdown_parts.append(f"description: {metadata['description']}")
        if metadata['lastmod']:
            markdown_parts.append(f"lastmod: {metadata['lastmod']}")
        if metadata['priority']:
            markdown_parts.append(f"priority: {metadata['priority']}")
        markdown_parts.append("---")
        markdown_parts.append("")
        
        # Add main title
        if metadata['title']:
            markdown_parts.append(f"# {metadata['title']}")
            markdown_parts.append("")
        
        # Convert main content to markdown
        if soup:
            content_md = md(str(soup), heading_style="ATX", bullets="-")
            markdown_parts.append(content_md)
            markdown_parts.append("")
        
        # Add sections information
        if sections:
            markdown_parts.append("---")
            markdown_parts.append("")
            markdown_parts.append("## Document Sections")
            markdown_parts.append("")
            for section in sections:
                indent = "  " * (section['level'] - 1)
                section_id = f" (#{section['id']})" if section['id'] else ""
                markdown_parts.append(f"{indent}- {section['title']}{section_id}")
            markdown_parts.append("")
        
        # Add links information
        if links:
            internal_links = [l for l in links if l['is_internal']]
            external_links = [l for l in links if not l['is_internal']]
            
            markdown_parts.append("---")
            markdown_parts.append("")
            markdown_parts.append("## Related Links")
            markdown_parts.append("")
            
            if internal_links:
                markdown_parts.append("### Internal Links")
                markdown_parts.append("")
                for link in internal_links[:20]:  # Limit to first 20
                    text = link['text'] if link['text'] else link['url']
                    markdown_parts.append(f"- [{text}]({link['url']})")
                markdown_parts.append("")
            
            if external_links:
                markdown_parts.append("### External Links")
                markdown_parts.append("")
                for link in external_links[:10]:  # Limit to first 10
                    text = link['text'] if link['text'] else link['url']
                    markdown_parts.append(f"- [{text}]({link['url']})")
                markdown_parts.append("")
        
        # Add code snippets information
        if code_snippets:
            markdown_parts.append("---")
            markdown_parts.append("")
            markdown_parts.append(f"## Code Snippets")
            markdown_parts.append("")
            markdown_parts.append(f"This page contains {len(code_snippets)} code snippet(s).")
            
            # Count by language
            languages = {}
            for snippet in code_snippets:
                lang = snippet['language'] or 'unknown'
                languages[lang] = languages.get(lang, 0) + 1
            
            if languages:
                markdown_parts.append("")
                markdown_parts.append("**Languages:**")
                for lang, count in languages.items():
                    markdown_parts.append(f"- {lang}: {count}")
            markdown_parts.append("")
        
        return "\n".join(markdown_parts)
    
    def extract_breadcrumbs(self, soup: BeautifulSoup) -> List[Dict[str, str]]:
        """
        Extract breadcrumb navigation from page.
        
        Args:
            soup: BeautifulSoup object
            
        Returns:
            List of breadcrumb items
        """
        breadcrumbs = []
        
        # Try common breadcrumb selectors
        selectors = [
            'nav[aria-label="breadcrumb"]',
            '.breadcrumb',
            '[class*="breadcrumb"]',
            'nav ol',
        ]
        
        for selector in selectors:
            breadcrumb_nav = soup.select_one(selector)
            if breadcrumb_nav:
                for link in breadcrumb_nav.find_all('a'):
                    breadcrumbs.append({
                        'text': link.get_text(strip=True),
                        'url': link.get('href', '')
                    })
                break
        
        return breadcrumbs
    
    def extract_text_chunks(self, content: BeautifulSoup, chunk_size: int = 500) -> List[str]:
        """
        Extract text content and split into chunks for better RAG indexing.
        
        Args:
            content: BeautifulSoup object
            chunk_size: Approximate size of each chunk in words
            
        Returns:
            List of text chunks
        """
        # Get all text
        text = content.get_text(separator=' ', strip=True)
        
        # Split into words
        words = text.split()
        
        # Create chunks
        chunks = []
        for i in range(0, len(words), chunk_size):
            chunk = ' '.join(words[i:i + chunk_size])
            if chunk:
                chunks.append(chunk)
        
        return chunks
    
    def discover_sitemaps(self, base_url: str) -> List[str]:
        """
        Discover potential sitemap URLs for a given base URL.
        
        Args:
            base_url: Base URL to check for sitemaps
            
        Returns:
            List of discovered sitemap URLs
        """
        parsed = urlparse(base_url)
        base_domain_url = f"{parsed.scheme}://{parsed.netloc}"
        
        # Common sitemap locations
        sitemap_paths = [
            '/sitemap.xml',
            '/sitemap_index.xml',
            '/sitemap-index.xml',
            '/sitemaps/sitemap.xml',
            '/sitemap/sitemap.xml',
            '/robots.txt',  # May contain sitemap reference
        ]
        
        discovered = []
        
        for path in sitemap_paths:
            sitemap_url = base_domain_url + path
            
            if sitemap_url in self.processed_sitemaps:
                continue
                
            try:
                response = self.session.head(sitemap_url, timeout=10, allow_redirects=True)
                if response.status_code == 200:
                    # Check content type
                    content_type = response.headers.get('content-type', '').lower()
                    if 'xml' in content_type or path.endswith('.xml'):
                        discovered.append(sitemap_url)
                        print(f"  ✓ Discovered sitemap: {sitemap_url}")
                    elif path.endswith('robots.txt'):
                        # Parse robots.txt for sitemap references
                        response = self.session.get(sitemap_url, timeout=10)
                        for line in response.text.split('\n'):
                            if line.lower().startswith('sitemap:'):
                                sitemap_ref = line.split(':', 1)[1].strip()
                                if sitemap_ref not in self.processed_sitemaps:
                                    discovered.append(sitemap_ref)
                                    print(f"  ✓ Found sitemap in robots.txt: {sitemap_ref}")
            except Exception as e:
                # Silently skip failed attempts
                pass
        
        return discovered
    
    def generate_sitemap_with_xml_sitemaps(self, start_url: str) -> Optional[str]:
        """
        Use xml-sitemaps.com to generate a comprehensive sitemap.
        
        Args:
            start_url: Starting URL to crawl from
            
        Returns:
            Path to downloaded sitemap file or None if failed
        """
        print(f"\n🌐 Using xml-sitemaps.com to generate comprehensive sitemap...")
        print(f"  Starting from: {start_url}")
        
        # URL encode the starting URL
        encoded_url = quote(start_url, safe='')
        
        # Build the crawl API URL
        crawl_url = f"https://www.xml-sitemaps.com/icrawl.php?op=crawlproc&initurl={encoded_url}&lastmod=on&priority=on&freq=&&injs=1"
        
        try:
            # Start the crawl - this returns streaming JSON
            print("  → Initiating crawl...")
            response = self.session.get(crawl_url, stream=True, timeout=120)
            response.raise_for_status()
            
            view_details = None
            total_pages = 0
            
            # Parse streaming JSON responses
            buffer = ""
            for chunk in response.iter_content(chunk_size=1024, decode_unicode=True):
                if chunk:
                    buffer += chunk.decode('utf-8') if isinstance(chunk, bytes) else chunk
                    
                    # Try to parse JSON objects from buffer
                    while '{' in buffer and '}' in buffer:
                        start = buffer.find('{')
                        end = buffer.find('}', start) + 1
                        
                        if end > start:
                            json_str = buffer[start:end]
                            buffer = buffer[end:]
                            
                            try:
                                data = json.loads(json_str)
                                
                                # Check for view_details (the sitemap identifier)
                                if 'view_details' in data:
                                    view_details = data['view_details']
                                    print(f"  ✓ Sitemap generated: {view_details}")
                                
                                # Track progress
                                if 'i' in data and isinstance(data['i'], dict) and 'perc' in data['i']:
                                    perc = data['i'].get('perc', 0)
                                    pages = data['i'].get('ps', 0)
                                    current_page = data['i'].get('cp', '')
                                    print(f"  → Progress: {perc:.1f}% ({pages} pages) - {current_page}")
                                    total_pages = pages
                                
                                # Check if done
                                if data.get('done') == True:
                                    print(f"  ✓ Crawl complete! Found {total_pages} pages")
                                    break
                                    
                            except json.JSONDecodeError:
                                # Not valid JSON, continue
                                pass
                        else:
                            break
                
                # If we have view_details and it's done, break
                if view_details and '"done":true' in buffer:
                    break
            
            if not view_details:
                print("  ✗ Failed to get sitemap identifier from xml-sitemaps.com")
                return None
            
            # Download the generated sitemap
            sitemap_download_url = f"https://www.xml-sitemaps.com/download/{view_details}/sitemap.xml?view=1"
            print(f"  → Downloading sitemap from: {sitemap_download_url}")
            
            sitemap_response = self.session.get(sitemap_download_url, timeout=30)
            sitemap_response.raise_for_status()
            
            # Save to a file
            sitemap_file = self.output_dir / 'generated_sitemap.xml'
            self.output_dir.mkdir(parents=True, exist_ok=True)
            
            with open(sitemap_file, 'w', encoding='utf-8') as f:
                f.write(sitemap_response.text)
            
            print(f"  ✓ Sitemap saved to: {sitemap_file}")
            print(f"  ✓ Total pages in sitemap: {total_pages}")
            
            return str(sitemap_file)
            
        except requests.exceptions.Timeout:
            print("  ✗ Timeout waiting for xml-sitemaps.com (site might be large)")
            return None
        except Exception as e:
            print(f"  ✗ Error generating sitemap with xml-sitemaps.com: {e}")
            return None
    
    def url_to_filename(self, url: str) -> str:
        """
        Convert URL to a valid filename.
        
        Args:
            url: URL to convert
            
        Returns:
            Valid filename string
        """
        parsed = urlparse(url)
        path = parsed.path.strip('/')
        
        # Replace slashes with dashes
        filename = path.replace('/', '-')
        
        # Remove or replace invalid characters
        filename = re.sub(r'[<>:"|?*]', '', filename)
        
        # If empty, use domain
        if not filename:
            filename = 'index'
        
        # Add .md extension
        if not filename.endswith('.md'):
            filename += '.md'
        
        return filename
    
    def process_page(self, url: str, parent_url: Optional[str] = None, 
                    depth: int = 0, sitemap_data: Optional[Dict] = None) -> Optional[Dict]:
        """
        Process a single page and extract all data.
        
        Args:
            url: URL to process
            parent_url: Parent URL that linked to this page
            depth: Current crawling depth
            sitemap_data: Optional data from sitemap
            
        Returns:
            Dictionary with all extracted data or None if failed
        """
        # Fetch page
        soup, response = self.fetch_page(url)
        if not soup:
            return None
        
        # Extract navigation links (priority links)
        nav_links = self.extract_navigation_links(soup, url)
        for nav_url in nav_links:
            if nav_url not in self.navigation_links:
                self.navigation_links.add(nav_url)
        
        # Discover sitemaps from this page if enabled
        if self.auto_discover_sitemaps and depth == 0:  # Only check from root pages
            discovered_sitemaps = self.discover_sitemaps(url)
            for sitemap_url in discovered_sitemaps:
                if sitemap_url not in self.processed_sitemaps:
                    self.processed_sitemaps.add(sitemap_url)
                    self.stats['sitemaps_discovered'] += 1
                    # Parse the discovered sitemap
                    new_urls = self.parse_sitemap(sitemap_url)
                    print(f"  → Found {len(new_urls)} URLs in discovered sitemap")
                    # Add new URLs to queue if not already visited
                    for url_data in new_urls:
                        new_url = self.normalize_url(url_data['url'])
                        if new_url not in self.visited_urls and self.is_valid_url(new_url):
                            if not any(new_url == q[0] for q in self.url_queue):
                                self.url_queue.append((new_url, url, 0, url_data))
        
        # Extract all content
        metadata = self.extract_metadata(soup, url, sitemap_data or {})
        main_content = self.extract_main_content(soup)
        sections = self.extract_sections(main_content)
        links = self.extract_links(main_content, url)
        code_snippets = self.extract_code_snippets(main_content)
        breadcrumbs = self.extract_breadcrumbs(soup)
        text_chunks = self.extract_text_chunks(main_content)
        
        # Get internal links for recursive crawling
        internal_links = [l['url'] for l in links if l['is_internal']]
        
        # Store link relationships
        self.link_graph[url] = {
            'internal_links': internal_links,
            'external_links': [l['url'] for l in links if not l['is_internal']],
            'parent': parent_url,
            'depth': depth,
            'from_navigation': url in self.navigation_links
        }
        
        # Build comprehensive data structure for RAG
        page_data = {
            # Identification
            'url': url,
            'normalized_url': self.normalize_url(url),
            'filename': self.url_to_filename(url),
            
            # Hierarchy and relationships
            'parent_url': parent_url,
            'depth': depth,
            'breadcrumbs': breadcrumbs,
            
            # Metadata
            'title': metadata['title'],
            'description': metadata['description'],
            'lastmod': metadata.get('lastmod', ''),
            'priority': metadata.get('priority', ''),
            'crawled_at': datetime.utcnow().isoformat(),
            
            # Content for RAG indexing
            'text_chunks': text_chunks,  # Pre-chunked text for vector embedding
            'full_text': ' '.join(text_chunks),  # Complete text content
            
            # Structured content
            'sections': sections,
            'section_count': len(sections),
            
            # Code snippets
            'code_snippets': code_snippets,
            'code_snippet_count': len(code_snippets),
            'code_languages': list(set(s['language'] for s in code_snippets if s['language'])),
            
            # Links and relationships
            'links': {
                'internal': [l for l in links if l['is_internal']],
                'external': [l for l in links if not l['is_internal']],
                'internal_count': len([l for l in links if l['is_internal']]),
                'external_count': len([l for l in links if not l['is_internal']]),
            },
            
            # Sibling pages (pages with same parent)
            'siblings': [],  # Will be populated later
        }
        
        # Convert to markdown
        markdown = self.convert_to_markdown(
            main_content, metadata, sections, links, code_snippets
        )
        
        # Save markdown file
        filename = self.url_to_filename(url)
        output_path = self.output_dir / filename
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(markdown)
        
        return page_data
    
    def add_sibling_relationships(self):
        """
        Add sibling relationships to page data based on parent URLs.
        """
        # Group pages by parent
        children_by_parent = {}
        for page in self.page_data:
            parent = page.get('parent_url')
            if parent:
                if parent not in children_by_parent:
                    children_by_parent[parent] = []
                children_by_parent[parent].append(page['url'])
        
        # Add siblings to each page
        for page in self.page_data:
            parent = page.get('parent_url')
            if parent and parent in children_by_parent:
                siblings = [url for url in children_by_parent[parent] if url != page['url']]
                page['siblings'] = siblings
                page['sibling_count'] = len(siblings)
    
    def save_json_output(self):
        """
        Save comprehensive JSON output for RAG indexing.
        """
        # Add sibling relationships
        self.add_sibling_relationships()
        
        # Prepare output data
        output_data = {
            'metadata': {
                'crawl_date': datetime.utcnow().isoformat(),
                'base_domain': self.base_domain,
                'total_pages': len(self.page_data),
                'statistics': self.stats,
            },
            'pages': self.page_data,
            'link_graph': self.link_graph,
        }
        
        # Save main JSON file
        json_path = self.output_dir / 'crawled_data.json'
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ JSON data saved to: {json_path}")
        
        # Save a flattened version optimized for vector indexing
        vector_data = []
        for page in self.page_data:
            # Create one entry per text chunk for better granularity
            for i, chunk in enumerate(page['text_chunks']):
                vector_entry = {
                    'id': f"{page['url']}#chunk-{i}",
                    'url': page['url'],
                    'chunk_index': i,
                    'total_chunks': len(page['text_chunks']),
                    'text': chunk,
                    'title': page['title'],
                    'description': page['description'],
                    'parent_url': page['parent_url'],
                    'breadcrumbs': page['breadcrumbs'],
                    'depth': page['depth'],
                    'section_titles': [s['title'] for s in page['sections']],
                    'has_code': page['code_snippet_count'] > 0,
                    'code_languages': page['code_languages'],
                }
                vector_data.append(vector_entry)
        
        vector_path = self.output_dir / 'vector_data.json'
        with open(vector_path, 'w', encoding='utf-8') as f:
            json.dump(vector_data, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Vector-optimized data saved to: {vector_path}")
        print(f"  → {len(vector_data)} text chunks ready for embedding")
    
    def crawl(self, delay: float = 1.0):
        """
        Main crawl method - crawls all URLs from sitemap and recursively follows links.
        
        Args:
            delay: Delay between requests in seconds
        """
        self.stats['start_time'] = datetime.utcnow().isoformat()
        
        # Create output directory
        self.output_dir.mkdir(parents=True, exist_ok=True)
        print(f"Created output directory: {self.output_dir}")
        print(f"Recursive crawling: {'enabled' if self.recursive else 'disabled'}")
        print(f"Max depth: {self.max_depth}")
        
        # Generate sitemap using xml-sitemaps.com if requested
        if self.use_xml_sitemaps:
            if not self.xml_sitemaps_url:
                print("⚠ Warning: --use-xml-sitemaps enabled but no --xml-sitemaps-url provided")
                print("  Using default sitemap instead")
            else:
                generated_sitemap = self.generate_sitemap_with_xml_sitemaps(self.xml_sitemaps_url)
                if generated_sitemap:
                    # Use the generated sitemap instead of the original
                    self.sitemap_path = generated_sitemap
                    print(f"✓ Using generated sitemap from xml-sitemaps.com")
                else:
                    print(f"⚠ Failed to generate sitemap, falling back to: {self.sitemap_path}")
        
        # Parse sitemap and add to queue
        sitemap_urls = self.parse_sitemap(self.sitemap_path)
        print(f"Found {len(sitemap_urls)} URLs in sitemap")
        
        # Store sitemap data for reference
        sitemap_map = {data['url']: data for data in sitemap_urls}
        
        # Initialize queue with sitemap URLs at depth 0
        for url_data in sitemap_urls:
            url = self.normalize_url(url_data['url'])
            if url not in self.visited_urls:
                self.url_queue.append((url, None, 0, url_data))
        
        # Process queue
        while self.url_queue:
            url, parent_url, depth, sitemap_data = self.url_queue.popleft()
            
            # Skip if already visited
            if url in self.visited_urls:
                self.stats['total_skipped'] += 1
                continue
            
            # Skip if depth exceeds maximum
            if depth > self.max_depth:
                self.stats['total_skipped'] += 1
                continue
            
            # Mark as visited
            self.visited_urls.add(url)
            self.stats['total_visited'] += 1
            
            print(f"\n[{self.stats['total_visited']}] Processing (depth {depth}): {url}")
            if parent_url:
                print(f"  ← Parent: {parent_url}")
            
            # Process page
            page_data = self.process_page(url, parent_url, depth, sitemap_data)
            
            if page_data:
                self.page_data.append(page_data)
                
                # Extract statistics
                sections = page_data['section_count']
                links = page_data['links']['internal_count'] + page_data['links']['external_count']
                snippets = page_data['code_snippet_count']
                chunks = len(page_data['text_chunks'])
                
                print(f"  → {sections} sections, {links} links, {snippets} code snippets, {chunks} text chunks")
                print(f"  ✓ Saved to: {page_data['filename']}")
                
                # Add internal links to queue if recursive mode enabled
                if self.recursive and depth < self.max_depth:
                    internal_links = page_data['links']['internal']
                    new_urls = 0
                    for link_data in internal_links:
                        link_url = self.normalize_url(link_data['url'])
                        if link_url not in self.visited_urls and self.is_valid_url(link_url):
                            # Check if already in queue
                            if not any(link_url == q[0] for q in self.url_queue):
                                self.url_queue.append((link_url, url, depth + 1, None))
                                new_urls += 1
                    
                    if new_urls > 0:
                        print(f"  → Added {new_urls} new URLs to queue (queue size: {len(self.url_queue)})")
            else:
                print(f"  ✗ Failed to process page")
                self.stats['total_failed'] += 1
            
            # Be polite - add delay between requests
            if self.url_queue:
                time.sleep(delay)
        
        self.stats['end_time'] = datetime.utcnow().isoformat()
        
        # Save JSON output
        self.save_json_output()
        
        # Process navigation links that weren't visited yet
        if self.navigation_links:
            nav_links_to_process = [url for url in self.navigation_links if url not in self.visited_urls]
            if nav_links_to_process:
                print(f"\n🔍 Processing {len(nav_links_to_process)} navigation links not yet visited...")
                for nav_url in nav_links_to_process:
                    if nav_url not in self.visited_urls and self.is_valid_url(nav_url):
                        self.url_queue.append((nav_url, None, 0, None))
                
                # Process the navigation links
                while self.url_queue:
                    url, parent_url, depth, sitemap_data = self.url_queue.popleft()
                    
                    if url in self.visited_urls or depth > self.max_depth:
                        continue
                    
                    self.visited_urls.add(url)
                    self.stats['total_visited'] += 1
                    
                    print(f"\n[NAV-{self.stats['total_visited']}] Processing navigation link: {url}")
                    
                    page_data = self.process_page(url, parent_url, depth, sitemap_data)
                    
                    if page_data:
                        self.page_data.append(page_data)
                        print(f"  ✓ Saved to: {page_data['filename']}")
                        
                        # Add internal links if recursive
                        if self.recursive and depth < self.max_depth:
                            for link_data in page_data['links']['internal']:
                                link_url = self.normalize_url(link_data['url'])
                                if link_url not in self.visited_urls and self.is_valid_url(link_url):
                                    if not any(link_url == q[0] for q in self.url_queue):
                                        self.url_queue.append((link_url, url, depth + 1, None))
                    
                    if self.url_queue:
                        time.sleep(delay)
        
        self.stats['navigation_links_found'] = len(self.navigation_links)
        
        # Print summary
        print("\n" + "="*60)
        print("CRAWLING COMPLETE!")
        print("="*60)
        print(f"Total pages visited: {self.stats['total_visited']}")
        print(f"Total pages skipped: {self.stats['total_skipped']}")
        print(f"Total pages failed: {self.stats['total_failed']}")
        print(f"Navigation links found: {self.stats['navigation_links_found']}")
        print(f"Sitemaps discovered: {self.stats['sitemaps_discovered']}")
        print(f"Markdown files saved to: {self.output_dir.absolute()}")
        print(f"JSON data files saved to: {self.output_dir.absolute()}")
        print("="*60)


def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Crawl Safe documentation and convert to markdown with RAG-optimized JSON export'
    )
    parser.add_argument(
        '--sitemap',
        default='data/safe-sitemap.xml',
        help='Path to sitemap XML file (default: data/safe-sitemap.xml)'
    )
    parser.add_argument(
        '--output',
        default='output',
        help='Output directory for markdown files (default: output)'
    )
    parser.add_argument(
        '--delay',
        type=float,
        default=1.0,
        help='Delay between requests in seconds (default: 1.0)'
    )
    parser.add_argument(
        '--base-domain',
        default='docs.safe.global',
        help='Base domain to restrict crawling (default: docs.safe.global)'
    )
    parser.add_argument(
        '--no-recursive',
        action='store_true',
        help='Disable recursive crawling (only crawl sitemap URLs)'
    )
    parser.add_argument(
        '--max-depth',
        type=int,
        default=5,
        help='Maximum depth for recursive crawling (default: 5)'
    )
    parser.add_argument(
        '--no-discover-sitemaps',
        action='store_true',
        help='Disable automatic sitemap discovery'
    )
    parser.add_argument(
        '--use-xml-sitemaps',
        action='store_true',
        help='Use xml-sitemaps.com to generate a comprehensive sitemap'
    )
    parser.add_argument(
        '--xml-sitemaps-url',
        help='Starting URL for xml-sitemaps.com crawler (e.g., https://docs.safe.global/home/what-is-safe)'
    )
    
    args = parser.parse_args()
    
    # Create crawler and run
    crawler = SafeDocsCrawler(
        args.sitemap, 
        args.output,
        base_domain=args.base_domain,
        recursive=not args.no_recursive,
        max_depth=args.max_depth,
        auto_discover_sitemaps=not args.no_discover_sitemaps,
        use_xml_sitemaps=args.use_xml_sitemaps,
        xml_sitemaps_url=args.xml_sitemaps_url
    )
    crawler.crawl(delay=args.delay)


if __name__ == '__main__':
    main()
