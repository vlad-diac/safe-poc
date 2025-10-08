"""
Simple Safe Transaction Example

A minimal example to create a Safe wallet transaction using the API key from .env
"""

import os
import requests
import json
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
SAFE_API_KEY = os.getenv('SAFE_API_KEY')

if not SAFE_API_KEY:
    raise ValueError("SAFE_API_KEY not found in .env file")

print(f"✅ Loaded API key: {SAFE_API_KEY[:30]}...\n")


def create_safe_transaction(
    chain: str,
    safe_address: str,
    to_address: str,
    value: str = "0",
    data: str = "0x"
):
    """
    Create a Safe transaction
    
    Args:
        chain: Chain ID (e.g., 'eth', 'sep', 'matic', 'base', 'arb1')
        safe_address: Your Safe wallet address
        to_address: Recipient address
        value: Amount in wei (default: "0")
        data: Transaction data (default: "0x")
    
    Returns:
        Transaction data as dictionary
    """
    
    url = f"https://api.safe.global/tx-service/{chain}/api/v1/safes/{safe_address}/multisig-transactions/"
    
    headers = {
        "Authorization": f"Bearer {SAFE_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Get current nonce
    safe_info_url = f"https://api.safe.global/tx-service/{chain}/api/v1/safes/{safe_address}/"
    safe_info_response = requests.get(safe_info_url, headers=headers)
    
    if safe_info_response.status_code == 200:
        nonce = safe_info_response.json().get('nonce', 0)
        print(f"📋 Current Safe nonce: {nonce}")
    else:
        print(f"⚠️ Could not fetch Safe info: {safe_info_response.status_code}")
        nonce = 0
    
    # Transaction payload
    transaction_data = {
        "to": to_address,
        "value": value,
        "data": data,
        "operation": 0,  # 0 = CALL, 1 = DELEGATECALL
        "safeTxGas": "0",
        "baseGas": "0",
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": "0x0000000000000000000000000000000000000000",
        "nonce": nonce,
        "signature": ""  # Empty signature for proposing a transaction
    }
    
    print(f"\n📤 Sending transaction to Safe Transaction Service...")
    print(f"Chain: {chain}")
    print(f"Safe Address: {safe_address}")
    print(f"To: {to_address}")
    print(f"Value: {value} wei\n")
    
    # Send the transaction
    response = requests.post(url, headers=headers, json=transaction_data)
    
    if response.status_code == 201:
        print("✅ Transaction created successfully!\n")
        result = response.json()
        print("📦 Transaction Data:")
        print(json.dumps(result, indent=2))
        return result
    else:
        print(f"❌ Error: {response.status_code}")
        print(f"Response: {response.text}\n")
        response.raise_for_status()


# Example usage
if __name__ == "__main__":
    print("="*60)
    print("Safe Transaction Creator - Simple Example")
    print("="*60 + "\n")
    
    # ⚠️ Replace these with your actual values
    CHAIN = "eth"  # Sepolia testnet
    # Other chains: 'eth' (Ethereum), 'matic' (Polygon), 'arb1' (Arbitrum), 
    #               'base' (Base), 'oeth' (Optimism), etc.
    
    SAFE_ADDRESS = "0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F"
    TO_ADDRESS = "0x4a1c00B98655bc316acDe625BB0197DccE0b8dEd"
    VALUE_IN_WEI = "1000000000000000"  # 0.001 ETH
    
    if SAFE_ADDRESS == "0xYourSafeAddressHere":
        print("⚠️ Please update the script with your actual Safe address!")
        print("\nTo use this script:")
        print("1. Replace SAFE_ADDRESS with your Safe wallet address")
        print("2. Replace TO_ADDRESS with the recipient address")
        print("3. Set the CHAIN to your desired network")
        print("4. Adjust VALUE_IN_WEI if sending ETH/native tokens")
        print("\nAvailable chains:")
        print("  - 'eth': Ethereum Mainnet")
        print("  - 'sep': Sepolia Testnet")
        print("  - 'matic': Polygon")
        print("  - 'arb1': Arbitrum One")
        print("  - 'base': Base")
        print("  - 'oeth': Optimism")
        print("  - 'gno': Gnosis Chain")
    else:
        try:
            # Create the transaction
            tx_data = create_safe_transaction(
                chain=CHAIN,
                safe_address=SAFE_ADDRESS,
                to_address=TO_ADDRESS,
                value=VALUE_IN_WEI,
                data="0x"
            )
            
            print("\n" + "="*60)
            print("✅ Transaction submitted successfully!")
            print("="*60)
            
            # Extract important info
            if 'safeTxHash' in tx_data:
                print(f"\n🔑 Safe Transaction Hash: {tx_data['safeTxHash']}")
            
        except Exception as e:
            print(f"\n❌ Error occurred: {str(e)}")
