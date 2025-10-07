@echo off
echo ========================================
echo Advanced Multi-Website Crawler
echo ========================================
echo.
echo This crawler uses:
echo   - Crawlee for smart crawling
echo   - Trafilatura for universal content extraction
echo.
echo Installing dependencies...
pip install -q crawlee[beautifulsoup] trafilatura lxml beautifulsoup4
echo.
echo Starting advanced crawler...
python advanced_crawler.py %*
echo.
echo Done! Check the 'output' folder.
pause
