/**
 * API Key Helper
 * Provides fallback logic for Safe API keys
 */

/**
 * Get API key with fallback logic
 * @param {string|null|undefined} sessionApiKey - Session-specific API key
 * @returns {string|null} - API key to use (session key or company key)
 */
function getApiKey(sessionApiKey) {
  // Use session-specific key if provided
  if (sessionApiKey && sessionApiKey.trim() !== '') {
    console.log('[ApiKeyHelper] Using session-specific API key');
    return sessionApiKey;
  }

  // Fall back to company key
  const companyKey = process.env.COMPANY_SAFE_API_KEY;
  if (companyKey && companyKey.trim() !== '') {
    console.log('[ApiKeyHelper] Using company-wide API key');
    return companyKey;
  }

  // No API key available - return null (will work without auth but may hit rate limits)
  console.log('[ApiKeyHelper] No API key available - using public access (may have rate limits)');
  return null;
}

/**
 * Check if API key is available
 * @param {string|null|undefined} sessionApiKey - Session-specific API key
 * @returns {boolean} - Whether an API key is available
 */
function hasApiKey(sessionApiKey) {
  return getApiKey(sessionApiKey) !== null;
}

/**
 * Get API key source (for logging/debugging)
 * @param {string|null|undefined} sessionApiKey - Session-specific API key
 * @returns {string} - Source of the API key ('session', 'company', or 'none')
 */
function getApiKeySource(sessionApiKey) {
  if (sessionApiKey && sessionApiKey.trim() !== '') {
    return 'session';
  }
  
  const companyKey = process.env.COMPANY_SAFE_API_KEY;
  if (companyKey && companyKey.trim() !== '') {
    return 'company';
  }
  
  return 'none';
}

module.exports = {
  getApiKey,
  hasApiKey,
  getApiKeySource
};

