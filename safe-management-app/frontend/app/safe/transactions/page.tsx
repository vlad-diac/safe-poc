'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Copy, 
  ExternalLink, 
  Search,
  PenLine,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  Upload,
  FileText,
  Download
} from 'lucide-react';
import { useSafe } from '@/app/providers/SafeProvider';
import { toast } from 'sonner';
import { formatEther } from 'ethers';
import { useSearchParams } from 'next/navigation';
import * as transactionService from '@/lib/services/transactionService';
import { parseTransactionData, getTransactionSummary, truncateAddress as truncateAddr } from '@/lib/utils/transactionUtils';

export default function TasksPage() {
  const { safeClient, isOwner: isOwnerConnected, session } = useSafe();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'todo');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Sync tasks from Safe Transaction Service to database
  const syncTasks = async () => {
    if (!session?.id) return;

    try {
      setRefreshing(true);
      toast.info('Syncing tasks from Safe Transaction Service...');
      
      await transactionService.syncTransactions(session.id);
      
      // Fetch updated tasks
      await fetchTasks();
      
      toast.success('Tasks synced successfully');
    } catch (error) {
      console.error('Failed to sync tasks:', error);
      toast.error('Failed to sync tasks');
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch tasks from database
  const fetchTasks = async () => {
    if (!session?.id) return;

    try {
      setRefreshing(true);
      
      // Fetch all tasks from database
      const all = await transactionService.getAllTransactions(session.id, {
        limit: 100,
      });
      
      setAllTasks(all);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  // Load tasks on mount
  useEffect(() => {
    if (session?.id) {
      fetchTasks();
    }
  }, [session?.id]);

  // Determine which data to use based on filter
  const getCurrentTasks = () => {
    if (filter === 'todo') {
      // A task is "to do" if it's not executed and has a confirmations field
      return allTasks.filter((tx: any) => {
        return tx.confirmations !== undefined && !tx.isExecuted;
      });
    } else if (filter === 'completed') {
      return allTasks.filter((tx: any) => tx.isExecuted === true);
    } else if (filter === 'all') {
      return allTasks;
    }
    return allTasks;
  };

  const tasks = getCurrentTasks();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };


  const getTaskStatus = (tx: any) => {
    if (tx.isExecuted) {
      return { label: 'Completed', variant: 'default', className: 'bg-green-500', icon: CheckCircle2 };
    }
    
    if (tx.confirmations?.length >= tx.confirmationsRequired) {
      return { label: 'Ready to Execute', variant: 'default', className: 'bg-blue-500', icon: AlertCircle };
    }
    
    return { label: 'To do', variant: 'secondary', className: 'bg-orange-100 text-orange-800', icon: Clock };
  };

  const hasInvoice = (tx: any) => {
    // Logic to determine if task has an invoice
    // For now, return false - can be extended with actual invoice tracking
    return false;
  };

  const filteredTasks = tasks.filter((tx: any) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const txData = parseTransactionData(tx);
    return (
      tx.to?.toLowerCase().includes(query) ||
      tx.safeTxHash?.toLowerCase().includes(query) ||
      tx.transactionHash?.toLowerCase().includes(query) ||
      txData.name.toLowerCase().includes(query)
    );
  });

  // Calculate total amount in USDS (or primary token)
  const calculateTotal = () => {
    const total = filteredTasks.reduce((sum, tx) => {
      const txData = parseTransactionData(tx);
      if (txData.items.length > 0) {
        const usdAmount = txData.items.reduce((itemSum, item) => {
          // Assuming USDC/USDT/DAI can be treated as USDS equivalent
          if (['USDC', 'USDT', 'DAI', 'USDS'].includes(item.token)) {
            return itemSum + parseFloat(item.amount);
          }
          return itemSum;
        }, 0);
        return sum + usdAmount;
      }
      return sum;
    }, 0);
    return total.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  // Count unique vendors
  const getVendorCount = () => {
    const uniqueVendors = new Set(filteredTasks.map(tx => tx.to.toLowerCase()));
    return uniqueVendors.size;
  };

  // Generate color for avatar based on address
  const getAvatarColor = (address: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-teal-500',
      'bg-cyan-500',
      'bg-indigo-500',
    ];
    const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

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
      {/* Header with Safe Info */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500">
                <AvatarFallback className="bg-transparent text-white text-sm font-bold">
                  SA
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">Safe Account</h2>
                <code className="text-xs text-muted-foreground">{truncateAddr(session?.safeAddress || '')}</code>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-2xl font-bold">{calculateTotal()}</div>
                <div className="text-xs text-muted-foreground">TOTAL USDS</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{getVendorCount()}</div>
                <div className="text-xs text-muted-foreground">Vendors</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={filter === 'todo' ? 'default' : 'outline'}
            onClick={() => setFilter('todo')}
          >
            To Do
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTasks}
            disabled={refreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={syncTasks}
            disabled={refreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Sync from Safe
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="default"
            size="sm"
          >
            <PenLine className="mr-2 h-4 w-4" />
            Add batch payment link
          </Button>
        </div>
      </div>

      {/* Manual sync info */}
      {filter === 'todo' && tasks.length > 0 && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Click "Sync from Safe" to fetch the latest tasks and signatures from the Safe Transaction Service.
            {' '}Use "Refresh" to reload from the local database.
          </AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by vendor name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Task Cards */}
      <Card>
        <CardContent className="p-0">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Create your first payment task to get started'}
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredTasks.map((tx: any) => {
                const txData = parseTransactionData(tx);
                const status = getTaskStatus(tx);
                const isExpanded = expandedTask === tx.safeTxHash;
                const StatusIcon = status.icon;
                
                return (
                  <div key={tx.safeTxHash} className="hover:bg-muted/30 transition-colors">
                    {/* Task Card */}
                    <div className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Vendor Info */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <Avatar className={`h-12 w-12 ${getAvatarColor(tx.to)}`}>
                            <AvatarFallback className="bg-transparent text-white font-bold">
                              {txData.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate">{txData.name}</h3>
                            {txData.type === 'batch' && txData.items.length > 0 ? (
                              <span className="text-sm text-muted-foreground">
                                {txData.items.length} recipient{txData.items.length !== 1 ? 's' : ''}
                              </span>
                            ) : (
                              <code className="text-sm text-muted-foreground">{truncateAddr(tx.to)}</code>
                            )}
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="text-right min-w-[140px]">
                          <div className="text-xl font-semibold">{getTransactionSummary(tx)}</div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center gap-3 min-w-[300px] justify-end">
                          <Badge variant={status.variant as any} className={status.className}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {status.label}
                          </Badge>
                          
                          {!hasInvoice(tx) && !tx.isExecuted && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                              <FileText className="mr-1 h-3 w-3" />
                              No invoice
                            </Badge>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedTask(isExpanded ? null : tx.safeTxHash)}
                            className="h-9 w-9 p-0"
                          >
                            <PenLine className="h-4 w-4" />
                          </Button>

                          {hasInvoice(tx) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0"
                            >
                              <Upload className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Batch Transaction Items - Show in main card */}
                      {txData.type === 'batch' && txData.items.length > 0 && (
                        <div className="mt-4 ml-16 space-y-2">
                          {txData.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Badge variant="outline" className="font-mono text-xs h-6 w-6 flex items-center justify-center p-0">
                                  {idx + 1}
                                </Badge>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">To:</span>
                                  <code className="text-xs font-medium">{truncateAddr(item.to)}</code>
                                </div>
                              </div>
                              <div className="font-mono font-semibold">
                                {item.amount} {item.token}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Additional Info Row */}
                      <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground ml-16">
                        <div className="flex items-center gap-2">
                          <span>Nonce: {tx.nonce}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Confirmations: {tx.confirmations?.length || 0}/{tx.confirmationsRequired || 0}</span>
                        </div>
                        {tx.submissionDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(tx.submissionDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(tx.safeTxHash)}
                            className="h-7 px-2 text-xs"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy Hash
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-7 px-2 text-xs"
                          >
                            <a
                              href={`https://app.safe.global/transactions/tx?safe=eth:${tx.safe}&id=multisig_${tx.safe}_${tx.safeTxHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View in Safe
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 bg-muted/20 border-t">
                        <div className="space-y-4">
                          {/* Task Items - Only show for non-batch or when items are not already displayed */}
                          {txData.items.length > 0 && txData.type !== 'batch' && (
                            <div>
                              <span className="text-sm font-medium mb-2 block">Payment Details:</span>
                              <div className="space-y-2">
                                {txData.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between bg-background p-3 rounded border">
                                    <div className="flex items-center gap-3">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm text-muted-foreground">To:</span>
                                          <code className="text-xs">{truncateAddr(item.to)}</code>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard(item.to)}
                                            className="h-6 w-6 p-0"
                                          >
                                            <Copy className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="font-mono font-medium">
                                      {item.amount} {item.token}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm font-medium">Safe TX Hash:</span>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm font-mono text-muted-foreground break-all">
                                  {truncateAddr(tx.safeTxHash)}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(tx.safeTxHash)}
                                  className="h-6 w-6 p-0 flex-shrink-0"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="h-6 w-6 p-0 flex-shrink-0"
                                >
                                  <a
                                    href={`https://app.safe.global/transactions/tx?safe=eth:${tx.safe}&id=multisig_${tx.safe}_${tx.safeTxHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Confirmations:</span>
                              <p className="text-sm text-muted-foreground mt-1">
                                {tx.confirmations?.length || 0} / {tx.confirmationsRequired || 0} signatures
                              </p>
                            </div>
                          </div>

                          {tx.confirmations && tx.confirmations.length > 0 && (
                            <div>
                              <span className="text-sm font-medium">Signatures:</span>
                              <div className="mt-2 space-y-2">
                                {tx.confirmations.map((conf: any) => (
                                  <div key={conf.owner} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <code className="text-xs">{truncateAddr(conf.owner)}</code>
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
                              <SignTaskButton 
                                safeTxHash={tx.safeTxHash}
                                task={tx}
                                onSuccess={() => {
                                  fetchTasks();
                                }} 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SignTaskButton({ 
  safeTxHash, 
  onSuccess,
  task 
}: { 
  safeTxHash: string; 
  onSuccess: () => void;
  task: any;
}) {
  const { safeClient, connectedWallet } = useSafe();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const hasSignerSigned = task.confirmations?.some(
    (conf: any) => conf.owner.toLowerCase() === connectedWallet?.toLowerCase()
  );

  const handleSign = async () => {
    if (!safeClient) {
      toast.error('Safe client not initialized');
      return;
    }

    if (hasSignerSigned) {
      toast.info('You have already signed this task');
      return;
    }

    setIsProcessing(true);
    try {
      // Use transaction service to confirm
      const result = await transactionService.confirmTransaction(safeClient, safeTxHash);
      console.log('Confirmation result:', result);
      toast.success('Task signed successfully');
      onSuccess();
    } catch (error: any) {
      console.error('Sign task error:', error);
      const errorMessage = error?.message || error?.reason || 'Failed to sign task';
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
      {isProcessing ? 'Signing...' : 'Sign Task'}
    </Button>
  );
}
