const axios = require('axios');

/**
 * Price Service - Handles fetching and caching of cryptocurrency prices
 * Uses CoinGecko API with caching to avoid rate limits
 */

class PriceService {
  constructor() {
    this.priceCache = new Map();
    this.cacheDuration = 60000; // 1 minute cache
  }

  /**
   * Get ETH price in USD from CoinGecko
   */
  async getEthPrice() {
    try {
      // Check cache first
      const cached = this.priceCache.get('eth');
      if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
        console.log('[PriceService] Returning cached ETH price:', cached.price);
        return cached.price;
      }

      console.log('[PriceService] Fetching ETH price from CoinGecko...');
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const price = response.data?.ethereum?.usd;
      
      if (!price) {
        throw new Error('Invalid response from CoinGecko');
      }

      // Cache the price
      this.priceCache.set('eth', {
        price,
        timestamp: Date.now(),
      });

      console.log('[PriceService] ETH Price:', price, 'USD');
      return price;
    } catch (error) {
      console.error('[PriceService] Error fetching ETH price:', error.message);
      
      // Return cached value if available, even if expired
      const cached = this.priceCache.get('eth');
      if (cached) {
        console.warn('[PriceService] Using expired cache for ETH');
        return cached.price;
      }
      
      throw error;
    }
  }

  /**
   * Get token price in USD from CoinGecko by contract address
   */
  async getTokenPrice(tokenAddress) {
    try {
      const cacheKey = `token_${tokenAddress.toLowerCase()}`;

      // Check cache first
      const cached = this.priceCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
        console.log(`[PriceService] Returning cached price for ${tokenAddress}:`, cached.price);
        return cached.price;
      }

      console.log(`[PriceService] Fetching price for token ${tokenAddress} from CoinGecko...`);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const price = response.data[tokenAddress.toLowerCase()]?.usd;
      
      if (!price) {
        console.log(`[PriceService] No price found for token ${tokenAddress}`);
        return null;
      }

      // Cache the price
      this.priceCache.set(cacheKey, {
        price,
        timestamp: Date.now(),
      });

      console.log(`[PriceService] Token ${tokenAddress} Price:`, price, 'USD');
      return price;
    } catch (error) {
      console.error(`[PriceService] Error fetching token price for ${tokenAddress}:`, error.message);
      
      // Return cached value if available, even if expired
      const cacheKey = `token_${tokenAddress.toLowerCase()}`;
      const cached = this.priceCache.get(cacheKey);
      if (cached) {
        console.warn(`[PriceService] Using expired cache for ${tokenAddress}`);
        return cached.price;
      }
      
      return null;
    }
  }

  /**
   * Calculate total asset value for a Safe
   */
  async calculateTotalAssetValue(balances) {
    try {
      console.log('[PriceService] Calculating total asset value for', balances.length, 'tokens');
      
      let totalValue = 0;
      const tokenValues = [];
      
      // Get ETH price
      const ethPrice = await this.getEthPrice();
      
      for (const token of balances) {
        try {
          if (!token.token && !token.tokenAddress) {
            // Native ETH
            const ethValue = Number(token.balance) / 1e18;
            const usdValue = ethPrice ? ethValue * ethPrice : 0;
            console.log('[PriceService] ETH:', ethValue, 'ETH =', usdValue.toFixed(2), 'USD');
            totalValue += usdValue;
            tokenValues.push({
              symbol: 'ETH',
              name: 'Ethereum',
              balance: ethValue,
              usdValue,
              tokenAddress: null,
            });
          } else if (token.token) {
            // ERC-20 token
            const tokenBalance = Number(token.balance) / Math.pow(10, token.token.decimals);
            
            // Get token price from CoinGecko
            const price = await this.getTokenPrice(token.tokenAddress);
            const usdValue = price ? tokenBalance * price : 0;
            
            console.log(`[PriceService] ${token.token.symbol}:`, tokenBalance.toFixed(4), '=', usdValue.toFixed(2), 'USD');
            totalValue += usdValue;
            
            tokenValues.push({
              symbol: token.token.symbol,
              name: token.token.name,
              balance: tokenBalance,
              usdValue,
              tokenAddress: token.tokenAddress,
              decimals: token.token.decimals,
            });
          }
        } catch (error) {
          console.warn('[PriceService] Error processing token:', token.tokenAddress || 'ETH', error.message);
        }
      }
      
      console.log('[PriceService] ===== TOTAL ASSET VALUE =====');
      console.log('[PriceService] Total USD Value:', totalValue.toFixed(2));
      console.log('[PriceService] Number of tokens:', tokenValues.length);
      console.log('[PriceService] ================================');
      
      return {
        totalUsd: totalValue.toFixed(2),
        tokens: tokenValues,
      };
    } catch (error) {
      console.error('[PriceService] Error calculating total asset value:', error);
      return { totalUsd: '0', tokens: [] };
    }
  }
}

// Create singleton instance
const priceService = new PriceService();

module.exports = priceService;

