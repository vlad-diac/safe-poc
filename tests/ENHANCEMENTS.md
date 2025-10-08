# Crawler Enhancements Summary

## Overview

The Safe Documentation Crawler has been significantly enhanced with recursive crawling capabilities and comprehensive JSON export for RAG (Retrieval Augmented Generation) indexing.

## New Features

### 1. Recursive Link Discovery
- **Automatic Link Following**: The crawler now automatically discovers and crawls internal links found on each page
- **Depth Control**: Configurable maximum depth (default: 5 levels)
- **Smart URL Handling**: 
  - URL normalization (removes fragments, trailing slashes)
  - Duplicate detection and prevention
  - Domain restriction (only crawls within specified domain)
  - File type filtering (skips PDFs, images, CSS, JS files)

### 2. Visit Tracking
- **Visited URL Set**: Maintains a set of all visited URLs to prevent duplicates
- **Queue Management**: Uses a deque for efficient BFS-style crawling
- **Statistics Tracking**: 
  - Total pages visited
  - Total pages skipped (duplicates or exceeding depth)
  - Total pages failed
  - Start and end times

### 3. Relationship Mapping
- **Parent-Child Relationships**: Tracks which page linked to each discovered page
- **Sibling Pages**: Automatically identifies pages with the same parent
- **Link Graph**: Complete graph of all internal and external links
- **Breadcrumb Extraction**: Captures navigation breadcrumbs when available
- **Depth Tracking**: Records the crawl depth for each page

### 4. JSON Export for RAG

#### `crawled_data.json`
Complete dataset with all information:
```json
{
  "metadata": {
    "crawl_date": "timestamp",
    "base_domain": "docs.safe.global",
    "total_pages": 52,
    "statistics": {...}
  },
  "pages": [
    {
      "url": "...",
      "parent_url": "...",
      "depth": 1,
      "breadcrumbs": [...],
      "title": "...",
      "description": "...",
      "text_chunks": [...],
      "full_text": "...",
      "sections": [...],
      "code_snippets": [...],
      "links": {
        "internal": [...],
        "external": [...]
      },
      "siblings": [...],
      "sibling_count": 2
    }
  ],
  "link_graph": {...}
}
```

#### `vector_data.json`
Flattened format optimized for vector embeddings:
```json
[
  {
    "id": "url#chunk-0",
    "url": "...",
    "chunk_index": 0,
    "total_chunks": 5,
    "text": "500-word chunk of content",
    "title": "...",
    "description": "...",
    "parent_url": "...",
    "breadcrumbs": [...],
    "depth": 1,
    "section_titles": [...],
    "has_code": true,
    "code_languages": [...]
  }
]
```

### 5. Content Chunking
- **Smart Text Chunking**: Automatically splits content into ~500-word chunks
- **Chunk Metadata**: Each chunk includes its index and total count
- **Unique IDs**: Every chunk has a unique identifier for vector databases
- **Context Preservation**: Each chunk retains page metadata for better retrieval

### 6. Enhanced Metadata
New metadata extracted for each page:
- Crawl timestamp
- Parent URL
- Depth level
- Breadcrumb trail
- Sibling pages
- Text chunk count
- Code snippet count and languages

## New Command-Line Arguments

```bash
--base-domain       Base domain to restrict crawling (default: docs.safe.global)
--no-recursive      Disable recursive crawling (only crawl sitemap URLs)
--max-depth         Maximum depth for recursive crawling (default: 5)
```

## Usage Examples

### Standard Recursive Crawl
```bash
python crawler.py
```
Crawls sitemap URLs and follows links up to depth 5.

### Limited Depth Crawl
```bash
python crawler.py --max-depth 2
```
Only follows links 2 levels deep from sitemap pages.

### Non-Recursive Crawl
```bash
python crawler.py --no-recursive
```
Only crawls URLs from the sitemap, no link following.

### Custom Domain and Output
```bash
python crawler.py --base-domain example.com --output my-docs --delay 2.0
```

## RAG Integration Benefits

### For Vector Databases
- **Pre-chunked Content**: Ready for embedding without additional processing
- **Unique Identifiers**: Each chunk has a stable ID for updates
- **Rich Metadata**: Filter by depth, parent, code presence, etc.
- **Hierarchical Context**: Breadcrumbs and parent links provide context

### For Search/Retrieval
- **Section-aware**: Know which sections contain the information
- **Relationship Mapping**: Find related pages through parent/sibling links
- **Code-aware**: Identify chunks with code examples
- **Depth Filtering**: Prioritize core documentation (lower depth)

### For LLM Context
- **Optimal Chunk Size**: ~500 words balances context and token limits
- **Context Metadata**: Title, breadcrumbs, and section titles provide additional context
- **Link Preservation**: Maintain references to original sources

## Implementation Details

### URL Normalization
```python
def normalize_url(self, url: str) -> str:
    # Remove fragments (#anchors)
    url, _ = urldefrag(url)
    # Remove trailing slash
    url = url.rstrip('/')
    return url
```

### Crawl Algorithm
1. Parse sitemap and add URLs to queue at depth 0
2. While queue is not empty:
   - Pop URL from queue
   - Check if already visited or exceeds max depth
   - Fetch and process page
   - Extract internal links
   - Add valid new links to queue with depth + 1
3. Build sibling relationships
4. Export to JSON formats

### Duplicate Prevention
- URL normalization before comparison
- Set-based visited tracking (O(1) lookup)
- Queue deduplication check before adding

## Performance Considerations

- **Respectful Crawling**: Default 1-second delay between requests
- **Efficient Data Structures**: Uses sets and deques for O(1) operations
- **Memory Management**: Processes pages one at a time
- **Early Termination**: Depth limit prevents infinite crawling

## Output Files

After crawling, the output directory contains:
```
output/
├── *.md                    # Individual markdown files for each page
├── crawled_data.json       # Complete dataset with all metadata
└── vector_data.json        # Flattened chunks for embedding
```

## Statistics Example

At the end of each crawl, you'll see:
```
============================================================
CRAWLING COMPLETE!
============================================================
Total pages visited: 75
Total pages skipped: 12
Total pages failed: 0
Markdown files saved to: F:\Work\...\output
JSON data files saved to: F:\Work\...\output
============================================================

✓ JSON data saved to: output\crawled_data.json
✓ Vector-optimized data saved to: output\vector_data.json
  → 342 text chunks ready for embedding
```

## Backward Compatibility

All existing command-line arguments and basic functionality remain unchanged. The new features are additive:
- Recursive crawling is enabled by default but can be disabled
- JSON export happens automatically alongside markdown files
- All existing markdown output remains identical

## Testing Recommendations

1. **Start Small**: Test with `--max-depth 1` first
2. **Monitor Progress**: Watch the console output to understand crawl behavior
3. **Check JSON**: Verify the JSON structure matches your RAG system requirements
4. **Validate Chunks**: Ensure chunk sizes work for your embedding model

## Future Enhancement Ideas

- [ ] Concurrent/parallel crawling for speed
- [ ] Resume capability from interrupted crawls
- [ ] Custom chunk size configuration
- [ ] Image content extraction and OCR
- [ ] Advanced filtering by content type
- [ ] Integration with popular RAG frameworks
- [ ] Automatic sitemap discovery
- [ ] Rate limiting based on robots.txt
