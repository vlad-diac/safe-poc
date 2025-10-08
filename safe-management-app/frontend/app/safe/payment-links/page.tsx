'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link2, Plus, Copy, ExternalLink, Trash2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatEther } from 'ethers';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface PaymentLink {
  id: string;
  toAddress: string;
  value: string;
  description: string;
  status: string;
  createdAt: string;
  expiresAt: string | null;
  safeTxHash: string | null;
}

export default function PaymentLinksPage() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    if (sessionId) {
      loadPaymentLinks();
    }
  }, [sessionId]);

  const loadSession = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/sessions/default`);
      if (response.ok) {
        const session = await response.json();
        setSessionId(session.id);
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    }
  };

  const loadPaymentLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/payment-links/session/${sessionId}`);
      
      if (!response.ok) {
        throw new Error('Failed to load payment links');
      }
      
      const data = await response.json();
      setLinks(data);
    } catch (error: any) {
      console.error('Failed to load payment links:', error);
      toast.error('Failed to load payment links');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async (linkId: string) => {
    const url = `${window.location.origin}/safe/pay/${linkId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Payment link copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const deleteLink = async (linkId: string) => {
    if (!confirm('Are you sure you want to delete this payment link?')) return;

    try {
      const response = await fetch(`${apiUrl}/api/payment-links/${linkId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete payment link');
      }

      toast.success('Payment link deleted');
      loadPaymentLinks();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete payment link');
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
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
            <Skeleton className="h-32 w-full" />
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
          <h1 className="text-3xl font-bold">Payment Links</h1>
          <p className="text-muted-foreground">Create and manage shareable payment links</p>
        </div>
        <Button asChild>
          <Link href="/safe/payment-links/create">
            <Plus className="mr-2 h-4 w-4" />
            Generate Link
          </Link>
        </Button>
      </div>

      {/* Payment Links Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Payment Links</CardTitle>
          <CardDescription>
            {links.length} payment link{links.length !== 1 ? 's' : ''} created
          </CardDescription>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <div className="text-center py-12">
              <Link2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No payment links yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first payment link to accept payments
              </p>
              <Button asChild>
                <Link href="/safe/payment-links/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Payment Link
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>To Address</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">
                      {link.description || 'No description'}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs">{truncateAddress(link.toAddress)}</code>
                    </TableCell>
                    <TableCell>
                      {formatEther(link.value)} ETH
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(link.status)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDistanceToNow(new Date(link.createdAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyLink(link.id)}
                          className="h-8 w-8 p-0"
                          title="Copy payment link"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0"
                          title="View payment page"
                        >
                          <Link href={`/safe/pay/${link.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteLink(link.id)}
                          className="h-8 w-8 p-0 text-destructive"
                          title="Delete payment link"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
