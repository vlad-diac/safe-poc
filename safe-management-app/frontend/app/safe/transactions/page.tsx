'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ChevronDown, 
  ChevronRight, 
  Copy, 
  ExternalLink, 
  Search,
  PenLine,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useSafe, useConfirmTransaction } from '@safe-global/safe-react-hooks';
import { toast } from 'sonner';
import { formatEther } from 'ethers';
import { useSearchParams } from 'next/navigation';

export default function TransactionsPage() {
  const { getTransactions, getPendingTransactions, isOwnerConnected } = useSafe();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all');
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  // Use hooks properly - these return TanStack Query objects
  // Enable auto-refresh for pending transactions (every 10 seconds)
  const allTransactionsQuery = getTransactions();
  const pendingTransactionsQuery = getPendingTransactions();

  useEffect(() => {
    checkOwnerStatus();
  }, []);

  // Auto-refresh pending transactions to detect new signatures
  useEffect(() => {
    const pendingCount = pendingTransactionsQuery.data?.length ?? 0;
    if (filter === 'pending' && pendingCount > 0) {
      const intervalId = setInterval(() => {
        console.log('Auto-refreshing pending transactions...');
        pendingTransactionsQuery.refetch();
      }, 10000); // Refresh every 10 seconds

      return () => clearInterval(intervalId);
    }
  }, [filter, pendingTransactionsQuery.data?.length]);

  const checkOwnerStatus = () => {
    setIsOwner(isOwnerConnected);
  };

  // Determine which data to use based on filter
  const getCurrentTransactions = () => {
    if (filter === 'pending') {
      return pendingTransactionsQuery.data || [];
    } else {
      const allTxs = allTransactionsQuery.data || [];
      if (filter === 'all') {
        return allTxs;
      } else if (filter === 'executed') {
        return allTxs.filter((tx: any) => tx.isExecuted);
      } else if (filter === 'failed') {
        return allTxs.filter((tx: any) => tx.isExecuted === false && tx.confirmations?.length > 0);
      }
      return allTxs;
    }
  };

  const transactions = getCurrentTransactions();
  const loading = filter === 'pending' ? pendingTransactionsQuery.isLoading : allTransactionsQuery.isLoading;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusBadge = (tx: any) => {
    if (tx.isExecuted) {
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Executed
        </Badge>
      );
    }
    
    if (tx.confirmations?.length >= tx.confirmationsRequired) {
      return (
        <Badge variant="default" className="bg-blue-500">
          <AlertCircle className="mr-1 h-3 w-3" />
          Ready
        </Badge>
      );
    }
    
    return (
      <Badge variant="secondary">
        <Clock className="mr-1 h-3 w-3" />
        Pending
      </Badge>
    );
  };

  const filteredTransactions = transactions.filter((tx: any) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      tx.to?.toLowerCase().includes(query) ||
      tx.safeTxHash?.toLowerCase().includes(query) ||
      tx.transactionHash?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Manage and review your Safe transactions</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (filter === 'pending') {
              pendingTransactionsQuery.refetch();
            } else {
              allTransactionsQuery.refetch();
            }
            toast.success('Transactions refreshed');
          }}
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Auto-refresh notification for pending transactions */}
      {filter === 'pending' && (pendingTransactionsQuery.data?.length ?? 0) > 0 && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Auto-refreshing every 10 seconds to detect new signatures from other owners.
            {' '}Signatures added on app.safe.global will appear here automatically.
          </AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by address or hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs & Table */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="executed">Executed</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {filter === 'all' && 'All Transactions'}
                {filter === 'pending' && 'Pending Transactions'}
                {filter === 'executed' && 'Executed Transactions'}
              </CardTitle>
              <CardDescription>
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? 'Try adjusting your search query'
                      : 'Create your first transaction to get started'}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Confirmations</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((tx: any) => (
                      <>
                        <TableRow key={tx.safeTxHash} className="cursor-pointer hover:bg-muted/50">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedTx(expandedTx === tx.safeTxHash ? null : tx.safeTxHash)}
                              className="h-8 w-8 p-0"
                            >
                              {expandedTx === tx.safeTxHash ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs">{truncateAddress(tx.to)}</code>
                          </TableCell>
                          <TableCell>
                            {tx.value ? formatEther(tx.value) : '0'} ETH
                          </TableCell>
                          <TableCell>{getStatusBadge(tx)}</TableCell>
                          <TableCell>
                            {tx.confirmations?.length || 0} / {tx.confirmationsRequired || 0}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(tx.safeTxHash)}
                                className="h-8 w-8 p-0"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="h-8 w-8 p-0"
                              >
                                <a
                                  href={`https://app.safe.global/transactions/tx?safe=eth:${tx.safe}&id=multisig_${tx.safe}_${tx.safeTxHash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        
                        {/* Expanded Row */}
                        {expandedTx === tx.safeTxHash && (
                          <TableRow>
                            <TableCell colSpan={6} className="bg-muted/50">
                              <div className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <span className="text-sm font-medium">Safe TX Hash:</span>
                                    <p className="text-sm font-mono text-muted-foreground break-all">
                                      {tx.safeTxHash}
                                    </p>
                                  </div>
                                  {tx.transactionHash && (
                                    <div>
                                      <span className="text-sm font-medium">TX Hash:</span>
                                      <p className="text-sm font-mono text-muted-foreground break-all">
                                        {tx.transactionHash}
                                      </p>
                                    </div>
                                  )}
                                  <div>
                                    <span className="text-sm font-medium">Nonce:</span>
                                    <p className="text-sm text-muted-foreground">{tx.nonce}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium">Operation:</span>
                                    <p className="text-sm text-muted-foreground">
                                      {tx.operation === 0 ? 'Call' : 'DelegateCall'}
                                    </p>
                                  </div>
                                </div>

                                {tx.data && tx.data !== '0x' && (
                                  <div>
                                    <span className="text-sm font-medium">Data:</span>
                                    <pre className="text-xs font-mono bg-background p-2 rounded mt-1 overflow-x-auto">
                                      {tx.data}
                                    </pre>
                                  </div>
                                )}

                                {tx.confirmations && tx.confirmations.length > 0 && (
                                  <div>
                                    <span className="text-sm font-medium">Signatures:</span>
                                    <div className="mt-2 space-y-2">
                                      {tx.confirmations.map((conf: any) => (
                                        <div key={conf.owner} className="flex items-center gap-2 text-sm">
                                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                                          <code className="text-xs">{truncateAddress(conf.owner)}</code>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard(conf.owner)}
                                            className="h-6 w-6 p-0"
                                          >
                                            <Copy className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {!tx.isExecuted && isOwner && (
                                  <div className="pt-2">
                                    <SignTransactionButton 
                                      safeTxHash={tx.safeTxHash}
                                      transaction={tx}
                                      onSuccess={() => {
                                        // Refetch the appropriate query based on current filter
                                        if (filter === 'pending') {
                                          pendingTransactionsQuery.refetch();
                                        } else {
                                          allTransactionsQuery.refetch();
                                        }
                                      }} 
                                    />
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SignTransactionButton({ 
  safeTxHash, 
  onSuccess,
  transaction 
}: { 
  safeTxHash: string; 
  onSuccess: () => void;
  transaction: any;
}) {
  const { confirmTransaction, isPending, isSuccess, error } = useConfirmTransaction();
  const { getSignerAddress } = useSafe();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const signerAddress = getSignerAddress();
  const hasSignerSigned = transaction.confirmations?.some(
    (conf: any) => conf.owner.toLowerCase() === signerAddress?.toLowerCase()
  );

  const handleSign = async () => {
    if (hasSignerSigned) {
      toast.info('You have already signed this transaction');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await confirmTransaction({ safeTxHash });
      console.log('Confirmation result:', result);
      toast.success('Transaction signed successfully');
      onSuccess();
    } catch (error: any) {
      console.error('Sign transaction error:', error);
      const errorMessage = error?.message || error?.reason || 'Failed to sign transaction';
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Show different states
  if (hasSignerSigned) {
    return (
      <Button disabled variant="outline">
        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
        Already Signed
      </Button>
    );
  }

  const isDisabled = isPending || isSuccess || isProcessing;

  return (
    <div className="space-y-2">
      <Button onClick={handleSign} disabled={isDisabled}>
        <PenLine className="mr-2 h-4 w-4" />
        {isProcessing || isPending ? 'Signing...' : isSuccess ? 'Signed' : 'Sign Transaction'}
      </Button>
      {error && (
        <p className="text-sm text-red-500">
          Error: {error.message}
        </p>
      )}
    </div>
  );
}
