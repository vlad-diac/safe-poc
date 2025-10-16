/**
 * Batch Transaction Service
 * 
 * Handles the create → sign → propose flow for batch transactions.
 * Backend handles transaction creation and validation.
 * Frontend only handles wallet signing.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface BatchRecipient {
  address: string;
  amount: string;
  token?: string;
  data?: string;
}

/**
 * Validate batch transaction before creating
 */
export async function validateBatchTransaction(
  sessionId: string,
  recipients: BatchRecipient[]
) {
  const response = await fetch(`${API_URL}/api/batch-transactions/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ sessionId, recipients })
  });

  if (!response.ok) {
    throw new Error('Validation failed');
  }

  return await response.json();
}

/**
 * Create batch transaction on backend
 */
export async function createBatchTransaction(
  sessionId: string,
  recipients: BatchRecipient[],
  description?: string
) {
  const response = await fetch(`${API_URL}/api/batch-transactions/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ sessionId, recipients, description })
  });

  if (!response.ok) {
    throw new Error('Failed to create transaction');
  }

  return await response.json();
}

/**
 * Sign transaction hash using wallet
 */
async function signHash(walletAddress: string, safeTxHash: string): Promise<string> {
  if (!window.ethereum) {
    throw new Error('No wallet provider found');
  }

  try {
    const signature = await window.ethereum.request({
      method: 'eth_sign',
      params: [walletAddress, safeTxHash],
    });

    return signature;
  } catch (error) {
    console.error('Failed to sign hash:', error);
    throw error;
  }
}

/**
 * Propose transaction with signature
 */
export async function proposeTransaction(
  draftId: string,
  senderAddress: string,
  senderSignature: string
) {
  const response = await fetch(`${API_URL}/api/batch-transactions/propose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ draftId, senderAddress, senderSignature })
  });

  if (!response.ok) {
    throw new Error('Failed to propose transaction');
  }

  return await response.json();
}

/**
 * Complete flow: Create → Sign → Propose
 */
export async function createAndProposeBatchTransaction(
  sessionId: string,
  senderAddress: string,
  recipients: BatchRecipient[],
  description?: string
) {
  console.log('🚀 Starting batch transaction flow...');

  // Step 1: Backend creates transaction
  console.log('1️⃣ Creating transaction on backend...');
  const { safeTxHash, draftId } = await createBatchTransaction(
    sessionId,
    recipients,
    description
  );

  // Step 2: Frontend signs hash (prompts wallet)
  console.log('2️⃣ Signing transaction hash...');
  const signature = await signHash(senderAddress, safeTxHash);

  // Step 3: Backend proposes transaction
  console.log('3️⃣ Proposing transaction to Safe...');
  const result = await proposeTransaction(draftId, senderAddress, signature);

  console.log('✅ Batch transaction flow complete!');

  return result;
}

/**
 * Get transaction details
 */
export async function getTransactionDetails(sessionId: string, safeTxHash: string) {
  const response = await fetch(
    `${API_URL}/api/batch-transactions/${safeTxHash}?sessionId=${sessionId}`,
    { credentials: 'include' }
  );

  if (!response.ok) {
    throw new Error('Failed to get transaction details');
  }

  return await response.json();
}

