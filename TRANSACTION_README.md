# Safe Wallet Transaction Scripts

Python scripts to create transactions in Safe wallets using the Safe Transaction Service API.

## 📋 Prerequisites

- Python 3.7+
- A Safe wallet address
- Safe API Key (already configured in `.env`)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements-safe-transaction.txt
```

### 2. Your API Key is Already Configured

Your `.env` file already contains your Safe API key:
```
SAFE_API_KEY=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Run the Simple Example

Edit `simple_transaction_example.py` and update these values:

```python
CHAIN = "sep"  # Your network (sep, eth, matic, arb1, base, etc.)
SAFE_ADDRESS = "0xYourSafeAddressHere"
TO_ADDRESS = "0xRecipientAddressHere"
VALUE_IN_WEI = "1000000000000000"  # Amount to send
```

Then run:

```bash
python simple_transaction_example.py
```

### 4. Or Use the Full-Featured Script

```bash
python create_safe_transaction.py
```

## 📚 Available Scripts

### `simple_transaction_example.py`
A minimal example for creating a Safe transaction. Perfect for quick testing.

**Features:**
- Simple, easy to understand
- Creates a transaction proposal
- Returns transaction data

### `create_safe_transaction.py`
A full-featured class-based implementation.

**Features:**
- Get Safe information (owners, threshold, nonce)
- Create transactions
- Get pending transactions
- Proper error handling
- Reusable `SafeTransactionCreator` class

## 🌐 Supported Networks (Chain IDs)

| Network | Chain ID | Description |
|---------|----------|-------------|
| Ethereum Mainnet | `eth` | Ethereum main network |
| Sepolia | `sep` | Ethereum test network |
| Polygon | `matic` | Polygon (ex-Matic) |
| Arbitrum One | `arb1` | Arbitrum Layer 2 |
| Base | `base` | Coinbase's Base L2 |
| Optimism | `oeth` | Optimism L2 |
| Gnosis Chain | `gno` | Gnosis Chain |
| BNB Chain | `bnb` | Binance Smart Chain |
| Avalanche | `avax` | Avalanche C-Chain |

## 📖 Usage Examples

### Example 1: Create a Simple ETH Transfer

```python
from dotenv import load_dotenv
import os
import requests

load_dotenv()
api_key = os.getenv('SAFE_API_KEY')

url = "https://api.safe.global/tx-service/sep/api/v1/safes/0xYourSafe.../multisig-transactions/"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

transaction = {
    "to": "0xRecipient...",
    "value": "1000000000000000",  # 0.001 ETH
    "data": "0x",
    "operation": 0,
    "nonce": 0
}

response = requests.post(url, headers=headers, json=transaction)
print(response.json())
```

### Example 2: Using the SafeTransactionCreator Class

```python
from create_safe_transaction import SafeTransactionCreator

creator = SafeTransactionCreator()

# Get Safe info
safe_info = creator.get_safe_info("sep", "0xYourSafe...")
print(f"Owners: {safe_info['owners']}")
print(f"Threshold: {safe_info['threshold']}")

# Create transaction
tx_result = creator.create_transaction(
    chain="sep",
    safe_address="0xYourSafe...",
    to_address="0xRecipient...",
    value="1000000000000000",  # 0.001 ETH in wei
)
print(f"Transaction hash: {tx_result.get('safeTxHash')}")
```

## 🔑 API Key Information

Your Safe API key:
- **Type**: JWT (JSON Web Token)
- **Expiration**: 5 years from generation
- **Rate Limit**: 5 requests/second (default)
- **Obtained from**: https://developer.safe.global/

## 📝 Transaction Flow

1. **Propose Transaction**: Script creates transaction and sends to Safe Transaction Service
2. **Collect Signatures**: 
   - If threshold = 1: Transaction can be executed immediately
   - If threshold > 1: Other owners must sign via Safe UI or SDK
3. **Execute Transaction**: Once threshold is met, transaction is executed on-chain

## ⚠️ Important Notes

### Transaction Structure

```python
{
    "to": "0x...",              # Recipient address
    "value": "0",               # Amount in wei
    "data": "0x",               # Transaction data (0x for simple transfers)
    "operation": 0,             # 0 = CALL, 1 = DELEGATECALL
    "safeTxGas": "0",          # Gas for Safe execution
    "baseGas": "0",            # Base gas costs
    "gasPrice": "0",           # Gas price
    "gasToken": "0x0...",      # Token for gas payment (0x0 = ETH)
    "refundReceiver": "0x0...", # Gas refund receiver
    "nonce": 0,                # Transaction nonce
    "signature": ""            # Signature (empty when proposing)
}
```

### Authentication

The API key must be included in the `Authorization` header:
```
Authorization: Bearer YOUR_API_KEY
```

### Rate Limits

- Default: 5 requests/second
- For higher limits: contact support@safe.global

## 🛠️ Troubleshooting

### "401 Unauthorized"
- Check that your API key is valid
- Ensure it's properly loaded from `.env`

### "429 Too Many Requests"
- You've exceeded the rate limit (5 req/sec)
- Add delays between requests

### "404 Not Found"
- Verify the Safe address exists on the specified chain
- Check the chain ID is correct

### "400 Bad Request"
- Verify all required fields are present
- Check that addresses are valid Ethereum addresses
- Ensure values are strings, not numbers

## 📚 Additional Resources

- [Safe API Documentation](https://docs.safe.global/)
- [Safe Transaction Service API](https://docs.safe.global/core-api/transaction-service-api)
- [Safe API Dashboard](https://developer.safe.global/)
- [Safe SDK on GitHub](https://github.com/safe-global/safe-core-sdk)

## 🔗 Related Files

- `.env` - Contains your Safe API key
- `requirements-safe-transaction.txt` - Python dependencies
- `simple_transaction_example.py` - Simple example script
- `create_safe_transaction.py` - Full-featured implementation

## 💡 Tips

1. **Test on Sepolia first**: Use the `sep` chain for testing before mainnet
2. **Get test ETH**: Use a Sepolia faucet for testing
3. **Check Safe owners**: Make sure your connected wallet is an owner
4. **Monitor transactions**: Check Safe UI to see pending transactions
5. **Understand threshold**: Know how many signatures are needed

## 🆘 Support

If you need help:
- Safe Support: support@safe.global
- Safe Discord: https://chat.safe.global/
- Safe Documentation: https://docs.safe.global/
