# Safe Transaction Link Generator Guide

## Overview

The `generate_safe_transaction_link.py` script generates shareable links for Safe transactions that allow owners to view and sign pending transactions through the Safe UI.

## Features

✅ Generate direct links to specific transactions  
✅ Fetch transaction details from Safe API  
✅ Generate links for all pending transactions  
✅ Load transactions from JSON files  
✅ Supports all Safe-supported chains  

---

## Quick Start

### Interactive Mode

Run the script interactively:

```bash
python generate_safe_transaction_link.py
```

Choose from 3 options:
1. Generate link for a specific Safe transaction hash
2. Generate links for all pending transactions of a Safe
3. Load transaction from JSON file

---

## Programmatic Usage

### Import the Functions

```python
from generate_safe_transaction_link import (
    generate_transaction_link,
    generate_link_from_transaction_data,
    get_transaction_details,
    get_all_pending_transaction_links
)
```

### Example 1: Generate Link from Transaction Hash

```python
safe_address = "0xF0E22BA1368F90E54dFD68b1442AA5aecdf6CE6A"
chain = "eth"
safe_tx_hash = "0x2636a7dee546e8b261ce938fb333ac094a00abafb139dfdac9053f9ae443f142"

# Generate direct transaction link
link = generate_transaction_link(safe_address, chain, safe_tx_hash, "specific")
print(f"Sign here: {link}")
```

**Output:**
```
Sign here: https://app.safe.global/transactions/tx?safe=eth:0xF0E22BA1368F90E54dFD68b1442AA5aecdf6CE6A&id=multisig_0xF0E22BA1368F90E54dFD68b1442AA5aecdf6CE6A_0x2636a7dee546e8b261ce938fb333ac094a00abafb139dfdac9053f9ae443f142
```

### Example 2: Generate Multiple Link Types

```python
links = generate_link_from_transaction_data(tx_data, "eth")

print(f"Direct link: {links['specific_transaction']}")
print(f"Queue view: {links['queue']}")
print(f"History view: {links['history']}")
```

### Example 3: Fetch Transaction from API

```python
# Fetch transaction details and generate link
tx_details = get_transaction_details("eth", safe_address, safe_tx_hash)

if tx_details:
    links = generate_link_from_transaction_data(tx_details, "eth")
    print(f"Transaction link: {links['specific_transaction']}")
```

### Example 4: Get All Pending Transactions with Links

```python
# Get all pending transactions and their links
all_tx_links = get_all_pending_transaction_links("eth", safe_address)

for tx_info in all_tx_links:
    print(f"Nonce {tx_info['nonce']}: {tx_info['links']['specific_transaction']}")
```

### Example 5: Load from JSON File

```python
import json

# Load pending transactions from your JSON export
with open('pending_txs_0xF0E22B_eth_20251007_134238.json', 'r') as f:
    data = json.load(f)

chain = data['chain']
pending_txs = data['pending_transactions']

# Generate links for each transaction
for tx in pending_txs:
    links = generate_link_from_transaction_data(tx, chain)
    nonce = tx['nonce']
    method = tx.get('dataDecoded', {}).get('method', 'unknown')
    
    print(f"Nonce {nonce} ({method}):")
    print(f"  🔗 {links['specific_transaction']}\n")
```

---

## Link Types

### 1. Specific Transaction Link (Recommended for Signing)
Opens directly to a specific transaction for signing:
```
https://app.safe.global/transactions/tx?safe={chain}:{address}&id=multisig_{address}_{txHash}
```

**Use when:** You want someone to sign a specific transaction

### 2. Queue Link
Shows all pending transactions:
```
https://app.safe.global/transactions/queue?safe={chain}:{address}
```

**Use when:** You want to share the full pending transaction queue

### 3. History Link
Shows all executed transactions:
```
https://app.safe.global/transactions/history?safe={chain}:{address}
```

**Use when:** You want to show transaction history

---

## Supported Chains

| Chain | Identifier | Example |
|-------|-----------|---------|
| Ethereum Mainnet | `eth` | `generate_transaction_link(..., "eth", ...)` |
| Sepolia Testnet | `sep` | `generate_transaction_link(..., "sep", ...)` |
| Polygon | `matic` | `generate_transaction_link(..., "matic", ...)` |
| Arbitrum One | `arb1` | `generate_transaction_link(..., "arb1", ...)` |
| Optimism | `oeth` | `generate_transaction_link(..., "oeth", ...)` |
| Base | `base` | `generate_transaction_link(..., "base", ...)` |
| Gnosis Chain | `gno` | `generate_transaction_link(..., "gno", ...)` |
| BSC | `bsc` | `generate_transaction_link(..., "bsc", ...)` |
| Avalanche | `avax` | `generate_transaction_link(..., "avax", ...)` |

---

## Practical Use Cases

### Use Case 1: Share Transaction for Signing

```python
# Generate a link and send it to other Safe owners
link = generate_transaction_link(
    safe_address="0xYourSafeAddress",
    chain="eth",
    safe_tx_hash="0xYourTxHash",
    link_type="specific"
)

print(f"Please sign this transaction: {link}")
```

### Use Case 2: Create Signing Reminders

```python
# Get all pending transactions that need signatures
all_pending = get_all_pending_transaction_links("eth", safe_address)

for tx in all_pending:
    confirmations = tx['confirmations']
    if confirmations != "3/3":  # Not fully signed
        print(f"⚠️ Nonce {tx['nonce']} needs signatures ({confirmations})")
        print(f"   Sign here: {tx['links']['specific_transaction']}\n")
```

### Use Case 3: Export Links to CSV

```python
import csv
from generate_safe_transaction_link import get_all_pending_transaction_links

# Get all pending transactions
all_pending = get_all_pending_transaction_links("eth", safe_address)

# Export to CSV
with open('pending_transactions.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Nonce', 'Method', 'Confirmations', 'Link'])
    
    for tx in all_pending:
        writer.writerow([
            tx['nonce'],
            tx['method'],
            tx['confirmations'],
            tx['links']['specific_transaction']
        ])

print("✅ Exported to pending_transactions.csv")
```

### Use Case 4: Batch Generate Links for Email/Slack

```python
# Generate formatted message for team
all_pending = get_all_pending_transaction_links("eth", safe_address)

message = "🔔 Pending Safe Transactions Need Your Signature:\n\n"

for i, tx in enumerate(all_pending, 1):
    message += f"{i}. Nonce {tx['nonce']} - {tx['method']} ({tx['confirmations']})\n"
    message += f"   {tx['links']['specific_transaction']}\n\n"

print(message)
# Send via email or Slack
```

---

## API Reference

### `generate_transaction_link(safe_address, chain, safe_tx_hash, link_type="specific")`

Generate a Safe UI link for a transaction.

**Parameters:**
- `safe_address` (str): The Safe wallet address
- `chain` (str): Chain identifier (e.g., 'eth', 'matic')
- `safe_tx_hash` (str): The Safe transaction hash
- `link_type` (str): "specific", "queue", or "history"

**Returns:** (str) URL to view/sign the transaction

---

### `generate_link_from_transaction_data(tx_data, chain)`

Generate all relevant links from transaction data.

**Parameters:**
- `tx_data` (dict): Transaction data dictionary (must include 'safe' and 'safeTxHash')
- `chain` (str): Chain identifier

**Returns:** (dict) Dictionary with various link types

---

### `get_transaction_details(chain, safe_address, safe_tx_hash)`

Get transaction details from Safe Transaction Service.

**Parameters:**
- `chain` (str): Chain identifier
- `safe_address` (str): The Safe wallet address
- `safe_tx_hash` (str): The Safe transaction hash

**Returns:** (dict|None) Transaction details or None if not found

---

### `get_all_pending_transaction_links(chain, safe_address)`

Get links for all pending transactions of a Safe.

**Parameters:**
- `chain` (str): Chain identifier
- `safe_address` (str): The Safe wallet address

**Returns:** (list) List of dictionaries with transaction info and links

---

## Tips

1. **Always use the "specific" link type** when asking someone to sign a particular transaction
2. **Share the "queue" link** when you want people to see all pending transactions
3. **Save generated links** to a file if you have many transactions to track
4. **The Safe Tx Hash is unique** across all Safes and chains - it's the best identifier

---

## Troubleshooting

### "Transaction not found"
- Verify the Safe transaction hash is correct
- Make sure you're using the correct chain
- Check if the transaction was already executed or rejected

### "Invalid chain"
- Use the correct chain identifier (see Supported Chains table)
- Common mistake: using "polygon" instead of "matic"

### "Link doesn't open the transaction"
- The Safe UI might be cached - try hard refresh (Ctrl+Shift+R)
- Verify the Safe address and transaction hash in the URL are correct

---

## Complete Working Example

See `example_link_usage.py` for a complete working example with all use cases.

Run it:
```bash
python example_link_usage.py
```
