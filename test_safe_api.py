"""
Safe API Tester

This script tests your Safe API key and queries Safe wallet information
WITHOUT creating any transactions (no wallet/signing required).
"""

import os
import requests
from dotenv import load_dotenv
import json

# Load API key
load_dotenv()
SAFE_API_KEY = os.getenv('SAFE_API_KEY')

if not SAFE_API_KEY:
    raise ValueError("SAFE_API_KEY not found in .env file")

print(f"✅ Loaded API key: {SAFE_API_KEY[:30]}...\n")

BASE_URL = "https://api.safe.global/tx-service"
HEADERS = {
    "Authorization": f"Bearer {SAFE_API_KEY}",
    "Content-Type": "application/json"
}


def test_api_connectivity():
    """Test if the API key works"""
    print("="*60)
    print("🔌 Testing API Connectivity")
    print("="*60)
    
    # Test with a known public Safe on Ethereum mainnet
    test_safe = "0x5298a93734c3d979ef1f23f78ebb871879a21f22"
    url = f"{BASE_URL}/eth/api/v1/safes/{test_safe}/"
    
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        print("✅ API Key is valid and working!\n")
        return True
    else:
        print(f"❌ API test failed: {response.status_code}")
        print(f"Response: {response.text}\n")
        return False


def get_safe_info(chain: str, safe_address: str):
    """Get information about a Safe wallet"""
    print("="*60)
    print(f"📋 Getting Safe Information")
    print("="*60)
    print(f"Chain: {chain}")
    print(f"Safe Address: {safe_address}\n")
    
    url = f"{BASE_URL}/{chain}/api/v1/safes/{safe_address}/"
    
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        data = response.json()
        print("✅ Safe found!\n")
        print(f"📍 Address: {data['address']}")
        print(f"👥 Owners ({len(data['owners'])}):")
        for i, owner in enumerate(data['owners'], 1):
            print(f"   {i}. {owner}")
        print(f"🔢 Threshold: {data['threshold']} (signatures required)")
        print(f"📊 Nonce: {data['nonce']}")
        print(f"🏠 Master Copy: {data['masterCopy']}")
        print(f"📦 Version: {data.get('version', 'N/A')}")
        print(f"🎯 Fallback Handler: {data.get('fallbackHandler', 'N/A')}")
        
        return data
    elif response.status_code == 404:
        print("❌ Safe not found on this network!")
        print("   This could mean:")
        print("   1. The Safe address is incorrect")
        print("   2. The Safe doesn't exist on this chain")
        print("   3. The Safe hasn't been deployed yet\n")
        return None
    else:
        print(f"❌ Error: {response.status_code}")
        print(f"Response: {response.text}\n")
        return None


def get_transactions(chain: str, safe_address: str, limit: int = 5):
    """Get recent transactions for a Safe"""
    print("="*60)
    print(f"📜 Getting Transactions History")
    print("="*60)
    
    url = f"{BASE_URL}/{chain}/api/v1/safes/{safe_address}/multisig-transactions/"
    params = {"limit": limit, "ordering": "-nonce"}
    
    response = requests.get(url, headers=HEADERS, params=params)
    
    if response.status_code == 200:
        data = response.json()
        results = data.get('results', [])
        
        print(f"Found {data.get('count', 0)} total transactions")
        print(f"Showing last {len(results)} transactions:\n")
        
        if results:
            for i, tx in enumerate(results, 1):
                print(f"Transaction #{i}:")
                print(f"  To: {tx.get('to', 'N/A')}")
                print(f"  Value: {int(tx.get('value', 0)) / 1e18} ETH")
                print(f"  Executed: {'✅' if tx.get('isExecuted') else '⏳ Pending'}")
                print(f"  Confirmations: {tx.get('confirmationsRequired', 0)}/{len(tx.get('confirmations', []))}")
                print(f"  Safe Tx Hash: {tx.get('safeTxHash', 'N/A')[:20]}...")
                print()
        else:
            print("No transactions found for this Safe.\n")
        
        return results
    else:
        print(f"❌ Error fetching transactions: {response.status_code}")
        print(f"Response: {response.text}\n")
        return None


def get_balances(chain: str, safe_address: str):
    """Get Safe balance information"""
    print("="*60)
    print(f"💰 Getting Safe Balances")
    print("="*60)
    
    url = f"{BASE_URL}/{chain}/api/v1/safes/{safe_address}/balances/"
    
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        balances = response.json()
        
        if balances:
            print(f"Found {len(balances)} token(s):\n")
            for token in balances:
                token_info = token.get('tokenAddress')
                balance = int(token.get('balance', 0))
                decimals = token.get('token', {}).get('decimals', 18)
                symbol = token.get('token', {}).get('symbol', 'Unknown')
                
                if token_info is None:
                    # Native token (ETH, MATIC, etc.)
                    print(f"💎 Native Token ({symbol})")
                else:
                    print(f"🪙 {symbol} ({token_info[:10]}...)")
                
                print(f"   Balance: {balance / (10 ** decimals)} {symbol}")
                print()
        else:
            print("No balances found (Safe might be empty).\n")
        
        return balances
    else:
        print(f"❌ Error fetching balances: {response.status_code}")
        return None


def get_pending_transactions(chain: str, safe_address: str):
    """Get pending (unexecuted) transactions"""
    print("="*60)
    print(f"⏳ Getting Pending Transactions")
    print("="*60)
    
    url = f"{BASE_URL}/{chain}/api/v1/safes/{safe_address}/multisig-transactions/"
    params = {"executed": "false"}
    
    response = requests.get(url, headers=HEADERS, params=params)
    
    if response.status_code == 200:
        data = response.json()
        results = data.get('results', [])
        
        print(f"Found {len(results)} pending transaction(s)\n")
        
        if results:
            for i, tx in enumerate(results, 1):
                print(f"Pending Transaction #{i}:")
                print(f"  To: {tx.get('to')}")
                print(f"  Value: {int(tx.get('value', 0)) / 1e18} ETH")
                print(f"  Confirmations: {len(tx.get('confirmations', []))}/{tx.get('confirmationsRequired')}")
                print(f"  Missing: {tx.get('confirmationsRequired', 0) - len(tx.get('confirmations', []))} signature(s)")
                print()
        else:
            print("✅ No pending transactions.\n")
        
        return results
    else:
        print(f"❌ Error: {response.status_code}")
        return None


def main():
    """Run all tests"""
    print("\n" + "🔬 SAFE API TESTING SUITE".center(60, "="))
    print("\n")
    
    # Test API connectivity first
    if not test_api_connectivity():
        print("⚠️ API connectivity test failed. Check your API key.")
        return
    
    print("\n")
    
    # Test with YOUR Safe address
    # Replace this with your actual Safe address
    YOUR_CHAIN = "eth"  # Change to your chain: 'sep', 'matic', 'arb1', 'base', etc.
    YOUR_SAFE = "0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F"  # Your Safe address
    
    print("🎯 TESTING WITH YOUR SAFE ADDRESS".center(60, "="))
    print("\n")
    
    # Get Safe info
    safe_info = get_safe_info(YOUR_CHAIN, YOUR_SAFE)
    
    if safe_info:
        print("\n")
        
        # Get balances
        get_balances(YOUR_CHAIN, YOUR_SAFE)
        print("\n")
        
        # Get transaction history
        get_transactions(YOUR_CHAIN, YOUR_SAFE, limit=3)
        print("\n")
        
        # Get pending transactions
        get_pending_transactions(YOUR_CHAIN, YOUR_SAFE)
    else:
        print("\n⚠️ Your Safe was not found. Let's try with a public example Safe...\n")
        
        # Try with a known public Safe on Ethereum mainnet
        EXAMPLE_SAFE = "0x5298a93734c3d979ef1f23f78ebb871879a21f22"
        print(f"📌 TESTING WITH EXAMPLE SAFE (Ethereum Mainnet)".center(60, "="))
        print("\n")
        
        safe_info = get_safe_info("eth", EXAMPLE_SAFE)
        
        if safe_info:
            print("\n")
            get_balances("eth", EXAMPLE_SAFE)
            print("\n")
            get_transactions("eth", EXAMPLE_SAFE, limit=3)
    
    print("\n" + "="*60)
    print("✅ Testing Complete!")
    print("="*60)
    print("\n📝 Summary:")
    print("   • Your API key is working")
    print("   • You can query Safe information")
    print("   • To CREATE transactions, you need:")
    print("      1. A wallet (MetaMask, hardware wallet, etc.)")
    print("      2. The wallet must be an OWNER of the Safe")
    print("      3. Use Safe SDK or sign transactions manually")
    print("\n💡 Next Steps:")
    print("   • Verify your Safe exists on the correct chain")
    print("   • Check Safe UI: https://app.safe.global/")
    print("   • To create transactions, see: TRANSACTION_README.md")
    print()


if __name__ == "__main__":
    main()
