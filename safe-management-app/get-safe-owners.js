async function getSafeOwners() {
  try {
    const safeAddress = '0x7B389710824aa7e8821bc4ae10f1f7411B8Be04F';
    const apiKey = 'your_safe_api_key_here'; // Replace with your actual API key
    
    const response = await fetch(
      `https://safe-transaction-mainnet.safe.global/api/v1/safes/${safeAddress}/`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('Safe Info:');
    console.log('Address:', data.address);
    console.log('Owners:', data.owners);
    console.log('Threshold:', data.threshold);
    console.log('Nonce:', data.nonce);
    console.log('Version:', data.version);
    
    if (data.owners && data.owners.length > 0) {
      console.log('\nYou can use any of these addresses as a signer:');
      data.owners.forEach((owner, index) => {
        console.log(`${index + 1}. ${owner}`);
      });
    }
    
  } catch (error) {
    console.error('Error fetching Safe info:', error.message);
    console.log('\nMake sure to:');
    console.log('1. Replace "your_safe_api_key_here" with your actual Safe API key');
    console.log('2. The Safe address is correct');
    console.log('3. You have internet connection');
  }
}

getSafeOwners();
