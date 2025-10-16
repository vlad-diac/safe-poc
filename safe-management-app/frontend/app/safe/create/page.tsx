'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, Loader2, CheckCircle2, AlertTriangle, Wallet, X } from 'lucide-react';
import { useSafe } from '@/app/providers/SafeProvider';
import { toast } from 'sonner';
import { parseEther } from 'ethers';
import { useRouter } from 'next/navigation';

interface Recipient {
  address: string;
  amount: string;
  data?: string;
}

/**
 * Adjust personal_sign signature for Safe Transaction Service
 * Safe needs v value adjusted to indicate eth_signed_message format
 */
function adjustPersonalSignatureForSafe(signature: string): string {
  // Signature is in format: 0x + r (64 chars) + s (64 chars) + v (2 chars)
  const r = signature.slice(0, 66); // 0x + 64 chars
  const s = '0x' + signature.slice(66, 130); // 64 chars
  let v = parseInt(signature.slice(130, 132), 16); // last 2 chars

  // Adjust v value for personal_sign: add 4 to indicate eth_signed_message
  // This tells Safe that the signature used the Ethereum Signed Message prefix
  if (v < 27) {
    v += 27;
  }
  v += 4; // Add 4 to indicate personal_sign / eth_signed_message format

  // Reconstruct signature
  const adjustedV = v.toString(16).padStart(2, '0');
  return r + s.slice(2) + adjustedV;
}

export default function CreateTransactionPage() {
  const router = useRouter();
  const [recipients, setRecipients] = useState<Recipient[]>([
    { address: '', amount: '', data: '0x' }
  ]);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [checkingOwnership, setCheckingOwnership] = useState(true);

  // Get Safe context
  const { safeClient, connectedWallet, isOwner, session } = useSafe();

  // Debug connection status
  useEffect(() => {
    console.log('🔍 Create Transaction Page - Connection Status:', {
      hasClient: !!safeClient,
      connectedWallet,
      isOwner,
    });
  }, [safeClient, connectedWallet, isOwner]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!safeClient) {
      toast.error('Safe client not initialized');
      return;
    }

    if (!connectedWallet) {
      toast.error('No wallet connected. Please connect your wallet.');
      return;
    }

    if (!isOwner) {
      toast.error('Connected wallet is not a Safe owner');
      return;
    }
    
    console.log('🚀 Form submitted!', {
      connectedWallet,
      isOwner,
      recipients
    });
    
    try {
      setSubmitting(true);

      // Validate all recipients
      for (let i = 0; i < recipients.length; i++) {
        const recipient = recipients[i];
        
        if (!recipient.address || !recipient.address.match(/^0x[a-fA-F0-9]{40}$/)) {
          toast.error(`Invalid address for recipient ${i + 1}`);
          return;
        }

        if (!recipient.amount || isNaN(parseFloat(recipient.amount))) {
          toast.error(`Invalid amount for recipient ${i + 1}`);
          return;
        }
      }

      // Prepare recipients for backend
      const recipientsData = recipients.map(r => ({
        address: r.address,
        amount: parseEther(r.amount).toString(),
        data: r.data || '0x',
        operation: 0, // CALL operation
      }));

      console.log('📤 Starting backend-heavy transaction flow...');
      
      // Step 1: Backend creates transaction
      console.log('1️⃣ Creating transaction on backend...');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const createResponse = await fetch(`${apiUrl}/api/batch-transactions/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          sessionId: session?.id,
          recipients: recipientsData,
          description: description || `Batch payment to ${recipientsData.length} recipient(s)`
        })
      });

      if (!createResponse.ok) {
        const error = await createResponse.json();
        throw new Error(error.details || 'Failed to create transaction');
      }

      const { safeTxHash, draftId } = await createResponse.json();
      console.log('✅ Transaction created:', safeTxHash);

      // Step 2: Frontend signs with personal_sign (works with default MetaMask settings!)
      console.log('2️⃣ Signing transaction hash with personal_sign...');
      console.log('📝 This works with default MetaMask settings - no configuration needed!');
      
      // Use personal_sign (enabled by default in MetaMask)
      let signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [safeTxHash, connectedWallet]
      }) as string;
      
      console.log('✅ Personal signature received:', signature);
      
      // Adjust signature for Safe: personal_sign adds a prefix, so we need to adjust the v value
      // Safe expects v >= 27. When using personal_sign, add 4 to v to indicate eth_signed_message
      const adjustedSignature = adjustPersonalSignatureForSafe(signature);
      console.log('✅ Signature adjusted for Safe:', adjustedSignature);
      
      const finalSignature = adjustedSignature;

      // Step 3: Backend proposes transaction to Safe Transaction Service
      console.log('3️⃣ Proposing transaction to Safe...');
      const proposeResponse = await fetch(`${apiUrl}/api/batch-transactions/propose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          draftId,
          senderAddress: connectedWallet,
          senderSignature: finalSignature
        })
      });

      if (!proposeResponse.ok) {
        const error = await proposeResponse.json();
        throw new Error(error.details || 'Failed to propose transaction');
      }

      const result = await proposeResponse.json();
      console.log('✅ Transaction proposed successfully!', result);
      
      setTxHash(safeTxHash);
      toast.success('Transaction created successfully!');
      
      // Reset form
      setRecipients([{ address: '', amount: '', data: '0x' }]);
      setDescription('');

    } catch (error: any) {
      console.error('❌ Failed to create transaction:', error);
      console.error('❌ Error details:', {
        message: error?.message,
        code: error?.code,
        data: error?.data,
      });
      
      // Check if it's an eth_sign disabled error
      if (error?.code === -32601 || error?.message?.includes('does not exist')) {
        toast.error(
          'eth_sign is disabled in MetaMask. Please enable it:\n' +
          '1. Open MetaMask > Settings > Advanced\n' +
          '2. Enable "Eth_sign requests"\n' +
          '3. Try again',
          { duration: 10000 }
        );
      } else {
        toast.error(error?.message || 'Failed to create transaction');
      }
    } finally {
      console.log('🏁 Finally block - resetting submitting state');
      setSubmitting(false);
    }
  };

  if (txHash) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <CardTitle>Transaction Created!</CardTitle>
            </div>
            <CardDescription>
              Your transaction has been proposed successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium">Safe Transaction Hash:</span>
              <p className="text-sm font-mono text-muted-foreground break-all mt-1 p-2 bg-muted rounded">
                {txHash}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setTxHash(null)}>
                Create Another
              </Button>
              <Button variant="outline" onClick={() => router.push('/safe/transactions')}>
                View Transactions
              </Button>
              <Button 
                variant="outline" 
                asChild
              >
                <a
                  href={`https://app.safe.global/transactions/queue?safe=eth:${session?.safeAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View in Safe App
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Create Transaction</h1>
        <p className="text-muted-foreground">Propose a new transaction to your Safe</p>
      </div>

      {/* Connection Status Alerts */}
      {!connectedWallet && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Wallet Not Connected</strong>
            <p className="mt-1">Please connect your wallet using the "Connect Wallet" button in the top right corner to create transactions.</p>
          </AlertDescription>
        </Alert>
      )}

      {connectedWallet && !isOwner && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Not a Safe Owner</strong>
            <p className="mt-1">The connected wallet is not an owner of this Safe. Only Safe owners can create and sign transactions.</p>
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>
              Fill in the details for your new transaction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (Optional)</label>
              <Input
                placeholder="e.g., Monthly team payments"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Optional description for this transaction batch
              </p>
            </div>

            {/* Recipients */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Recipients ({recipients.length})
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRecipients([...recipients, { address: '', amount: '', data: '0x' }])}
                >
                  + Add Recipient
                </Button>
              </div>

              {recipients.map((recipient, index) => (
                <Card key={index} className="p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Recipient {index + 1}</span>
                    {recipients.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setRecipients(recipients.filter((_, i) => i !== index))}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="0x..."
                      value={recipient.address}
                      onChange={(e) => {
                        const newRecipients = [...recipients];
                        newRecipients[index].address = e.target.value;
                        setRecipients(newRecipients);
                      }}
                      required
                      pattern="^0x[a-fA-F0-9]{40}$"
                    />
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Amount (ETH) <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="number"
                      step="0.000000000000000001"
                      placeholder="0.0"
                      value={recipient.amount}
                      onChange={(e) => {
                        const newRecipients = [...recipients];
                        newRecipients[index].amount = e.target.value;
                        setRecipients(newRecipients);
                      }}
                      required
                      min="0"
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={submitting || !connectedWallet || !isOwner} 
                className="w-full"
                onClick={() => console.log('🖱️ Button clicked!', { disabled: submitting || !connectedWallet || !isOwner })}
              >
                {!connectedWallet ? (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet to Continue
                  </>
                ) : !isOwner ? (
                  <>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Not a Safe Owner
                  </>
                ) : submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Transaction...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Create Transaction
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Info Card */}
      <Card className="border-blue-500/50 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-sm">Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li><strong>You must be a Safe owner</strong> to create and sign transactions</li>
            <li>This will create a transaction proposal that requires signatures</li>
            <li>If your Safe requires multiple signatures, other owners must sign before execution</li>
            <li>Make sure you have enough ETH in your Safe to cover the transaction value and gas fees</li>
            <li>Double-check the recipient address before submitting</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
