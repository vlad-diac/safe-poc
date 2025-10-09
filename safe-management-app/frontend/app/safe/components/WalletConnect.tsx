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
import { useSession } from '@/app/providers/SafeProvider';

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
  
  const { 
    session, 
    connectedWallet, 
    isConnecting, 
    connectWallet, 
    disconnectWallet 
  } = useSession();
  
  // Local state for UI
  const [copied, setCopied] = useState(false);
  const [networkMismatch, setNetworkMismatch] = useState(false);
  const [walletChainId, setWalletChainId] = useState<number | null>(null);
  const [autoReconnectChecked, setAutoReconnectChecked] = useState(false);
  
  const chain = getChain();
  const expectedChainId = chain?.id;

  // Sync checkbox with session state
  useEffect(() => {
    if (session) {
      setAutoReconnectChecked(session.autoReconnect);
    }
  }, [session?.autoReconnect]);

  useEffect(() => {
    if (isSignerConnected && connectedWallet) {
      checkNetworkMatch();
      
      // Check if connected wallet is an owner after connection
      const timer = setTimeout(() => {
        if (isSignerConnected && !isOwnerConnected && connectedWallet) {
          console.log('⚠️ Connected wallet is not a Safe owner - disconnecting');
          handleDisconnect();
          toast.error('Only Safe owners can use this application');
        }
      }, 2000); // Wait 2 seconds for ownership verification
      
      return () => clearTimeout(timer);
    } else if (!isSignerConnected && connectedWallet) {
      // If we have a connectedWallet in session but SDK isn't connected,
      // and auto-reconnect failed/didn't happen, clear the session wallet
      // to keep UI in sync
      const timer = setTimeout(() => {
        if (!isSignerConnected && connectedWallet) {
          console.log('⚠️ Clearing stale wallet - not connected to Safe SDK');
          disconnectWallet().catch(console.error);
        }
      }, 2000); // Wait 2 seconds to allow auto-connect to complete
      
      return () => clearTimeout(timer);
    } else if (!isSignerConnected) {
      setNetworkMismatch(false);
    }
  }, [isSignerConnected, isOwnerConnected, connectedWallet]);

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

  // Auto-connect on mount if wallet was previously connected to this session
  useEffect(() => {
    const autoConnect = async () => {
      // Only auto-connect if:
      // 1. Auto-reconnect is enabled for this session
      // 2. Session has a connectedWallet saved
      // 3. Browser has window.ethereum
      // 4. Not already connected to Safe SDK
      if (!session?.autoReconnect || !connectedWallet || !window.ethereum || isSignerConnected) {
        return;
      }

      try {
        console.log('🔄 Auto-reconnect enabled - attempting to connect wallet:', connectedWallet);
        
        const { BrowserProvider } = await import('ethers');
        const provider = new BrowserProvider(window.ethereum);
        
        // Try to get accounts without prompting (only works if already connected to MetaMask)
        const accounts = await provider.send('eth_accounts', []);
        
        // Check if the saved wallet is in the available accounts
        const savedWallet = connectedWallet.toLowerCase();
        const matchingAccount = accounts.find((acc: string) => acc.toLowerCase() === savedWallet);
        
        if (matchingAccount) {
          console.log('✅ Auto-connecting wallet to Safe SDK:', matchingAccount);
          await connect(matchingAccount); // Connect to Safe SDK - must await!
          await checkNetworkMatch();
          toast.success('Wallet reconnected automatically');
        } else if (accounts.length > 0) {
          // Saved wallet not available, but other wallets are connected
          console.log('⚠️ Saved wallet not available, but found other accounts');
          // Don't auto-connect a different wallet - let user choose
        } else {
          // No wallets connected to MetaMask
          console.log('ℹ️ No wallets connected to browser extension');
        }
      } catch (error) {
        console.error('Auto-connect failed:', error);
      }
    };
    
    autoConnect();
  }, [session?.autoReconnect, connectedWallet, isSignerConnected]); // Run when autoReconnect, connectedWallet, or signer connection status changes

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
          
          // Connect to Safe SDK (must await for ownership verification)
          await connect(accounts[0]);
          
          // Save wallet address and auto-reconnect preference to session
          await connectWallet(accounts[0], autoReconnectChecked);
          
          toast.success('Wallet connected successfully');
          
          // Give SDK a moment to verify ownership, then check
          setTimeout(() => {
            if (!isOwnerConnected) {
              toast.warning('Connected wallet is not a Safe owner. You can view but not sign transactions.');
            } else {
              console.log('✅ Verified: Connected wallet is a Safe owner');
            }
          }, 1000); // Increased timeout to 1 second
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
      // Disconnect from Safe SDK
      await disconnect();
      
      // Clear wallet address from session (global state)
      await disconnectWallet();
      
      setNetworkMismatch(false);
      toast.success('Wallet disconnected');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to disconnect wallet');
    }
  };

  const copyAddress = async () => {
    if (!connectedWallet) return;
    
    try {
      await navigator.clipboard.writeText(connectedWallet);
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

  // Show loading state during connection
  if (isConnecting) {
    return (
      <Button variant="default" disabled>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
        Connecting...
      </Button>
    );
  }

  // Show connect button with auto-reconnect checkbox if no wallet connected
  if (!connectedWallet) {
    return (
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={autoReconnectChecked}
            onChange={(e) => setAutoReconnectChecked(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
          />
          <span className="select-none">Auto-reconnect</span>
        </label>
        <Button onClick={handleConnect} variant="default">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
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
                {connectedWallet.slice(2, 4).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-mono text-sm">{truncateAddress(connectedWallet)}</span>
            {isOwnerConnected && (
              <Shield className="h-4 w-4 text-green-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Connected Wallet</span>
              <code className="text-xs font-mono">{truncateAddress(connectedWallet)}</code>
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
          
          <div className="px-2 py-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={autoReconnectChecked}
                onChange={async (e) => {
                  const newValue = e.target.checked;
                  setAutoReconnectChecked(newValue);
                  try {
                    // Update the preference immediately
                    await connectWallet(connectedWallet, newValue);
                    toast.success(`Auto-reconnect ${newValue ? 'enabled' : 'disabled'}`);
                  } catch (error) {
                    toast.error('Failed to update auto-reconnect preference');
                    // Revert on error
                    setAutoReconnectChecked(!newValue);
                  }
                }}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="select-none">Auto-reconnect on page load</span>
            </label>
          </div>
          
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
