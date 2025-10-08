'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, CheckCircle2, Clock, Copy, ExternalLink, Wallet } from 'lucide-react';
import { useSafe } from '@safe-global/safe-react-hooks';
import { toast } from 'sonner';
import { formatEther } from 'ethers';
import Link from 'next/link';

export default function SafeDashboard() {
  const { getSafeInfo, getBalance, getPendingTransactions } = useSafe();
  
  // Use hooks properly - these return TanStack Query objects
  const safeInfoQuery = getSafeInfo();
  const balanceQuery = getBalance();
  const pendingTransactionsQuery = getPendingTransactions();

  // Extract data and loading states
  const safeInfo = safeInfoQuery.data;
  const balance = balanceQuery.data ? formatEther(balanceQuery.data.value) : '0';
  const pendingCount = pendingTransactionsQuery.data?.length || 0;
  const loading = safeInfoQuery.isLoading || balanceQuery.isLoading || pendingTransactionsQuery.isLoading;

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance} ETH</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available balance
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
              <code className="text-sm font-mono">{truncateAddress(safeInfo.address || '')}</code>
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
                      <code className="text-sm font-mono">{truncateAddress(owner)}</code>
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
