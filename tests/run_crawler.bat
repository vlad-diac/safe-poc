@echo off
echo Safe Documentation Crawler (Enhanced with RAG support)
echo =====================================================
echo.
echo Installing dependencies...
pip install -r requirements.txt
echo.
echo Starting crawler with recursive mode...
echo This will:
echo - Crawl all pages from sitemap
echo - Recursively follow internal links (max depth: 5)
echo - Generate markdown files
echo - Create JSON files for RAG indexing
echo.
python crawler.py
echo.
echo Done! Check the 'output' folder for:
echo - Markdown files (*.md)
echo - crawled_data.json (complete dataset)
echo - vector_data.json (optimized for embeddings)
echo.
echo To disable recursive crawling: python crawler.py --no-recursive
echo To change max depth: python crawler.py --max-depth 3
echo.
pause
