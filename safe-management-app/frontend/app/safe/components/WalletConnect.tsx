'use client';

import { useState, useEffect } from 'react';
import { Wallet, Copy, LogOut, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useSafe } from '@safe-global/safe-react-hooks';

// Declare window.ethereum for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function WalletConnect() {
  const { 
    connect, 
    disconnect, 
    isSignerConnected, 
    isOwnerConnected,
    getChain 
  } = useSafe();
  
  // Track the address in state instead of calling getSignerAddress() which uses hooks internally
  const [address, setAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [networkMismatch, setNetworkMismatch] = useState(false);
  const [walletChainId, setWalletChainId] = useState<number | null>(null);
  
  const chain = getChain();
  const expectedChainId = chain?.id;

  useEffect(() => {
    if (isSignerConnected && address) {
      checkNetworkMatch();
    } else if (!isSignerConnected) {
      setAddress(null);
      setNetworkMismatch(false);
    }
  }, [isSignerConnected, address]);

  const checkNetworkMatch = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const currentChainId = parseInt(chainId, 16);
        setWalletChainId(currentChainId);
        
        if (expectedChainId && currentChainId !== expectedChainId) {
          setNetworkMismatch(true);
          toast.error(`Network mismatch! Please switch to ${chain?.name || 'the correct network'}`);
        } else {
          setNetworkMismatch(false);
        }
      } catch (error) {
        console.error('Failed to check network:', error);
      }
    }
  };

  useEffect(() => {
    // Listen for network changes
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleChainChanged = () => {
        checkNetworkMatch();
        // Reload page on network change to ensure proper state
        window.location.reload();
      };
      
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [expectedChainId]);

  const handleConnect = async () => {
    try {
      // Get wallet address from MetaMask first
      if (typeof window !== 'undefined' && window.ethereum) {
        const { BrowserProvider } = await import('ethers');
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        
        if (accounts.length > 0) {
          // Check network before connecting
          await checkNetworkMatch();
          
          // connect() requires a signer address parameter
          connect(accounts[0]);
          // Set the address in state
          setAddress(accounts[0]);
          toast.success('Wallet connected successfully');
          
          // Check if user is an owner
          setTimeout(() => {
            if (!isOwnerConnected) {
              toast.warning('Connected wallet is not a Safe owner. You can view but not sign transactions.');
            }
          }, 500);
        }
      } else {
        toast.error('Please install MetaMask to continue');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setAddress(null);
      setNetworkMismatch(false);
      toast.success('Wallet disconnected');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to disconnect wallet');
    }
  };

  const copyAddress = async () => {
    if (!address) return;
    
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!address) {
    return (
      <Button onClick={handleConnect} variant="default">
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {networkMismatch && (
        <Alert variant="destructive" className="py-2 px-3">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Wrong network
          </AlertDescription>
        </Alert>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {address.slice(2, 4).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-mono text-sm">{truncateAddress(address)}</span>
            {isOwnerConnected && (
              <Shield className="h-4 w-4 text-green-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Connected Wallet</span>
              <code className="text-xs font-mono">{truncateAddress(address)}</code>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="px-2 py-2">
            {isOwnerConnected ? (
              <Badge variant="default" className="w-full justify-center bg-green-500">
                <Shield className="mr-1 h-3 w-3" />
                Safe Owner
              </Badge>
            ) : (
              <Badge variant="secondary" className="w-full justify-center">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Not an Owner
              </Badge>
            )}
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={copyAddress}>
            {copied ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            Copy Address
          </DropdownMenuItem>
          
          {networkMismatch && (
            <DropdownMenuItem 
              onClick={() => {
                if (window.ethereum && expectedChainId) {
                  const chainIdHex = `0x${expectedChainId.toString(16)}`;
                  window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainIdHex }],
                  }).catch((error: any) => {
                    toast.error('Failed to switch network');
                  });
                }
              }}
            >
              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
              Switch to {chain?.name}
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
