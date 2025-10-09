'use client';

import { SafeProvider as SafeReactProvider } from '@safe-global/safe-react-hooks';
import { createConfig } from '@safe-global/safe-react-hooks';
import { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import { toast } from 'sonner';
import { mainnet, sepolia, goerli, polygon, optimism, arbitrum } from 'viem/chains';
import { createWalletClient, custom } from 'viem';

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

interface SessionContextType {
  session: SafeSession | null;
  connectedWallet: string | null;
  isConnecting: boolean;
  switchSession: (sessionId: string) => Promise<void>;
  refreshSession: () => Promise<void>;
  connectWallet: (walletAddress: string, autoReconnect?: boolean) => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

// Chain mapping for viem chains
const CHAIN_MAP: Record<number, any> = {
  1: mainnet,
  11155111: sepolia,
  5: goerli,
  137: polygon,
  10: optimism,
  42161: arbitrum,
};

// Create Session Context for session switching
const SessionContext = createContext<SessionContextType | null>(null);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SafeProviderWrapper');
  }
  return context;
}

export function SafeProviderWrapper({ children, sessionId: initialSessionId }: SafeProviderWrapperProps) {
  const [session, setSession] = useState<SafeSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<any>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>(initialSessionId);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

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

      // Get the correct viem chain
      const chain = CHAIN_MAP[data.chainId] || mainnet;
      
      // Create Safe config from session
      // IMPORTANT: 
      // - If wallet is available, use custom(window.ethereum) for both reading AND signing
      // - Otherwise, fallback to RPC URL (read-only mode)
      // - This ensures signing operations use the wallet, not the RPC provider
      const hasWallet = typeof window !== 'undefined' && window.ethereum;
      
      console.log('🔧 SafeProvider Configuration:', {
        hasWallet,
        rpcUrl: data.rpcUrl,
        safeAddress: data.safeAddress,
        chainId: data.chainId,
        providerType: hasWallet ? 'window.ethereum (wallet)' : 'RPC URL',
      });
      
      // Create provider based on wallet availability
      let provider;
      if (hasWallet) {
        // Create a viem wallet client for the browser wallet
        // This properly handles signing operations
        provider = createWalletClient({
          chain,
          transport: custom(window.ethereum),
        });
        console.log('✅ Using wallet client for signing');
      } else {
        // Fallback to RPC URL for read-only operations
        provider = data.rpcUrl;
        console.warn('⚠️ No wallet detected - running in read-only mode');
      }
      
      const safeConfig = createConfig({
        chain: chain,
        provider,
        signer: '0x0000000000000000000000000000000000000000', // Will be set via connect()
        safeAddress: data.safeAddress,
      });
      
      console.log('✅ Safe config created');

      setConfig(safeConfig);
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

  if (!session || !config) {
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

  const sessionContextValue: SessionContextType = {
    session,
    connectedWallet,
    isConnecting,
    switchSession,
    refreshSession,
    connectWallet,
    disconnectWallet,
  };

  return (
    <SessionContext.Provider value={sessionContextValue}>
      <SafeReactProvider config={config}>
        {children}
      </SafeReactProvider>
    </SessionContext.Provider>
  );
}
