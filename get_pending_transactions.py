"""
Get Pending Transactions for AMATSU Safe Wallet

This script fetches all pending (unexecuted) transactions for the 
AMATSU Safe wallet address using the Safe Transaction Service API.

Based on Safe API documentation:
- Endpoint: /api/v1/safes/{address}/multisig-transactions/
- Filter: executed=false returns only pending transactions
"""

import os
import sys
import requests
from dotenv import load_dotenv
import json
from typing import List, Dict, Optional
from datetime import datetime

# Fix encoding issues on Windows
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Load environment variables
load_dotenv()
SAFE_API_KEY = os.getenv('SAFE_API_KEY')
AMATSU_SAFE_ADDRESS = os.getenv('AMATSU_SAFE_WALLET_ADDRESS')

if not SAFE_API_KEY:
    raise ValueError("❌ SAFE_API_KEY not found in .env file")

if not AMATSU_SAFE_ADDRESS:
    raise ValueError("❌ AMATSU_SAFE_WALLET_ADDRESS not found in .env file")

# Safe Transaction Service Base URL
BASE_URL = "https://api.safe.global/tx-service"

# Request headers with API authentication
HEADERS = {
    "Authorization": f"Bearer {SAFE_API_KEY}",
    "Content-Type": "application/json"
}

# Supported chains - modify this based on where your Safe is deployed
SUPPORTED_CHAINS = {
    "eth": "Ethereum Mainnet",
    "sep": "Sepolia Testnet",
    "matic": "Polygon",
    "arb1": "Arbitrum One",
    "oeth": "Optimism",
    "base": "Base",
    "gno": "Gnosis Chain",
    "bsc": "Binance Smart Chain",
    "avax": "Avalanche",
}


def check_safe_exists(chain: str, safe_address: str) -> Optional[Dict]:
    """
    Check if the Safe exists on the specified chain.
    
    Args:
        chain: Chain identifier (e.g., 'eth', 'sep', 'matic')
        safe_address: The Safe wallet address
        
    Returns:
        Dict with Safe info if found, None otherwise
    """
    url = f"{BASE_URL}/{chain}/api/v1/safes/{safe_address}/"
    
    try:
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            return None
        else:
            print(f"⚠️ Unexpected status code {response.status_code}: {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Error checking Safe: {e}")
        return None


def get_pending_transactions(chain: str, safe_address: str, limit: Optional[int] = None) -> List[Dict]:
    """
    Get all pending (unexecuted) transactions for a Safe wallet.
    
    Args:
        chain: Chain identifier (e.g., 'eth', 'sep', 'matic')
        safe_address: The Safe wallet address
        limit: Optional limit on number of transactions to retrieve
        
    Returns:
        List of pending transaction dictionaries
    """
    url = f"{BASE_URL}/{chain}/api/v1/safes/{safe_address}/multisig-transactions/"
    
    # Filter for only unexecuted (pending) transactions
    params = {
        "executed": "false",
        "ordering": "-nonce"  # Most recent first
    }
    
    if limit:
        params["limit"] = limit
    
    try:
        response = requests.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        
        data = response.json()
        return data.get('results', [])
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching pending transactions: {e}")
        return []


def format_transaction_details(tx: Dict) -> str:
    """
    Format transaction details for display.
    
    Args:
        tx: Transaction dictionary
        
    Returns:
        Formatted string with transaction details
    """
    lines = []
    
    # Basic transaction info
    lines.append(f"  📄 Safe Tx Hash: {tx.get('safeTxHash', 'N/A')}")
    lines.append(f"  📍 To: {tx.get('to', 'N/A')}")
    
    # Value (convert from wei to ETH)
    value_wei = int(tx.get('value', 0))
    value_eth = value_wei / 1e18
    lines.append(f"  💰 Value: {value_eth} ETH ({value_wei} wei)")
    
    # Transaction metadata
    lines.append(f"  🔢 Nonce: {tx.get('nonce', 'N/A')}")
    lines.append(f"  ⛽ Gas Price: {tx.get('gasPrice', 'N/A')}")
    
    # Confirmation status
    confirmations = tx.get('confirmations', [])
    confirmations_required = tx.get('confirmationsRequired', 0)
    confirmations_count = len(confirmations)
    missing = confirmations_required - confirmations_count
    
    lines.append(f"  ✅ Confirmations: {confirmations_count}/{confirmations_required}")
    lines.append(f"  ⏳ Missing: {missing} signature(s)")
    
    # Owners who have confirmed
    if confirmations:
        lines.append(f"  👥 Confirmed by:")
        for conf in confirmations:
            owner = conf.get('owner', 'Unknown')
            signature_type = conf.get('signatureType', 'Unknown')
            lines.append(f"     • {owner} ({signature_type})")
    
    # Execution info
    lines.append(f"  🚀 Is Executed: {'✅ Yes' if tx.get('isExecuted') else '❌ No'}")
    lines.append(f"  ✔️ Is Successful: {tx.get('isSuccessful', 'N/A')}")
    
    # Data
    data = tx.get('data', None)
    if data and data != '0x':
        lines.append(f"  📦 Has Data: Yes ({len(data)} chars)")
        lines.append(f"     Preview: {data[:66]}...")
    else:
        lines.append(f"  📦 Has Data: No (simple transfer)")
    
    # Operation type
    operation = tx.get('operation', 0)
    operation_type = {0: 'Call', 1: 'DelegateCall', 2: 'Create'}.get(operation, 'Unknown')
    lines.append(f"  🔧 Operation: {operation_type}")
    
    # Timestamps
    submission_date = tx.get('submissionDate')
    if submission_date:
        lines.append(f"  📅 Submitted: {submission_date}")
    
    modified_date = tx.get('modified')
    if modified_date:
        lines.append(f"  🔄 Modified: {modified_date}")
    
    # Transaction hash (if executed)
    tx_hash = tx.get('transactionHash')
    if tx_hash:
        lines.append(f"  🔗 Tx Hash: {tx_hash}")
    
    return "\n".join(lines)


def display_pending_transactions(chain: str, transactions: List[Dict], safe_info: Optional[Dict] = None):
    """
    Display pending transactions in a formatted way.
    
    Args:
        chain: Chain identifier
        transactions: List of transaction dictionaries
        safe_info: Optional Safe information dictionary
    """
    print("\n" + "="*70)
    print("⏳ PENDING TRANSACTIONS FOR AMATSU SAFE WALLET")
    print("="*70)
    
    print(f"\n🌐 Chain: {SUPPORTED_CHAINS.get(chain, chain.upper())}")
    print(f"📬 Safe Address: {AMATSU_SAFE_ADDRESS}")
    
    if safe_info:
        print(f"👥 Owners: {len(safe_info.get('owners', []))}")
        print(f"🔐 Threshold: {safe_info.get('threshold', 'N/A')} signature(s) required")
        print(f"🔢 Current Nonce: {safe_info.get('nonce', 'N/A')}")
    
    print(f"\n📊 Total Pending Transactions: {len(transactions)}")
    
    if not transactions:
        print("\n✅ No pending transactions found!")
        print("   All transactions have been executed or there are no transactions yet.")
    else:
        print("\n" + "-"*70)
        
        for i, tx in enumerate(transactions, 1):
            print(f"\n🔹 Transaction #{i}")
            print(format_transaction_details(tx))
            
            if i < len(transactions):
                print("\n" + "-"*70)
    
    print("\n" + "="*70)


def find_safe_on_chains(safe_address: str, chains_to_check: List[str]) -> Optional[str]:
    """
    Try to find which chain the Safe is deployed on.
    
    Args:
        safe_address: The Safe wallet address
        chains_to_check: List of chain identifiers to check
        
    Returns:
        Chain identifier if found, None otherwise
    """
    print(f"\n🔍 Searching for Safe on {len(chains_to_check)} chains...")
    
    for chain in chains_to_check:
        chain_name = SUPPORTED_CHAINS.get(chain, chain.upper())
        print(f"   Checking {chain_name}...", end=" ")
        
        safe_info = check_safe_exists(chain, safe_address)
        if safe_info:
            print("✅ Found!")
            return chain
        else:
            print("❌ Not found")
    
    return None


def main():
    """Main function to get and display pending transactions"""
    
    print("\n" + "🔐 AMATSU SAFE - PENDING TRANSACTIONS CHECKER".center(70, "="))
    print()
    
    # You can specify the chain here, or let the script search for it
    # Common chains: 'eth', 'sep', 'matic', 'arb1', 'oeth', 'base'
    TARGET_CHAIN = None  # Set to None to auto-search, or specify like 'eth'
    
    if TARGET_CHAIN:
        # Use specified chain
        chain = TARGET_CHAIN
        print(f"🎯 Using specified chain: {SUPPORTED_CHAINS.get(chain, chain.upper())}")
        
        safe_info = check_safe_exists(chain, AMATSU_SAFE_ADDRESS)
        if not safe_info:
            print(f"❌ Safe not found on {SUPPORTED_CHAINS.get(chain, chain.upper())}!")
            return
    else:
        # Auto-detect which chain the Safe is on
        print("🔍 Auto-detecting Safe deployment...")
        
        # Check common chains first
        priority_chains = ['eth', 'sep', 'base', 'matic', 'arb1', 'oeth']
        
        chain = find_safe_on_chains(AMATSU_SAFE_ADDRESS, priority_chains)
        
        if not chain:
            print("\n❌ Safe not found on any of the checked chains!")
            print("\n💡 To manually specify a chain, edit the TARGET_CHAIN variable in the script.")
            print(f"   Available chains: {', '.join(SUPPORTED_CHAINS.keys())}")
            return
        
        safe_info = check_safe_exists(chain, AMATSU_SAFE_ADDRESS)
    
    # Get pending transactions
    print(f"\n📥 Fetching pending transactions from {SUPPORTED_CHAINS.get(chain, chain.upper())}...")
    
    pending_txs = get_pending_transactions(chain, AMATSU_SAFE_ADDRESS)
    
    # Display results
    display_pending_transactions(chain, pending_txs, safe_info)
    
    # Export option
    if pending_txs:
        print("\n💾 Export Options:")
        print("   To export as JSON, use: python get_pending_transactions.py > output.json")
        
        # Optionally save to file
        save_to_file = input("\n💾 Save results to file? (y/n): ").strip().lower()
        if save_to_file == 'y':
            filename = f"pending_txs_{AMATSU_SAFE_ADDRESS[:8]}_{chain}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(filename, 'w') as f:
                json.dump({
                    'chain': chain,
                    'safe_address': AMATSU_SAFE_ADDRESS,
                    'safe_info': safe_info,
                    'pending_transactions': pending_txs,
                    'count': len(pending_txs),
                    'timestamp': datetime.now().isoformat()
                }, f, indent=2)
            print(f"✅ Saved to: {filename}")
    
    print("\n✨ Done!")


if __name__ == "__main__":
    main()
