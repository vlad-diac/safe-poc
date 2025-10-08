'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, Loader2, CheckCircle2, AlertTriangle, Wallet } from 'lucide-react';
import { useSendTransaction, useSafe } from '@safe-global/safe-react-hooks';
import { toast } from 'sonner';
import { parseEther } from 'ethers';
import { useRouter } from 'next/navigation';

export default function CreateTransactionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    to: '',
    value: '',
    data: '0x',
    operation: '0',
  });
  const [submitting, setSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Get Safe connection status
  const { isSignerConnected, isOwnerConnected } = useSafe();

  // Use the Safe SDK hook for sending transactions
  const { sendTransaction, data: txData, isPending, isSuccess, error: txError } = useSendTransaction();

  // Update txHash when transaction is successful
  useEffect(() => {
    if (isSuccess && txData) {
      // txData might contain hash or transactionHash depending on the SDK version
      const hash = (txData as any).safeTxHash || (txData as any).hash || (txData as any).transactionHash || '';
      setTxHash(hash);
      toast.success('Transaction created successfully!');
      
      // Reset form
      setFormData({
        to: '',
        value: '',
        data: '0x',
        operation: '0',
      });
    }
  }, [isSuccess, txData]);

  // Handle transaction errors
  useEffect(() => {
    if (txError) {
      toast.error(txError?.message || 'Failed to create transaction');
    }
  }, [txError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);

      // Validate address
      if (!formData.to || !formData.to.match(/^0x[a-fA-F0-9]{40}$/)) {
        toast.error('Invalid recipient address');
        setSubmitting(false);
        return;
      }

      // Validate value
      if (!formData.value || isNaN(parseFloat(formData.value))) {
        toast.error('Invalid ETH value');
        setSubmitting(false);
        return;
      }

      // Prepare transaction using Safe SDK format
      const transactions = [{
        to: formData.to,
        value: parseEther(formData.value).toString(),
        data: formData.data || '0x',
      }];

      // Send transaction using Safe SDK hook
      // This will automatically:
      // - Create and propose the transaction if threshold > 1
      // - Execute immediately if threshold = 1
      // - Deploy the Safe if not yet deployed
      await sendTransaction({ transactions });

    } catch (error: any) {
      console.error('Failed to create transaction:', error);
      toast.error(error?.message || 'Failed to create transaction');
    } finally {
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
                  href={`https://app.safe.global/transactions/queue?safe=eth:${formData.to}`}
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
      {!isSignerConnected && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Wallet Not Connected</strong>
            <p className="mt-1">Please connect your wallet using the "Connect Wallet" button in the top right corner to create transactions.</p>
          </AlertDescription>
        </Alert>
      )}

      {isSignerConnected && !isOwnerConnected && (
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
          <CardContent className="space-y-4">
            {/* To Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Recipient Address <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="0x..."
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                required
                pattern="^0x[a-fA-F0-9]{40}$"
              />
              <p className="text-xs text-muted-foreground">
                The Ethereum address that will receive the transaction
              </p>
            </div>

            {/* Value */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Value (ETH) <span className="text-destructive">*</span>
              </label>
              <Input
                type="number"
                step="0.000000000000000001"
                placeholder="0.0"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
                min="0"
              />
              <p className="text-xs text-muted-foreground">
                Amount of ETH to send (e.g., 0.1)
              </p>
            </div>

            {/* Data */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Data (Optional)</label>
              <Input
                placeholder="0x"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Hex-encoded contract interaction data (leave as 0x for simple transfers)
              </p>
            </div>

            {/* Operation Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Operation Type</label>
              <Select 
                value={formData.operation} 
                onValueChange={(value) => setFormData({ ...formData, operation: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Call</SelectItem>
                  <SelectItem value="1">DelegateCall</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Use "Call" for standard transactions, "DelegateCall" for advanced use cases
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={submitting || !isSignerConnected || !isOwnerConnected} 
                className="w-full"
              >
                {!isSignerConnected ? (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet to Continue
                  </>
                ) : !isOwnerConnected ? (
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
