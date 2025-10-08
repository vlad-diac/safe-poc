"""
Generate Safe Transaction Payment/Signing Links

This script generates shareable links for Safe transactions that allow
owners to view and sign pending transactions through the Safe UI.

Usage:
    python generate_safe_transaction_link.py
    
Or import and use programmatically:
    from generate_safe_transaction_link import generate_transaction_link
"""

import os
import sys
import requests
from dotenv import load_dotenv
from typing import Optional, Dict, List
import json

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

# Safe Transaction Service Base URL
BASE_URL = "https://api.safe.global/tx-service"

# Request headers with API authentication
HEADERS = {
    "Authorization": f"Bearer {SAFE_API_KEY}",
    "Content-Type": "application/json"
}

# Chain name mappings for Safe UI URLs
CHAIN_MAPPINGS = {
    "eth": "eth",
    "sep": "sep",
    "matic": "matic",
    "polygon": "matic",
    "arb1": "arb1",
    "arbitrum": "arb1",
    "oeth": "oeth",
    "optimism": "oeth",
    "base": "base",
    "gno": "gno",
    "gnosis": "gno",
    "bsc": "bsc",
    "bnb": "bsc",
    "avax": "avax",
    "avalanche": "avax",
    "zkevm": "zkevm",
    "zksync": "zksync",
    "aurora": "aurora",
    "celo": "celo",
}


def get_chain_prefix(chain: str) -> str:
    """
    Convert chain identifier to Safe UI chain prefix.
    
    Args:
        chain: Chain identifier (e.g., 'eth', 'sep', 'matic')
        
    Returns:
        Chain prefix for Safe UI URLs
    """
    return CHAIN_MAPPINGS.get(chain.lower(), chain.lower())


def generate_transaction_link(
    safe_address: str,
    chain: str,
    safe_tx_hash: str,
    link_type: str = "specific"
) -> str:
    """
    Generate a Safe UI link for a transaction.
    
    Args:
        safe_address: The Safe wallet address
        chain: Chain identifier (e.g., 'eth', 'sep', 'matic')
        safe_tx_hash: The Safe transaction hash
        link_type: Type of link - "specific", "queue", or "history"
        
    Returns:
        URL to view/sign the transaction in Safe UI
    """
    chain_prefix = get_chain_prefix(chain)
    safe_address_checksummed = safe_address
    
    if link_type == "specific":
        # Link to specific transaction
        return f"https://app.safe.global/transactions/tx?safe={chain_prefix}:{safe_address_checksummed}&id=multisig_{safe_address_checksummed}_{safe_tx_hash}"
    elif link_type == "queue":
        # Link to transaction queue (shows all pending)
        return f"https://app.safe.global/transactions/queue?safe={chain_prefix}:{safe_address_checksummed}"
    elif link_type == "history":
        # Link to transaction history
        return f"https://app.safe.global/transactions/history?safe={chain_prefix}:{safe_address_checksummed}"
    else:
        raise ValueError(f"Unknown link_type: {link_type}")


def get_transaction_details(
    chain: str,
    safe_address: str,
    safe_tx_hash: str
) -> Optional[Dict]:
    """
    Get transaction details from Safe Transaction Service.
    
    Args:
        chain: Chain identifier
        safe_address: The Safe wallet address
        safe_tx_hash: The Safe transaction hash
        
    Returns:
        Transaction details dictionary or None if not found
    """
    url = f"{BASE_URL}/{chain}/api/v1/multisig-transactions/{safe_tx_hash}/"
    
    try:
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            print(f"❌ Transaction not found: {safe_tx_hash}")
            return None
        else:
            print(f"⚠️ Error: {response.status_code} - {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching transaction: {e}")
        return None


def generate_link_from_transaction_data(tx_data: Dict, chain: str) -> Dict[str, str]:
    """
    Generate all relevant links from transaction data.
    
    Args:
        tx_data: Transaction data dictionary
        chain: Chain identifier
        
    Returns:
        Dictionary with various link types
    """
    safe_address = tx_data.get('safe')
    safe_tx_hash = tx_data.get('safeTxHash')
    
    if not safe_address or not safe_tx_hash:
        raise ValueError("Transaction data must include 'safe' and 'safeTxHash'")
    
    return {
        "specific_transaction": generate_transaction_link(safe_address, chain, safe_tx_hash, "specific"),
        "queue": generate_transaction_link(safe_address, chain, safe_tx_hash, "queue"),
        "history": generate_transaction_link(safe_address, chain, safe_tx_hash, "history"),
        "safe_tx_hash": safe_tx_hash,
        "safe_address": safe_address,
        "chain": chain
    }


def get_all_pending_transaction_links(
    chain: str,
    safe_address: str
) -> List[Dict]:
    """
    Get links for all pending transactions of a Safe.
    
    Args:
        chain: Chain identifier
        safe_address: The Safe wallet address
        
    Returns:
        List of dictionaries with transaction info and links
    """
    url = f"{BASE_URL}/{chain}/api/v1/safes/{safe_address}/multisig-transactions/"
    params = {"executed": "false", "ordering": "-nonce"}
    
    try:
        response = requests.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        
        data = response.json()
        results = data.get('results', [])
        
        transaction_links = []
        for tx in results:
            tx_info = {
                "nonce": tx.get('nonce'),
                "safe_tx_hash": tx.get('safeTxHash'),
                "to": tx.get('to'),
                "value": tx.get('value'),
                "confirmations": f"{len(tx.get('confirmations', []))}/{tx.get('confirmationsRequired')}",
                "method": tx.get('dataDecoded', {}).get('method', 'transfer' if tx.get('value') != '0' else 'unknown'),
                "links": generate_link_from_transaction_data(tx, chain)
            }
            transaction_links.append(tx_info)
        
        return transaction_links
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching pending transactions: {e}")
        return []


def display_transaction_link(tx_data: Dict, chain: str):
    """
    Display transaction links in a formatted way.
    
    Args:
        tx_data: Transaction data dictionary
        chain: Chain identifier
    """
    links = generate_link_from_transaction_data(tx_data, chain)
    
    print("\n" + "="*80)
    print("🔗 SAFE TRANSACTION LINKS")
    print("="*80)
    
    print(f"\n📍 Safe Address: {links['safe_address']}")
    print(f"🌐 Chain: {chain.upper()}")
    print(f"📄 Safe Tx Hash: {links['safe_tx_hash']}")
    
    # Transaction details
    if 'dataDecoded' in tx_data and tx_data['dataDecoded']:
        method = tx_data['dataDecoded'].get('method', 'Unknown')
        print(f"🔧 Method: {method}")
    
    print(f"\n🔢 Nonce: {tx_data.get('nonce', 'N/A')}")
    print(f"✅ Confirmations: {len(tx_data.get('confirmations', []))}/{tx_data.get('confirmationsRequired', 'N/A')}")
    
    print("\n" + "-"*80)
    print("📱 SHAREABLE LINKS:")
    print("-"*80)
    
    print("\n🎯 Direct Transaction Link (Recommended):")
    print(f"   {links['specific_transaction']}")
    print("\n   → Opens directly to this transaction for signing")
    
    print("\n📋 Queue View:")
    print(f"   {links['queue']}")
    print("\n   → Shows all pending transactions")
    
    print("\n📜 History View:")
    print(f"   {links['history']}")
    print("\n   → Shows all past transactions")
    
    print("\n" + "="*80)


def main():
    """Main function with interactive menu"""
    
    print("\n" + "🔗 SAFE TRANSACTION LINK GENERATOR".center(80, "="))
    print()
    
    print("Choose an option:")
    print("1. Generate link for a specific Safe transaction hash")
    print("2. Generate links for all pending transactions of a Safe")
    print("3. Load transaction from JSON file")
    print()
    
    choice = input("Enter choice (1-3): ").strip()
    
    if choice == "1":
        # Generate link for specific transaction
        print("\n" + "-"*80)
        safe_address = input("Enter Safe address: ").strip()
        chain = input("Enter chain (eth/sep/matic/arb1/base/etc): ").strip().lower()
        safe_tx_hash = input("Enter Safe transaction hash: ").strip()
        
        print("\n🔍 Fetching transaction details...")
        tx_data = get_transaction_details(chain, safe_address, safe_tx_hash)
        
        if tx_data:
            display_transaction_link(tx_data, chain)
        else:
            print("\n❌ Could not fetch transaction. Generating link anyway...")
            links = generate_link_from_transaction_data(
                {"safe": safe_address, "safeTxHash": safe_tx_hash},
                chain
            )
            print(f"\n🔗 Transaction Link:")
            print(f"   {links['specific_transaction']}")
    
    elif choice == "2":
        # Generate links for all pending transactions
        print("\n" + "-"*80)
        safe_address = input("Enter Safe address: ").strip()
        chain = input("Enter chain (eth/sep/matic/arb1/base/etc): ").strip().lower()
        
        print("\n🔍 Fetching pending transactions...")
        transaction_links = get_all_pending_transaction_links(chain, safe_address)
        
        if transaction_links:
            print(f"\n✅ Found {len(transaction_links)} pending transaction(s)")
            print("\n" + "="*80)
            
            for i, tx_info in enumerate(transaction_links, 1):
                print(f"\n🔹 Transaction #{i}")
                print(f"   Nonce: {tx_info['nonce']}")
                print(f"   Method: {tx_info['method']}")
                print(f"   To: {tx_info['to']}")
                print(f"   Confirmations: {tx_info['confirmations']}")
                print(f"   Safe Tx Hash: {tx_info['safe_tx_hash']}")
                print(f"\n   🔗 Sign here: {tx_info['links']['specific_transaction']}")
                print()
            
            # Save to file option
            save = input("\n💾 Save all links to file? (y/n): ").strip().lower()
            if save == 'y':
                filename = f"safe_links_{safe_address[:8]}_{chain}.json"
                with open(filename, 'w') as f:
                    json.dump(transaction_links, f, indent=2)
                print(f"✅ Saved to: {filename}")
        else:
            print("\n✅ No pending transactions found!")
    
    elif choice == "3":
        # Load from JSON file
        print("\n" + "-"*80)
        filename = input("Enter JSON filename: ").strip()
        
        try:
            with open(filename, 'r') as f:
                data = json.load(f)
            
            chain = data.get('chain', 'eth')
            safe_address = data.get('safe_address')
            pending_txs = data.get('pending_transactions', [])
            
            if not pending_txs:
                print("\n❌ No pending transactions found in file!")
                return
            
            print(f"\n✅ Found {len(pending_txs)} pending transaction(s)")
            print(f"📍 Safe: {safe_address}")
            print(f"🌐 Chain: {chain}")
            
            # Ask which transaction to generate link for
            print("\n" + "-"*80)
            print("Select transaction:")
            for i, tx in enumerate(pending_txs[:10], 1):  # Show first 10
                method = tx.get('dataDecoded', {}).get('method', 'unknown')
                nonce = tx.get('nonce')
                print(f"{i}. Nonce {nonce} - {method}")
            
            if len(pending_txs) > 10:
                print(f"... and {len(pending_txs) - 10} more")
            
            print("0. Generate links for ALL transactions")
            
            selection = input("\nEnter number: ").strip()
            
            if selection == "0":
                # Generate all links
                print("\n" + "="*80)
                for i, tx in enumerate(pending_txs, 1):
                    links = generate_link_from_transaction_data(tx, chain)
                    method = tx.get('dataDecoded', {}).get('method', 'unknown')
                    print(f"\n🔹 Transaction #{i} (Nonce {tx.get('nonce')})")
                    print(f"   Method: {method}")
                    print(f"   🔗 {links['specific_transaction']}")
                
                # Save option
                save = input("\n💾 Save all links to file? (y/n): ").strip().lower()
                if save == 'y':
                    links_data = [
                        {
                            "nonce": tx.get('nonce'),
                            "method": tx.get('dataDecoded', {}).get('method', 'unknown'),
                            "safe_tx_hash": tx.get('safeTxHash'),
                            "links": generate_link_from_transaction_data(tx, chain)
                        }
                        for tx in pending_txs
                    ]
                    output_filename = f"safe_links_{safe_address[:8]}_{chain}.json"
                    with open(output_filename, 'w') as f:
                        json.dump(links_data, f, indent=2)
                    print(f"✅ Saved to: {output_filename}")
            else:
                # Generate link for selected transaction
                try:
                    idx = int(selection) - 1
                    if 0 <= idx < len(pending_txs):
                        tx = pending_txs[idx]
                        display_transaction_link(tx, chain)
                    else:
                        print("❌ Invalid selection!")
                except ValueError:
                    print("❌ Invalid input!")
        
        except FileNotFoundError:
            print(f"❌ File not found: {filename}")
        except json.JSONDecodeError:
            print(f"❌ Invalid JSON file: {filename}")
    
    else:
        print("❌ Invalid choice!")
    
    print("\n✨ Done!\n")


if __name__ == "__main__":
    if not SAFE_API_KEY:
        print("⚠️ Warning: SAFE_API_KEY not found in .env file")
        print("   Some features may not work without it.")
        print()
    
    main()
