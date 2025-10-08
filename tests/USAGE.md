# Safe Documentation Crawler - Usage Guide

A Python crawler that extracts content from Safe documentation pages and converts them to structured markdown files with comprehensive JSON export for RAG (Retrieval Augmented Generation) indexing.

## Features

- 📄 Parses sitemap XML to discover all documentation pages
- 🔄 **Recursive crawling** - Automatically follows internal links to discover more pages
- 🗺️ **Automatic sitemap discovery** - Finds and parses additional sitemaps (sitemap.xml, robots.txt)
- 🧭 **Navigation link extraction** - Prioritizes links from nav menus and sidebars
- 🔍 Extracts main content, metadata, sections, links, and code snippets
- 📝 Converts HTML to clean markdown format
- 🏷️ Adds frontmatter with metadata (title, URL, description, lastmod, priority)
- 🔗 Catalogs internal and external links with relationship tracking
- 💻 Identifies and categorizes code snippets by language
- 📊 Generates section hierarchies for easy navigation
- 🧠 **JSON export** optimized for RAG/vector database indexing
- 📈 Tracks visited URLs, parent-child relationships, and sibling pages
- 📦 Pre-chunks content for better embedding performance
- 🎯 **Hidden link discovery** - Finds pages not in main sitemap through navigation analysis

## Installation

1. Install Python 3.7 or higher

2. Install required dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

Run the crawler with default settings:
```bash
python crawler.py
```

This will:
- Read the sitemap from `data/safe-sitemap.xml`
- Create an `output/` directory
- Crawl all pages and save markdown files

### Custom Options

```bash
python crawler.py --sitemap path/to/sitemap.xml --output my-docs --delay 2.0 --max-depth 3
```

**Arguments:**
- `--sitemap`: Path to sitemap XML file (default: `data/safe-sitemap.xml`)
- `--output`: Output directory for markdown files (default: `output`)
- `--delay`: Delay between requests in seconds (default: `1.0`)
- `--base-domain`: Base domain to restrict crawling (default: `docs.safe.global`)
- `--no-recursive`: Disable recursive crawling (only crawl sitemap URLs)
- `--max-depth`: Maximum depth for recursive crawling (default: `5`)
- `--no-discover-sitemaps`: Disable automatic sitemap discovery

### Recursive Crawling

By default, the crawler will recursively follow internal links up to a depth of 5. This means:
- **Depth 0**: Pages from the sitemap
- **Depth 1**: Pages linked from sitemap pages
- **Depth 2**: Pages linked from depth 1 pages
- And so on...

To disable recursive crawling and only crawl sitemap URLs:
```bash
python crawler.py --no-recursive
```

To limit the depth of recursive crawling:
```bash
python crawler.py --max-depth 2
```

### Automatic Sitemap Discovery

The crawler automatically discovers and parses additional sitemaps:
- Checks common locations: `/sitemap.xml`, `/sitemap_index.xml`, `/robots.txt`
- Parses sitemap indexes (sitemaps that reference other sitemaps)
- Extracts sitemap URLs from `robots.txt`
- Adds discovered URLs to the crawl queue if not already visited

This feature is enabled by default and helps discover "hidden" pages not in the main sitemap.

To disable sitemap discovery:
```bash
python crawler.py --no-discover-sitemaps
```

### Navigation Link Priority

The crawler specifically extracts links from navigation elements:
- Navigation menus (`<nav>`, `[role="navigation"]`)
- Sidebars (`.sidebar`, `.side-nav`)
- Headers and menus (`.menu`, `.navigation`)

These links are:
1. Collected from all pages during crawling
2. Processed at the end to catch any missing pages
3. Given depth 0 (same priority as sitemap URLs)
4. Tracked in the link graph with `from_navigation` flag

This ensures comprehensive coverage of documentation sites where some pages may only be accessible through navigation.

## Output Structure

The crawler generates multiple types of output:

### 1. Markdown Files

Each crawled page generates a markdown file with the following structure:

```markdown
---
title: Page Title
url: https://example.com/page
description: Page description
lastmod: 2025-10-03T15:39:09+00:00
priority: 0.80
---

# Page Title

[Main content in markdown format]

---

## Document Sections

- Section 1
  - Subsection 1.1
  - Subsection 1.2
- Section 2

---

## Related Links

### Internal Links
- [Link Text](url)

### External Links
- [Link Text](url)

---

## Code Snippets

This page contains X code snippet(s).

**Languages:**
- javascript: 3
- python: 1
```

### 2. JSON Output for RAG Indexing

The crawler generates two comprehensive JSON files optimized for RAG tools:

#### `crawled_data.json`
Complete dataset with all metadata and relationships:
```json
{
  "metadata": {
    "crawl_date": "2025-10-07T12:00:00",
    "base_domain": "docs.safe.global",
    "total_pages": 52,
    "statistics": {
      "total_visited": 52,
      "total_skipped": 5,
      "total_failed": 0,
      "start_time": "...",
      "end_time": "..."
    }
  },
  "pages": [
    {
      "url": "https://docs.safe.global/page",
      "normalized_url": "https://docs.safe.global/page",
      "filename": "page.md",
      "parent_url": "https://docs.safe.global/parent",
      "depth": 1,
      "breadcrumbs": [...],
      "title": "Page Title",
      "description": "Page description",
      "crawled_at": "2025-10-07T12:00:00",
      "text_chunks": ["chunk1", "chunk2", ...],
      "full_text": "Complete page text...",
      "sections": [...],
      "code_snippets": [...],
      "code_languages": ["javascript", "python"],
      "links": {
        "internal": [...],
        "external": [...],
        "internal_count": 10,
        "external_count": 3
      },
      "siblings": ["url1", "url2"],
      "sibling_count": 2
    }
  ],
  "link_graph": {
    "url": {
      "internal_links": [...],
      "external_links": [...],
      "parent": "parent_url",
      "depth": 1
    }
  }
}
```

#### `vector_data.json`
Flattened format optimized for vector embeddings:
```json
[
  {
    "id": "https://docs.safe.global/page#chunk-0",
    "url": "https://docs.safe.global/page",
    "chunk_index": 0,
    "total_chunks": 5,
    "text": "This is a 500-word chunk of content...",
    "title": "Page Title",
    "description": "Page description",
    "parent_url": "https://docs.safe.global/parent",
    "breadcrumbs": [...],
    "depth": 1,
    "section_titles": ["Section 1", "Section 2"],
    "has_code": true,
    "code_languages": ["javascript"]
  }
]
```

**Key Features for RAG:**
- Pre-chunked text (~500 words per chunk) ready for embedding
- Unique IDs for each chunk
- Metadata for filtering and context (parent, breadcrumbs, depth)
- Section titles for better semantic understanding
- Code presence indicators for technical queries

## Example Output Filename

URLs are converted to safe filenames:
- `https://docs.safe.global/core-api/api-overview` → `core-api-api-overview.md`
- `https://docs.safe.global/core-api/transaction-service-guides/transactions` → `core-api-transaction-service-guides-transactions.md`

## How It Works

1. **Parse Sitemap**: Reads the XML sitemap and extracts all URLs with metadata
2. **Initialize Queue**: Adds sitemap URLs to processing queue at depth 0
3. **Process Pages**: For each URL in the queue:
   - Fetches page with proper headers
   - Extracts metadata from `<title>`, `<meta>`, and Open Graph tags
   - Identifies main content area
   - Finds all sections and headers
   - Collects all links (internal and external)
   - Extracts breadcrumb navigation
   - Identifies code snippets and their languages
   - Chunks text content for better RAG performance
4. **Recursive Discovery**: If recursive mode is enabled:
   - Extracts internal links from each page
   - Adds new URLs to queue with incremented depth
   - Tracks visited URLs to avoid duplicates
5. **Build Relationships**: Tracks parent-child and sibling relationships
6. **Convert to Markdown**: Uses `markdownify` to convert HTML to clean markdown
7. **Save Outputs**: 
   - Writes structured markdown files with frontmatter
   - Generates comprehensive JSON with all metadata
   - Creates vector-optimized JSON for embedding

## Tips

- **Delay**: Use `--delay` to be respectful to the server (recommended: 1-2 seconds)
- **Recursive Depth**: Start with a lower `--max-depth` (2-3) to test, then increase if needed
- **Output Organization**: The crawler preserves URL structure in filenames for easy reference
- **Metadata**: Frontmatter makes files compatible with static site generators like Jekyll, Hugo, or Next.js
- **RAG Integration**: Use `vector_data.json` for embedding with tools like:
  - OpenAI Embeddings + Pinecone/Weaviate/Qdrant
  - Sentence Transformers + FAISS
  - LangChain/LlamaIndex document loaders
- **Duplicate Prevention**: The crawler automatically prevents duplicate visits and handles URL normalization

## Requirements

- `requests`: HTTP client for fetching pages
- `beautifulsoup4`: HTML parsing and content extraction
- `markdownify`: HTML to Markdown conversion
- `lxml`: Fast XML parsing

## Using with RAG Systems

### Example: OpenAI Embeddings + Vector Database

```python
import json
import openai
from pinecone import Pinecone

# Load vector data
with open('output/vector_data.json', 'r') as f:
    chunks = json.load(f)

# Create embeddings and index
pc = Pinecone(api_key='your-api-key')
index = pc.Index('safe-docs')

for chunk in chunks:
    # Create embedding
    embedding = openai.Embedding.create(
        input=chunk['text'],
        model="text-embedding-ada-002"
    )['data'][0]['embedding']
    
    # Store in vector database
    index.upsert([(
        chunk['id'],
        embedding,
        {
            'text': chunk['text'],
            'title': chunk['title'],
            'url': chunk['url'],
            'breadcrumbs': chunk['breadcrumbs']
        }
    )])
```

### Example: LangChain Integration

```python
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.docstore.document import Document
import json

# Load vector data
with open('output/vector_data.json', 'r') as f:
    chunks = json.load(f)

# Convert to LangChain documents
documents = [
    Document(
        page_content=chunk['text'],
        metadata={
            'url': chunk['url'],
            'title': chunk['title'],
            'source': chunk['url']
        }
    )
    for chunk in chunks
]

# Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(documents, embeddings)
vectorstore.save_local("safe_docs_vectorstore")
```

## Troubleshooting

**Issue**: "Failed to fetch page"
- Solution: Check internet connection, verify URL is accessible, increase delay

**Issue**: Too many pages being crawled
- Solution: Reduce `--max-depth` or use `--no-recursive` to only crawl sitemap URLs

**Issue**: Empty or minimal content
- Solution: The site might use JavaScript rendering. Consider using Selenium or Playwright for JS-heavy sites

**Issue**: Code snippets not detected
- Solution: The crawler looks for `<pre>` and `<code>` tags. Check if the site uses custom elements

**Issue**: Duplicate pages in output
- Solution: The crawler handles URL normalization automatically, but check for different URL formats (trailing slashes, query params)
