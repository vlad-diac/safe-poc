'use client';

import React, { useEffect, useState } from 'react';
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
import { useSafe } from '@/app/providers/SafeProvider';
import { toast } from 'sonner';
import { formatEther } from 'ethers';
import { useSearchParams } from 'next/navigation';
import * as transactionService from '@/lib/services/transactionService';

export default function TransactionsPage() {
  const { safeClient, isOwner: isOwnerConnected, session } = useSafe();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all');
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Sync transactions from Safe Transaction Service to database
  const syncTransactions = async () => {
    if (!session?.id) return;

    try {
      setRefreshing(true);
      toast.info('Syncing transactions from Safe Transaction Service...');
      
      await transactionService.syncTransactions(session.id);
      
      // Fetch updated transactions
      await fetchTransactions();
      
      toast.success('Transactions synced successfully');
    } catch (error) {
      console.error('Failed to sync transactions:', error);
      toast.error('Failed to sync transactions');
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch transactions from database
  const fetchTransactions = async () => {
    if (!session?.id) return;

    try {
      setRefreshing(true);
      
      // Fetch all transactions from database
      const all = await transactionService.getAllTransactions(session.id, {
        limit: 100,
      });
      
      setAllTransactions(all);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Failed to load transactions');
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  // Load transactions on mount
  useEffect(() => {
    if (session?.id) {
      fetchTransactions();
    }
  }, [session?.id]);

  // Determine which data to use based on filter
  const getCurrentTransactions = () => {
    if (filter === 'pending') {
      // A transaction is pending if it's not executed and has a confirmations field
      // This matches the logic in getStatusBadge
      return allTransactions.filter((tx: any) => {
        // Must have confirmations field (indicating it's a multisig transaction)
        // and must not be executed
        return tx.confirmations !== undefined && !tx.isExecuted;
      });
    } else if (filter === 'all') {
      return allTransactions;
    } else if (filter === 'executed') {
      return allTransactions.filter((tx: any) => tx.isExecuted === true);
    } else if (filter === 'failed') {
      return allTransactions.filter((tx: any) => 
        tx.isExecuted === false && tx.confirmations?.length > 0
      );
    }
    return allTransactions;
  };

  const transactions = getCurrentTransactions();

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
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTransactions}
            disabled={refreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={syncTransactions}
            disabled={refreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Sync from Safe
          </Button>
        </div>
      </div>

      {/* Manual sync info for pending transactions */}
      {filter === 'pending' && transactions.length > 0 && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Click "Sync from Safe" to fetch the latest transactions and signatures from the Safe Transaction Service.
            {' '}Use "Refresh" to reload from the local database.
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
                      <React.Fragment key={tx.safeTxHash}>
                        <TableRow className="cursor-pointer hover:bg-muted/50">
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

                                {!tx.isExecuted && isOwnerConnected && (
                                  <div className="pt-2">
                                    <SignTransactionButton 
                                      safeTxHash={tx.safeTxHash}
                                      transaction={tx}
                                      onSuccess={() => {
                                        // Refetch transactions after signing
                                        fetchTransactions();
                                      }} 
                                    />
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
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
  const { safeClient, connectedWallet } = useSafe();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const hasSignerSigned = transaction.confirmations?.some(
    (conf: any) => conf.owner.toLowerCase() === connectedWallet?.toLowerCase()
  );

  const handleSign = async () => {
    if (!safeClient) {
      toast.error('Safe client not initialized');
      return;
    }

    if (hasSignerSigned) {
      toast.info('You have already signed this transaction');
      return;
    }

    setIsProcessing(true);
    try {
      // Use transaction service to confirm
      const result = await transactionService.confirmTransaction(safeClient, safeTxHash);
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

  return (
    <Button onClick={handleSign} disabled={isProcessing}>
      <PenLine className="mr-2 h-4 w-4" />
      {isProcessing ? 'Signing...' : 'Sign Transaction'}
    </Button>
  );
}
