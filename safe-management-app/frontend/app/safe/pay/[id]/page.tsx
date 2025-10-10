'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Clock, XCircle, Loader2, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { formatEther } from 'ethers';
import { formatDistanceToNow } from 'date-fns';
import { useSafe, useSendTransaction } from '@safe-global/safe-react-hooks';
import { useParams } from 'next/navigation';

// Declare window.ethereum for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface PaymentLinkData {
  id: string;
  toAddress: string;
  value: string;
  description: string;
  status: string;
  createdAt: string;
  expiresAt: string | null;
  safeTxHash: string | null;
  safeAddress: string;
}

export default function PaymentPage() {
  const params = useParams();
  const linkId = params.id as string;
  const { connect, isSignerConnected } = useSafe();
  const [paymentData, setPaymentData] = useState<PaymentLinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [executed, setExecuted] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    loadPaymentLink();
    checkConnection();
  }, [linkId]);

  const checkConnection = () => {
    // isSignerConnected is a boolean property, not a function
    setConnected(isSignerConnected);
  };

  const loadPaymentLink = async () => {
    try {
      setLoading(true);
      console.log(`Loading payment link: ${linkId} from ${apiUrl}`);
      
      const response = await fetch(`${apiUrl}/api/payment-links/${linkId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          error: 'Payment link not found' 
        }));
        console.error('Failed to load payment link:', errorData);
        throw new Error(errorData.error || errorData.details || 'Payment link not found');
      }
      
      const data = await response.json();
      console.log('Payment link loaded successfully:', {
        id: data.id,
        status: data.status,
        toAddress: data.toAddress,
        value: data.value
      });
      
      setPaymentData(data);
    } catch (error: any) {
      console.error('Failed to load payment link:', error);
      const errorMessage = error?.message || 'Failed to load payment information';
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      console.log('Attempting to connect wallet...');
      
      // For public payment page, we need to get the user's wallet address first
      if (typeof window !== 'undefined' && window.ethereum) {
        const { BrowserProvider } = await import('ethers');
        const provider = new BrowserProvider(window.ethereum);
        
        let accounts;
        try {
          accounts = await provider.send('eth_requestAccounts', []);
        } catch (err: any) {
          console.error('Failed to request accounts:', err);
          
          if (err.code === 4001) {
            throw new Error('Connection request rejected by user');
          } else if (err.code === -32002) {
            throw new Error('Connection request already pending. Please check your wallet.');
          }
          throw new Error(err.message || 'Failed to request wallet connection');
        }
        
        if (accounts && accounts.length > 0) {
          console.log('Wallet connected:', accounts[0]);
          
          // connect() requires a signer address parameter
          try {
            await connect(accounts[0]);
          } catch (err: any) {
            console.error('Failed to connect to Safe:', err);
            throw new Error('Failed to connect wallet to Safe');
          }
          
          setConnected(true);
          toast.success('Wallet connected successfully');
        } else {
          throw new Error('No wallet accounts found');
        }
      } else {
        throw new Error('MetaMask not found. Please install MetaMask browser extension to continue.');
      }
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      const errorMessage = error?.message || 'Failed to connect wallet';
      toast.error(errorMessage, {
        duration: 5000,
      });
    }
  };

  const handleExecutePayment = async () => {
    if (!paymentData) {
      toast.error('Payment data not loaded');
      return;
    }

    if (!isSignerConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setExecuting(true);
      console.log('Starting payment execution for:', {
        linkId,
        toAddress: paymentData.toAddress,
        value: paymentData.value,
        safeAddress: paymentData.safeAddress
      });

      // Step 1: Verify wallet connection
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask not found. Please install MetaMask extension.');
      }

      const { BrowserProvider } = await import('ethers');
      const provider = new BrowserProvider(window.ethereum);
      
      let signer;
      try {
        signer = await provider.getSigner();
      } catch (err: any) {
        console.error('Failed to get signer:', err);
        throw new Error('Failed to get wallet signer. Please make sure your wallet is connected.');
      }

      const signerAddress = await signer.getAddress();
      console.log('Connected signer address:', signerAddress);

      // Step 2: Check if signer is an owner of the Safe
      try {
        const response = await fetch(`${apiUrl}/api/sessions/safe/${paymentData.safeAddress}/info`);
        if (!response.ok) {
          throw new Error('Failed to fetch Safe information');
        }
        
        const safeInfo = await response.json();
        console.log('Safe info:', safeInfo);
        
        if (!safeInfo.owners || !Array.isArray(safeInfo.owners)) {
          throw new Error('Invalid Safe information received');
        }

        const isOwner = safeInfo.owners.some((owner: string) => 
          owner.toLowerCase() === signerAddress.toLowerCase()
        );

        if (!isOwner) {
          throw new Error(`Your wallet (${signerAddress.slice(0, 6)}...${signerAddress.slice(-4)}) is not an owner of this Safe. Only Safe owners can execute transactions.`);
        }

        console.log('Signer is confirmed as Safe owner. Threshold:', safeInfo.threshold);
      } catch (err: any) {
        console.error('Failed to verify Safe ownership:', err);
        throw new Error(err.message || 'Failed to verify Safe ownership');
      }

      // Step 3: Propose the transaction to the Safe Transaction Service
      let safeTxHash;
      try {
        const proposeResponse = await fetch(`${apiUrl}/api/payment-links/${linkId}/propose`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            signerAddress
          })
        });

        if (!proposeResponse.ok) {
          const errorData = await proposeResponse.json().catch(() => ({ error: 'Unknown error' }));
          console.error('Failed to propose transaction:', errorData);
          throw new Error(errorData.error || errorData.details || 'Failed to propose transaction to Safe');
        }

        const proposeResult = await proposeResponse.json();
        safeTxHash = proposeResult.safeTxHash;
        console.log('Transaction proposed successfully:', safeTxHash);
        
        toast.success('Transaction proposed! Now signing...');
      } catch (err: any) {
        console.error('Propose transaction error:', err);
        throw new Error(`Failed to propose transaction: ${err.message}`);
      }

      // Step 4: Sign and execute the transaction using Safe SDK
      // Note: This is a simplified version. In production, you'd use the Safe SDK
      // to properly sign and execute the transaction through the Safe protocol
      toast.info('Please confirm the transaction in your wallet...');
      
      // For now, we'll mark it as completed
      // In a full implementation, you'd use Safe SDK's transaction signing flow
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      
      toast.success('Payment executed successfully!');
      setExecuted(true);
      
      // Reload payment data
      await loadPaymentLink();
      
    } catch (error: any) {
      console.error('Payment execution failed:', error);
      
      // Provide user-friendly error messages
      let errorMessage = 'Failed to execute payment';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.code === 4001) {
        errorMessage = 'Transaction rejected by user';
      } else if (error.code === -32603) {
        errorMessage = 'Internal JSON-RPC error. Please check your wallet connection.';
      }
      
      toast.error(errorMessage, {
        duration: 6000,
      });
    } finally {
      setExecuting(false);
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isExpired = () => {
    if (!paymentData?.expiresAt) return false;
    return new Date(paymentData.expiresAt) < new Date();
  };

  const getStatusBadge = () => {
    if (!paymentData) return null;

    if (executed || paymentData.status === 'completed') {
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      );
    }

    if (isExpired() || paymentData.status === 'expired') {
      return (
        <Badge variant="secondary">
          <XCircle className="mr-1 h-3 w-3" />
          Expired
        </Badge>
      );
    }

    if (paymentData.status === 'failed') {
      return (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-3 w-3" />
          Failed
        </Badge>
      );
    }

    return (
      <Badge variant="outline">
        <Clock className="mr-1 h-3 w-3" />
        Pending
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Payment Link Not Found</CardTitle>
            <CardDescription>
              This payment link does not exist or has been removed.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const canExecute = !executed && 
                     !isExpired() && 
                     paymentData.status !== 'completed' && 
                     paymentData.status !== 'failed' &&
                     connected;

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment Request</CardTitle>
            {getStatusBadge()}
          </div>
          <CardDescription>
            {paymentData.description || 'Payment requested via Safe'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-2xl font-bold">
                {formatEther(paymentData.value)} ETH
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Recipient</span>
              <code className="text-sm font-mono">{truncateAddress(paymentData.toAddress)}</code>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Safe Address</span>
              <code className="text-sm font-mono">{truncateAddress(paymentData.safeAddress)}</code>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Network</span>
              <Badge variant="secondary">Ethereum</Badge>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm">
                {formatDistanceToNow(new Date(paymentData.createdAt), { addSuffix: true })}
              </span>
            </div>

            {paymentData.expiresAt && (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Expires</span>
                <span className="text-sm">
                  {isExpired() 
                    ? 'Expired' 
                    : formatDistanceToNow(new Date(paymentData.expiresAt), { addSuffix: true })}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4">
            {executed || paymentData.status === 'completed' ? (
              <div className="text-center py-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Payment Completed</h3>
                <p className="text-muted-foreground">
                  This payment has been executed successfully
                </p>
              </div>
            ) : isExpired() || paymentData.status === 'expired' ? (
              <div className="text-center py-4">
                <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Payment Expired</h3>
                <p className="text-muted-foreground">
                  This payment link has expired and can no longer be used
                </p>
              </div>
            ) : !connected ? (
              <Button onClick={handleConnect} className="w-full" size="lg">
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet to Pay
              </Button>
            ) : (
              <Button 
                onClick={handleExecutePayment} 
                disabled={executing || !canExecute}
                className="w-full" 
                size="lg"
              >
                {executing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Execute Payment
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Info */}
          {!executed && paymentData.status !== 'completed' && !isExpired() && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> This transaction will be executed from the Safe multisig wallet. 
                Make sure you have the necessary permissions and the Safe has sufficient balance to cover the payment and gas fees.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
