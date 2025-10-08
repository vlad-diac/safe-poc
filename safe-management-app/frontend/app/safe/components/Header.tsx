'use client';

import { useState } from 'react';
import { Copy, CheckCircle2, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WalletConnect } from './WalletConnect';
import { useSafe } from '@safe-global/safe-react-hooks';
import { useSession } from '@/app/providers/SafeProvider';
import { toast } from 'sonner';

export function Header() {
  const [copied, setCopied] = useState(false);
  const { getSafeInfo, getChain } = useSafe();
  const { session } = useSession();

  // Get Safe info and chain data
  const safeInfoQuery = getSafeInfo();
  const chain = getChain();
  
  const safeAddress = safeInfoQuery.data?.address;
  const chainName = chain?.name || 'Unknown Network';

  const copyAddress = async () => {
    if (!safeAddress) return;
    
    try {
      await navigator.clipboard.writeText(safeAddress);
      setCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        {session && (
          <Badge variant="default" className="bg-blue-600">
            📍 {session.name}
          </Badge>
        )}
        {safeAddress && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Safe:</span>
              <Badge variant="outline" className="font-mono">
                {truncateAddress(safeAddress)}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyAddress}
                className="h-8 w-8 p-0"
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 w-8 p-0"
              >
                <a
                  href={`https://app.safe.global/home?safe=${chain?.id}:${safeAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <Badge variant="secondary">{chainName}</Badge>
          </>
        )}
      </div>

      <WalletConnect />
    </header>
  );
}
