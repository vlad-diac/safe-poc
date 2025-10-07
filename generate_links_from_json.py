"""
Generate Links from Your Existing JSON File

This script loads your pending_txs JSON file and generates
payment/signing links for all transactions.
"""

import json
from generate_safe_transaction_link import generate_link_from_transaction_data

# Load your JSON file
filename = "pending_txs_0xF0E22B_eth_20251007_134238.json"

print("\n" + "="*80)
print(f"📂 Loading: {filename}")
print("="*80)

with open(filename, 'r') as f:
    data = json.load(f)

chain = data['chain']
safe_address = data['safe_address']
pending_txs = data['pending_transactions']

print(f"\n✅ Loaded successfully!")
print(f"📍 Safe: {safe_address}")
print(f"🌐 Chain: {chain.upper()}")
print(f"📊 Total Pending: {len(pending_txs)} transactions")

# Focus on active transactions (nonces 100-102)
active_txs = [tx for tx in pending_txs if tx['nonce'] in [100, 101, 102]]

print("\n" + "="*80)
print("🎯 ACTIVE TRANSACTIONS (Ready to Execute)")
print("="*80)

for tx in active_txs:
    nonce = tx['nonce']
    method = tx.get('dataDecoded', {}).get('method', 'unknown')
    confirmations = len(tx.get('confirmations', []))
    confirmations_required = tx.get('confirmationsRequired')
    missing = confirmations_required - confirmations
    
    # Generate links
    links = generate_link_from_transaction_data(tx, chain)
    
    print(f"\n{'='*80}")
    print(f"Transaction Nonce {nonce}")
    print(f"{'='*80}")
    print(f"Method: {method}")
    print(f"Status: {confirmations}/{confirmations_required} signatures")
    print(f"Missing: {missing} signature(s)")
    
    # Show who already signed
    if confirmations > 0:
        print(f"\n✅ Already signed by:")
        for conf in tx.get('confirmations', []):
            owner = conf.get('owner')
            print(f"   • {owner}")
    
    # Show the transfer details if it's a token transfer
    if method == 'transfer':
        params = tx.get('dataDecoded', {}).get('parameters', [])
        to_param = next((p for p in params if p['name'] == 'to'), None)
        value_param = next((p for p in params if p['name'] == 'value'), None)
        
        if to_param and value_param:
            to_address = to_param['value']
            value = int(value_param['value'])
            # Try to format as readable number
            formatted_value = f"{value:,}"
            
            print(f"\n💸 Transfer Details:")
            print(f"   To: {to_address}")
            print(f"   Amount: {formatted_value} tokens")
    
    print(f"\n🔗 SIGNING LINK:")
    print(f"   {links['specific_transaction']}")
    
    # Priority indicator
    if nonce == 100:
        print(f"\n⚠️ PRIORITY: This transaction BLOCKS all others!")
        print(f"   It must be executed or rejected before any other transaction can proceed.")

print("\n\n" + "="*80)
print("📋 GENERAL QUEUE LINK (Share with all owners)")
print("="*80)

# Generate a general queue link
from generate_safe_transaction_link import generate_transaction_link
queue_link = generate_transaction_link(safe_address, chain, "", "queue")
print(f"\n{queue_link}")
print("\nShare this link to view all pending transactions at once.")

# Generate CSV export
print("\n\n" + "="*80)
print("📊 CSV EXPORT")
print("="*80)

import csv

csv_filename = f"safe_links_{safe_address[:8]}_{chain}.csv"

with open(csv_filename, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Nonce', 'Method', 'To', 'Confirmations', 'Missing', 'Signing Link'])
    
    for tx in active_txs:
        nonce = tx['nonce']
        method = tx.get('dataDecoded', {}).get('method', 'unknown')
        to = tx.get('to', '')
        confirmations = len(tx.get('confirmations', []))
        confirmations_required = tx.get('confirmationsRequired')
        missing = confirmations_required - confirmations
        
        links = generate_link_from_transaction_data(tx, chain)
        
        writer.writerow([
            nonce,
            method,
            to,
            f"{confirmations}/{confirmations_required}",
            missing,
            links['specific_transaction']
        ])

print(f"✅ Exported to: {csv_filename}")

# Generate a markdown summary for sharing
print("\n\n" + "="*80)
print("📝 MARKDOWN SUMMARY (for email/Slack)")
print("="*80)

md_filename = f"safe_pending_summary_{safe_address[:8]}.md"

with open(md_filename, 'w', encoding='utf-8') as f:
    f.write(f"# Safe Pending Transactions - {safe_address[:8]}...\n\n")
    f.write(f"**Safe Address:** `{safe_address}`\n")
    f.write(f"**Chain:** {chain.upper()}\n")
    f.write(f"**Total Pending:** {len(active_txs)} active transactions\n\n")
    f.write(f"---\n\n")
    
    for i, tx in enumerate(active_txs, 1):
        nonce = tx['nonce']
        method = tx.get('dataDecoded', {}).get('method', 'unknown')
        confirmations = len(tx.get('confirmations', []))
        confirmations_required = tx.get('confirmationsRequired')
        missing = confirmations_required - confirmations
        
        links = generate_link_from_transaction_data(tx, chain)
        
        f.write(f"## Transaction #{i} (Nonce {nonce})\n\n")
        f.write(f"- **Method:** {method}\n")
        f.write(f"- **Status:** {confirmations}/{confirmations_required} signatures ({'✅ Ready' if missing == 0 else f'⚠️ Need {missing} more'})\n")
        
        if nonce == 100:
            f.write(f"- **Priority:** 🔴 BLOCKS ALL OTHER TRANSACTIONS\n")
        
        f.write(f"\n**[Click here to sign]({links['specific_transaction']})**\n\n")
        f.write(f"---\n\n")
    
    f.write(f"\n## View All Transactions\n\n")
    f.write(f"[Open Safe Transaction Queue]({queue_link})\n")

print(f"✅ Exported to: {md_filename}")

print("\n\n" + "="*80)
print("✨ All links generated successfully!")
print("="*80)
print("\n📤 Next Steps:")
print("   1. Share the signing links with Safe owners")
print("   2. Get transaction nonce 100 signed first (it blocks everything)")
print("   3. Once signed, execute it to unblock the queue")
print("\n💡 Tip: Send the markdown file via email or Slack for easy sharing!")
print()
