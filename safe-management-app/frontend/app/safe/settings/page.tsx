'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useSafe } from '@/app/providers/SafeProvider';
import { toast } from 'sonner';
import { 
  Shield, 
  Copy, 
  CheckCircle2,
  AlertCircle,
  Users,
  Info
} from 'lucide-react';

interface SafeInfo {
  address: string;
  owners: string[];
  threshold: number;
  nonce: number;
  version: string;
}

export default function SettingsPage() {
  const { session, isOwner } = useSafe();
  const [safeInfo, setSafeInfo] = useState<SafeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      loadSafeInfo();
    }
  }, [session]);

  const loadSafeInfo = async () => {
    if (!session) return;
    
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(
        `${apiUrl}/api/safe/${session.safeAddress}/info?sessionId=${session.id}`,
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Safe info');
      }
      
      const data = await response.json();
      setSafeInfo(data);
    } catch (error) {
      console.error('Failed to load Safe info:', error);
      toast.error('Failed to load Safe information');
    } finally {
      setLoading(false);
    }
  };

  const owners = safeInfo?.owners || [];
  const threshold = safeInfo?.threshold || 1;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Safe Settings</h1>
        <Card>
          <CardContent className="p-6">
            <p>Loading Safe information...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Safe Settings</h1>
        <p className="text-muted-foreground">View Safe configuration and security settings</p>
      </div>

      {/* Safe Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safe Information
          </CardTitle>
          <CardDescription>
            Your Safe wallet configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Safe Address</span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {session?.safeAddress}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => session?.safeAddress && copyToClipboard(session.safeAddress)}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Network</span>
              <Badge variant="outline">
                {session?.chainId === 11155111 ? 'Sepolia' : 
                 session?.chainId === 1 ? 'Ethereum Mainnet' : 
                 `Chain ID: ${session?.chainId}`}
              </Badge>
            </div>
            
            {safeInfo?.version && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Safe Version</span>
                <Badge variant="secondary">{safeInfo.version}</Badge>
              </div>
            )}
            
            {safeInfo?.nonce !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Transaction Nonce</span>
                <Badge variant="outline">{safeInfo.nonce}</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Threshold Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Signature Threshold
          </CardTitle>
          <CardDescription>
            Number of owner signatures required to execute transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{threshold}</span>
              <span className="text-muted-foreground">of {owners.length}</span>
            </div>
            <Badge variant="secondary">
              {threshold === 1 ? 'Single Signature' : 'Multi-Signature'}
            </Badge>
          </div>

          {threshold === 1 && owners.length === 1 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your Safe has only 1 owner with a single signature threshold. 
                This means transactions can be executed immediately without additional approvals.
              </AlertDescription>
            </Alert>
          )}
          
          {threshold > 1 && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                This Safe requires {threshold} signature(s) to execute transactions, 
                providing enhanced security through multi-signature approval.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Current Owners */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Current Owners ({owners.length})
          </CardTitle>
          <CardDescription>
            Addresses that can sign and execute transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {owners.map((owner: string, index: number) => (
              <div
                key={owner}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <code className="text-sm">{owner}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(owner)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon - Owner Management */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Owner Management Coming Soon</strong>
          <br />
          Features to add/remove owners and update the signature threshold will be available in a future update.
          For now, you can manage owners through the official Safe web interface at app.safe.global.
        </AlertDescription>
      </Alert>
    </div>
  );
}

