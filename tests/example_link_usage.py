"""
Example: Using the Safe Transaction Link Generator Programmatically

This shows how to use the link generator functions in your own scripts.
"""

from generate_safe_transaction_link import (
    generate_transaction_link,
    generate_link_from_transaction_data,
    get_transaction_details,
    get_all_pending_transaction_links
)

# Example 1: Generate a simple link with just the basics
print("="*80)
print("Example 1: Generate link from safe tx hash")
print("="*80)

safe_address = "0xF0E22BA1368F90E54dFD68b1442AA5aecdf6CE6A"
chain = "eth"
safe_tx_hash = "0x2636a7dee546e8b261ce938fb333ac094a00abafb139dfdac9053f9ae443f142"

link = generate_transaction_link(safe_address, chain, safe_tx_hash, "specific")
print(f"\n🔗 Transaction Link:")
print(f"{link}")

# Example 2: Generate links from transaction data (from JSON)
print("\n\n" + "="*80)
print("Example 2: Generate links from transaction data")
print("="*80)

tx_data = {
    "safe": "0xF0E22BA1368F90E54dFD68b1442AA5aecdf6CE6A",
    "safeTxHash": "0x2636a7dee546e8b261ce938fb333ac094a00abafb139dfdac9053f9ae443f142",
    "nonce": 102,
    "to": "0xdC035D45d973E3EC169d2276DDab16f1e407384F",
    "confirmations": [],
    "confirmationsRequired": 3
}

links = generate_link_from_transaction_data(tx_data, "eth")
print(f"\n📱 All available links:")
print(f"Specific: {links['specific_transaction']}")
print(f"Queue: {links['queue']}")
print(f"History: {links['history']}")

# Example 3: Get transaction details from API and generate link
print("\n\n" + "="*80)
print("Example 3: Fetch transaction from API and generate link")
print("="*80)

print("\n🔍 Fetching transaction details from Safe API...")
tx_details = get_transaction_details(chain, safe_address, safe_tx_hash)

if tx_details:
    links = generate_link_from_transaction_data(tx_details, chain)
    print(f"✅ Transaction found!")
    print(f"   Method: {tx_details.get('dataDecoded', {}).get('method', 'N/A')}")
    print(f"   Nonce: {tx_details.get('nonce')}")
    print(f"   🔗 {links['specific_transaction']}")

# Example 4: Get all pending transactions and their links
print("\n\n" + "="*80)
print("Example 4: Get all pending transactions with links")
print("="*80)

print("\n🔍 Fetching all pending transactions...")
all_tx_links = get_all_pending_transaction_links(chain, safe_address)

if all_tx_links:
    print(f"\n✅ Found {len(all_tx_links)} pending transaction(s)\n")
    
    for i, tx_info in enumerate(all_tx_links[:3], 1):  # Show first 3
        print(f"Transaction #{i}:")
        print(f"  Nonce: {tx_info['nonce']}")
        print(f"  Method: {tx_info['method']}")
        print(f"  Confirmations: {tx_info['confirmations']}")
        print(f"  🔗 {tx_info['links']['specific_transaction']}")
        print()

# Example 5: Generate queue link for a Safe (for sharing with all owners)
print("\n" + "="*80)
print("Example 5: Generate general queue link to share with all owners")
print("="*80)

queue_link = generate_transaction_link(safe_address, chain, "", "queue")
print(f"\n📋 Share this link with all Safe owners to view pending transactions:")
print(f"{queue_link}")

print("\n" + "="*80)
print("✨ All examples completed!")
print("="*80)
