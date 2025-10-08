"""
Safe Wallet Transaction Creator

This script creates a transaction in a Safe wallet using the Safe Transaction Service API.
It reads the API key from .env file and submits a multi-signature transaction.
"""

import os
import requests
from dotenv import load_dotenv
from typing import Dict, List, Optional
import json

# Load environment variables
load_dotenv()

class SafeTransactionCreator:
    """Class to handle Safe wallet transaction creation"""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the Safe Transaction Creator
        
        Args:
            api_key: Safe API key (defaults to SAFE_API_KEY from .env)
        """
        self.api_key = api_key or os.getenv('SAFE_API_KEY')
        if not self.api_key:
            raise ValueError("SAFE_API_KEY not found in environment variables")
        
        self.base_url = "https://api.safe.global/tx-service"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    def create_transaction(
        self,
        chain: str,
        safe_address: str,
        to_address: str,
        value: str = "0",
        data: str = "0x",
        operation: int = 0,
        safe_tx_gas: str = "0",
        base_gas: str = "0",
        gas_price: str = "0",
        gas_token: str = "0x0000000000000000000000000000000000000000",
        refund_receiver: str = "0x0000000000000000000000000000000000000000",
        nonce: Optional[int] = None,
        signature: str = "",
    ) -> Dict:
        """
        Create a Safe transaction
        
        Args:
            chain: Chain identifier (e.g., 'eth', 'sep', 'matic', etc.)
            safe_address: The Safe wallet address
            to_address: Transaction recipient address
            value: Amount to send in wei (default: "0")
            data: Transaction data (default: "0x")
            operation: Operation type (0=CALL, 1=DELEGATECALL)
            safe_tx_gas: Gas for Safe transaction
            base_gas: Base gas
            gas_price: Gas price
            gas_token: Token address for gas payment
            refund_receiver: Address to receive gas refund
            nonce: Transaction nonce (auto-fetched if None)
            signature: Transaction signature
            
        Returns:
            Dict containing the transaction data
        """
        # Get current nonce if not provided
        if nonce is None:
            nonce = self.get_next_nonce(chain, safe_address)
        
        # Prepare transaction data
        tx_data = {
            "to": to_address,
            "value": value,
            "data": data,
            "operation": operation,
            "safeTxGas": safe_tx_gas,
            "baseGas": base_gas,
            "gasPrice": gas_price,
            "gasToken": gas_token,
            "refundReceiver": refund_receiver,
            "nonce": nonce,
            "signature": signature
        }
        
        # Submit transaction to Safe Transaction Service
        url = f"{self.base_url}/{chain}/api/v1/safes/{safe_address}/multisig-transactions/"
        
        print(f"Creating transaction on {chain} for Safe: {safe_address}")
        print(f"Transaction details: {json.dumps(tx_data, indent=2)}")
        
        response = requests.post(
            url,
            headers=self.headers,
            json=tx_data
        )
        
        if response.status_code == 201:
            print("✅ Transaction created successfully!")
            return response.json()
        else:
            print(f"❌ Error creating transaction: {response.status_code}")
            print(f"Response: {response.text}")
            response.raise_for_status()
    
    def get_next_nonce(self, chain: str, safe_address: str) -> int:
        """
        Get the next available nonce for a Safe wallet
        
        Args:
            chain: Chain identifier
            safe_address: The Safe wallet address
            
        Returns:
            Next available nonce
        """
        url = f"{self.base_url}/{chain}/api/v1/safes/{safe_address}/"
        
        response = requests.get(url, headers=self.headers)
        
        if response.status_code == 200:
            data = response.json()
            nonce = data.get('nonce', 0)
            print(f"Current nonce for Safe {safe_address}: {nonce}")
            return nonce
        else:
            print(f"⚠️ Warning: Could not fetch nonce. Using 0 as default.")
            return 0
    
    def get_safe_info(self, chain: str, safe_address: str) -> Dict:
        """
        Get information about a Safe wallet
        
        Args:
            chain: Chain identifier
            safe_address: The Safe wallet address
            
        Returns:
            Dict containing Safe information (owners, threshold, etc.)
        """
        url = f"{self.base_url}/{chain}/api/v1/safes/{safe_address}/"
        
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        
        return response.json()
    
    def get_pending_transactions(self, chain: str, safe_address: str) -> List[Dict]:
        """
        Get pending transactions for a Safe wallet
        
        Args:
            chain: Chain identifier
            safe_address: The Safe wallet address
            
        Returns:
            List of pending transactions
        """
        url = f"{self.base_url}/{chain}/api/v1/safes/{safe_address}/multisig-transactions/"
        params = {"executed": "false"}
        
        response = requests.get(url, headers=self.headers, params=params)
        response.raise_for_status()
        
        return response.json().get('results', [])


def main():
    """Example usage of SafeTransactionCreator"""
    
    # Initialize the transaction creator
    try:
        creator = SafeTransactionCreator()
        print(f"✅ Initialized with API key: {creator.api_key[:20]}...")
    except ValueError as e:
        print(f"❌ Error: {e}")
        return
    
    # Example: Get Safe information
    # Replace with your actual Safe address and chain
    CHAIN = "eth"  # Sepolia testnet (use 'eth' for mainnet, 'matic' for Polygon, etc.)
    SAFE_ADDRESS = "0x..."  # Your Safe wallet address
    TO_ADDRESS = "0x..."    # Recipient address
    
    print("\n" + "="*50)
    print("Safe Transaction Creator")
    print("="*50 + "\n")
    
    # Example 1: Get Safe info
    print("📋 Getting Safe information...")
    try:
        safe_info = creator.get_safe_info(CHAIN, SAFE_ADDRESS)
        print(f"Safe Address: {safe_info['address']}")
        print(f"Owners: {safe_info['owners']}")
        print(f"Threshold: {safe_info['threshold']}")
        print(f"Nonce: {safe_info['nonce']}")
    except requests.exceptions.HTTPError as e:
        print(f"⚠️ Could not fetch Safe info: {e}")
        print("Make sure to replace SAFE_ADDRESS with a valid Safe wallet address")
    
    # Example 2: Create a transaction
    print("\n" + "-"*50)
    print("Creating a new transaction...")
    print("-"*50 + "\n")
    
    try:
        tx_result = creator.create_transaction(
            chain=CHAIN,
            safe_address=SAFE_ADDRESS,
            to_address=TO_ADDRESS,
            value="1000000000000000",  # 0.001 ETH in wei
            data="0x",
            operation=0,  # CALL
        )
        
        print("\n📦 Transaction Data:")
        print(json.dumps(tx_result, indent=2))
        
    except requests.exceptions.HTTPError as e:
        print(f"⚠️ Could not create transaction: {e}")
        print("This is expected if you haven't replaced the example addresses")
    
    # Example 3: Get pending transactions
    print("\n" + "-"*50)
    print("Getting pending transactions...")
    print("-"*50 + "\n")
    
    try:
        pending_txs = creator.get_pending_transactions(CHAIN, SAFE_ADDRESS)
        print(f"Found {len(pending_txs)} pending transaction(s)")
        
        if pending_txs:
            for i, tx in enumerate(pending_txs[:3], 1):  # Show first 3
                print(f"\nTransaction {i}:")
                print(f"  To: {tx.get('to')}")
                print(f"  Value: {tx.get('value')}")
                print(f"  Confirmations: {tx.get('confirmations', [])}")
                
    except requests.exceptions.HTTPError as e:
        print(f"⚠️ Could not fetch pending transactions: {e}")


if __name__ == "__main__":
    main()
