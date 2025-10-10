'use client';

import { createSafeClient, SafeClient } from '@safe-global/sdk-starter-kit';
import { ReactNode, useEffect, useState, createContext, useContext, useCallback } from 'react';
import { toast } from 'sonner';
import { mainnet, sepolia, goerli, polygon, optimism, arbitrum, Chain } from 'viem/chains';

// Declare window.ethereum for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface SafeSession {
  id: string;
  name: string;
  safeAddress: string;
  apiKey: string;
  chainId: number;
  rpcUrl: string;
  transactionServiceUrl: string;
  isDefault: boolean;
  connectedWallet: string | null;
  autoReconnect: boolean;
}

interface SafeProviderWrapperProps {
  children: ReactNode;
  sessionId?: string;
}

interface SafeContextType {
  safeClient: SafeClient | null;
  session: SafeSession | null;
  connectedWallet: string | null;
  isConnecting: boolean;
  isOwner: boolean;
  connect: (address: string) => Promise<void>;
  disconnect: () => Promise<void>;
  switchSession: (sessionId: string) => Promise<void>;
  refreshSession: () => Promise<void>;
  connectWallet: (walletAddress: string, autoReconnect?: boolean) => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

// Chain mapping for viem chains
const CHAIN_MAP: Record<number, Chain> = {
  1: mainnet,
  11155111: sepolia,
  5: goerli,
  137: polygon,
  10: optimism,
  42161: arbitrum,
};

// Create Safe Context
const SafeContext = createContext<SafeContextType | null>(null);

export function useSafe() {
  const context = useContext(SafeContext);
  if (!context) {
    throw new Error('useSafe must be used within SafeProviderWrapper');
  }
  return context;
}

// Keep useSession for backward compatibility
export function useSession() {
  const context = useContext(SafeContext);
  if (!context) {
    throw new Error('useSession must be used within SafeProviderWrapper');
  }
  return context;
}

export function SafeProviderWrapper({ children, sessionId: initialSessionId }: SafeProviderWrapperProps) {
  const [session, setSession] = useState<SafeSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [safeClient, setSafeClient] = useState<SafeClient | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>(initialSessionId);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const fetchSession = async (sessionIdToFetch?: string) => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Check localStorage for saved session ID if none provided
      let sessionToLoad = sessionIdToFetch;
      if (!sessionToLoad && typeof window !== 'undefined') {
        const savedSessionId = localStorage.getItem('safe_active_session_id');
        if (savedSessionId) {
          console.log('📦 Loading saved session from localStorage:', savedSessionId);
          sessionToLoad = savedSessionId;
        }
      }
      
      const endpoint = sessionToLoad 
        ? `${apiUrl}/api/sessions/${sessionToLoad}`
        : `${apiUrl}/api/sessions/default`;
      
      console.log('🔍 Fetching session from:', endpoint);
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        // If the saved session doesn't exist, try loading the default
        if (sessionToLoad && typeof window !== 'undefined') {
          console.warn('⚠️ Saved session not found, falling back to default');
          localStorage.removeItem('safe_active_session_id');
          return await fetchSession(); // Retry without session ID (will load default)
        }
        throw new Error('Failed to fetch session');
      }
      
      const data = await response.json();
      setSession(data);
      
      // Set connected wallet from session
      setConnectedWallet(data.connectedWallet || null);
      
      // Save the loaded session ID to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('safe_active_session_id', data.id);
        console.log('💾 Saved session to localStorage:', data.id, data.name);
      }

      // Check if wallet is available
      const hasWallet = typeof window !== 'undefined' && window.ethereum;
      
      console.log('🔧 SDK Starter Kit Configuration:', {
        providerType: hasWallet ? 'window.ethereum (for signing)' : 'RPC URL (read-only)',
        rpcUrl: data.rpcUrl,
        hasWindowEthereum: hasWallet,
        safeAddress: data.safeAddress,
        chainId: data.chainId,
      });
      
      // Initialize SafeClient with window.ethereum if available, otherwise RPC URL
      // When window.ethereum is available, signing will work properly
      console.log('[SafeProvider] Creating SafeClient with config:', {
        provider: hasWallet ? 'window.ethereum' : data.rpcUrl,
        signer: data.connectedWallet || 'undefined',
        safeAddress: data.safeAddress,
        apiKey: data.apiKey ? 'provided' : 'not provided',
        chainId: data.chainId,
      });
      
      const client = await createSafeClient({
        provider: hasWallet ? window.ethereum : data.rpcUrl,
        signer: data.connectedWallet || undefined, // Use saved wallet if auto-reconnecting
        safeAddress: data.safeAddress,
        apiKey: data.apiKey, // Required for Safe Transaction Service
      });
      
      setSafeClient(client);
      
      // Log SafeClient details
      try {
        const [address, owners, threshold, nonce] = await Promise.all([
          client.getAddress(),
          client.getOwners(),
          client.getThreshold(),
          client.getNonce(),
        ]);
        
        console.log('[SafeProvider] ===== SAFE CLIENT INITIALIZED =====');
        console.log('[SafeProvider] Safe Address:', address);
        console.log('[SafeProvider] Owners:', owners);
        console.log('[SafeProvider] Threshold:', threshold);
        console.log('[SafeProvider] Nonce:', nonce);
        console.log('[SafeProvider] Provider type:', hasWallet ? 'window.ethereum' : 'RPC URL');
        console.log('[SafeProvider] Connected Wallet:', data.connectedWallet || 'none');
        console.log('[SafeProvider] =====================================');
      } catch (err) {
        console.error('[SafeProvider] Error fetching Safe details:', err);
      }
      
      console.log('✅ SafeClient initialized');

      return data;
    } catch (error) {
      console.error('Failed to load session:', error);
      toast.error('Failed to load Safe session. Please check your configuration.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const switchSession = async (sessionId: string) => {
    try {
      setCurrentSessionId(sessionId);
      await fetchSession(sessionId);
      toast.success('Switched to new session');
      // Reload page to ensure clean state with new session
      window.location.reload();
    } catch (error) {
      toast.error('Failed to switch session');
      throw error;
    }
  };

  const refreshSession = async () => {
    await fetchSession(currentSessionId);
  };

  const connect = useCallback(async (address: string) => {
    if (!session || !window.ethereum) {
      throw new Error('Session or window.ethereum not available');
    }

    try {
      console.log('🔌 Connecting signer to SafeClient:', address);
      
      // Create a new SafeClient with the signer
      const clientWithSigner = await createSafeClient({
        provider: window.ethereum,
        signer: address,
        safeAddress: session.safeAddress,
        apiKey: session.apiKey, // Required for Safe Transaction Service
      });
      
      setSafeClient(clientWithSigner);
      
      // Check if the address is an owner
      const owners = await clientWithSigner.getOwners();
      const isOwnerAccount = owners.some(owner => owner.toLowerCase() === address.toLowerCase());
      setIsOwner(isOwnerAccount);
      
      console.log('✅ Signer connected to SafeClient:', { address, isOwner: isOwnerAccount });
    } catch (error) {
      console.error('Failed to connect signer:', error);
      throw error;
    }
  }, [session]);

  const disconnect = useCallback(async () => {
    if (!session) return;
    
    try {
      // Reinitialize SafeClient without signer
      const client = await createSafeClient({
        provider: window.ethereum || session.rpcUrl,
        signer: undefined,
        safeAddress: session.safeAddress,
        apiKey: session.apiKey, // Required for Safe Transaction Service
      });
      
      setSafeClient(client);
      setIsOwner(false);
      console.log('🔌 Disconnected signer from SafeClient');
    } catch (error) {
      console.error('Failed to disconnect:', error);
      throw error;
    }
  }, [session]);

  const connectWallet = async (walletAddress: string, autoReconnect?: boolean) => {
    if (!session) {
      throw new Error('No active session');
    }
    
    try {
      setIsConnecting(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Save wallet address and autoReconnect preference to session
      const response = await fetch(`${apiUrl}/api/sessions/${session.id}/connected-wallet`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          walletAddress,
          autoReconnect: autoReconnect !== undefined ? autoReconnect : session.autoReconnect
        })
      });
      
      if (!response.ok) throw new Error('Failed to save wallet');
      
      const updatedSession = await response.json();
      setSession(updatedSession);
      setConnectedWallet(walletAddress);
      console.log('💾 Connected wallet to session:', walletAddress, 'Auto-reconnect:', updatedSession.autoReconnect);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (!session) {
      throw new Error('No active session');
    }
    
    try {
      setIsConnecting(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Clear wallet address from session
      const response = await fetch(`${apiUrl}/api/sessions/${session.id}/connected-wallet`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to clear wallet');
      
      const updatedSession = await response.json();
      setSession(updatedSession);
      setConnectedWallet(null);
      console.log('🗑️ Disconnected wallet from session');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    fetchSession(currentSessionId);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Safe configuration...</p>
        </div>
      </div>
    );
  }

  if (!session || !safeClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">No Session Found</h2>
          <p className="text-muted-foreground mb-4">
            Unable to load Safe configuration. Please check your backend setup.
          </p>
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Troubleshooting:</p>
            <ol className="list-decimal list-inside text-left mt-2 space-y-1">
              <li>Ensure backend is running on port 5000</li>
              <li>Check DATABASE_URL in backend/.env</li>
              <li>Verify DEFAULT_SAFE_ADDRESS is set</li>
              <li>Run: npx prisma migrate dev</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  const contextValue: SafeContextType = {
    safeClient,
    session,
    connectedWallet,
    isConnecting,
    isOwner,
    connect,
    disconnect,
    switchSession,
    refreshSession,
    connectWallet,
    disconnectWallet,
  };

  return (
    <SafeContext.Provider value={contextValue}>
      {children}
    </SafeContext.Provider>
  );
}
