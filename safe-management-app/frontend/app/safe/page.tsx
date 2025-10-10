'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, CheckCircle2, Clock, Copy, ExternalLink, Wallet } from 'lucide-react';
import { useSafe } from '@/app/providers/SafeProvider';
import { toast } from 'sonner';
import { formatEther } from 'ethers';
import Link from 'next/link';
import * as safeService from '@/lib/services/safeService';
import * as transactionService from '@/lib/services/transactionService';

interface TokenValue {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  address?: string;
}

export default function SafeDashboard() {
  const { safeClient, session } = useSafe();
  
  const [safeInfo, setSafeInfo] = useState<safeService.SafeInfo | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [fiatBalance, setFiatBalance] = useState<string | null>(null);
  const [fiatCode, setFiatCode] = useState<string>('USD');
  const [tokens, setTokens] = useState<TokenValue[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Fetch Safe data using services
  useEffect(() => {
    const fetchData = async () => {
      if (!safeClient) {
        console.log('[Dashboard] No safeClient available');
        setLoading(false);
        return;
      }

      try {
        console.log('[Dashboard] Starting to fetch Safe data...');
        setLoading(true);
        
        // Get Safe info using service
        console.log('[Dashboard] Fetching Safe info...');
        const info = await safeService.getSafeInfo(safeClient);
        console.log('[Dashboard] Safe info received:', info);
        setSafeInfo(info);
        
        // Get total asset value (all tokens combined)
        console.log('[Dashboard] Fetching total asset value...');
        const assetValue = await safeService.getTotalAssetValue(safeClient);
        console.log('[Dashboard] Total asset value:', assetValue);
        
        // Find ETH balance from tokens
        const ethToken = assetValue.tokens.find(t => t.symbol === 'ETH');
        setBalance(ethToken?.balance.toFixed(4) || '0.0000');
        setFiatBalance(assetValue.totalUsd);
        setFiatCode('USD');
        setTokens(assetValue.tokens);
        
        // Get pending transactions using service
        console.log('[Dashboard] Fetching pending transactions...');
        const pending = await transactionService.getPendingTransactions(safeClient);
        console.log('[Dashboard] Pending transactions received:', pending.length, 'transactions');
        setPendingCount(pending.length);
        
        console.log('[Dashboard] ===== COMPLETE SAFE DATA =====');
        console.log('[Dashboard] Address:', info.address);
        console.log('[Dashboard] ETH Balance:', ethToken?.balance.toFixed(4) || '0', 'ETH');
        console.log('[Dashboard] Total Asset Value:', '$' + assetValue.totalUsd, 'USD');
        console.log('[Dashboard] Number of tokens:', assetValue.tokens.length);
        assetValue.tokens.forEach(token => {
          console.log(`[Dashboard]   - ${token.symbol}: ${token.balance} = $${token.usdValue.toFixed(2)}`);
        });
        console.log('[Dashboard] Owners:', info.owners);
        console.log('[Dashboard] Threshold:', info.threshold, 'of', info.owners.length);
        console.log('[Dashboard] Nonce:', info.nonce);
        console.log('[Dashboard] Pending transactions:', pending.length);
        console.log('[Dashboard] ================================');
        
      } catch (error) {
        console.error('[Dashboard] Failed to fetch Safe data:', error);
        toast.error('Failed to load Safe data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [safeClient]);

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!safeInfo) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Safe Information</CardTitle>
            <CardDescription>
              Unable to load Safe information. Please check your configuration.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Safe account</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {fiatBalance && (
              <div className="text-2xl font-bold">
                ${parseFloat(fiatBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              {tokens.length} {tokens.length === 1 ? 'asset' : 'assets'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Total value in USD
            </p>
          </CardContent>
        </Card>

        {/* Threshold Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Threshold</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {safeInfo.threshold} of {safeInfo.owners?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Signatures required
            </p>
          </CardContent>
        </Card>

        {/* Pending Transactions Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting signatures
            </p>
            {pendingCount > 0 && (
              <Button variant="link" size="sm" className="p-0 h-auto mt-2" asChild>
                <Link href="/safe/transactions?filter=pending">
                  View pending →
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Safe Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Safe Information</CardTitle>
              <CardDescription>Configuration and deployment status</CardDescription>
            </div>
            <Badge variant="secondary">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Deployed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address</span>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono">{transactionService.truncateAddress(safeInfo.address || '')}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyAddress(safeInfo.address || '')}
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
                  href={`https://etherscan.io/address/${safeInfo.address || ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Nonce</span>
            <span className="text-sm font-medium">{safeInfo.nonce || 0}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Version</span>
            <Badge variant="outline">{(safeInfo as any).version || 'Unknown'}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Token Balances Card */}
      {tokens.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Assets ({tokens.length})</CardTitle>
            <CardDescription>Token balances and values</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Value (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map((token, index) => (
                  <TableRow key={token.address || token.symbol}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {token.symbol.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{token.symbol}</div>
                          <div className="text-xs text-muted-foreground">{token.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {token.balance.toLocaleString('en-US', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4 
                      })}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${token.usdValue.toLocaleString('en-US', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2 
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Owners Card */}
      <Card>
        <CardHeader>
          <CardTitle>Owners ({safeInfo.owners?.length || 0})</CardTitle>
          <CardDescription>Addresses that can sign transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeInfo.owners?.map((owner: string, index: number) => (
                <TableRow key={owner}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {owner.slice(2, 4).toUpperCase()}
                      </div>
                      <code className="text-sm font-mono">{transactionService.truncateAddress(owner)}</code>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyAddress(owner)}
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
                          href={`https://etherscan.io/address/${owner}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {pendingCount > 0 && (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <CardTitle>Action Required</CardTitle>
            </div>
            <CardDescription>
              You have {pendingCount} pending transaction{pendingCount !== 1 ? 's' : ''} awaiting signatures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/safe/transactions?filter=pending">
                Review Pending Transactions
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
