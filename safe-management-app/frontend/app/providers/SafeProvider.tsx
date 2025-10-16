'use client';

import { createSafeClient, SafeClient } from '@safe-global/sdk-starter-kit';
import { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import { toast } from 'sonner';

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
  chainId: number;
  transactionServiceUrl: string;
  apiKey?: string;
}

interface SafeProviderWrapperProps {
  children: ReactNode;
  sessionId?: string;
}

interface SafeContextType {
  safeClient: SafeClient | null;
  session: SafeSession | null;
  connectedWallet: string | null;
  isOwner: boolean;
  connect: (address: string) => Promise<void>;
  disconnect: () => Promise<void>;
  switchSession: (sessionId: string) => Promise<void>;
  refreshSession: () => Promise<void>;
}

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

export function SafeProviderWrapper({ children }: SafeProviderWrapperProps) {
  const [session, setSession] = useState<SafeSession | null>(null);
  const [safeClient, setSafeClient] = useState<SafeClient | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Only for signing - backend handles everything else
  const connect = async (address: string) => {
    if (!session || !window.ethereum) {
      throw new Error('Session or window.ethereum not available');
    }

    try {
      console.log('🔌 Connecting wallet for signing:', address);

      // Create minimal client just for signing
      // Backend handles all SDK operations, but we need txServiceUrl for client initialization
      const client = await createSafeClient({
        provider: window.ethereum,
        signer: address,
        safeAddress: session.safeAddress,
        txServiceUrl: session.transactionServiceUrl
      });

      setSafeClient(client);
      setConnectedWallet(address);

      // Check if owner (fetch from backend)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(
        `${apiUrl}/api/safe/${session.safeAddress}/info?sessionId=${session.id}`,
        { credentials: 'include' }
      );
      
      if (response.ok) {
        const safeInfo = await response.json();
        const isOwnerAccount = safeInfo.owners.some(
          (owner: string) => owner.toLowerCase() === address.toLowerCase()
        );
        setIsOwner(isOwnerAccount);
      }

      console.log('✅ Wallet connected for signing');
    } catch (error) {
      console.error('Failed to connect:', error);
      throw error;
    }
  };

  const disconnect = async () => {
    setSafeClient(null);
    setConnectedWallet(null);
    setIsOwner(false);
    console.log('🔌 Wallet disconnected');
  };

  const switchSession = async (sessionId: string) => {
    try {
      console.log('🔄 Switching to session:', sessionId);
      
      // Store the new session ID
      if (typeof window !== 'undefined') {
        localStorage.setItem('safe_active_session_id', sessionId);
        console.log('💾 Session ID saved to localStorage');
      }
      
      // Reload the page to load the new session
      console.log('🔃 Reloading page...');
      window.location.reload();
    } catch (error) {
      console.error('Failed to switch session:', error);
      throw error;
    }
  };

  const refreshSession = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const sessionId = typeof window !== 'undefined' 
        ? localStorage.getItem('safe_active_session_id')
        : null;
        
      const endpoint = sessionId 
        ? `${apiUrl}/api/sessions/${sessionId}`
        : `${apiUrl}/api/sessions/default`;
      
      const response = await fetch(endpoint, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch session: ${response.statusText}`);
      }
      
      const data = await response.json();
      setSession(data);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('safe_active_session_id', data.id);
      }
      
      setError(null);
    } catch (error) {
      console.error('Failed to refresh session:', error);
      setError(error instanceof Error ? error.message : 'Failed to refresh session');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load session from backend
    const loadSession = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        // Check localStorage for saved session ID
        const savedSessionId = typeof window !== 'undefined' 
          ? localStorage.getItem('safe_active_session_id')
          : null;
        
        // Use saved session ID if available, otherwise fetch default
        const endpoint = savedSessionId 
          ? `${apiUrl}/api/sessions/${savedSessionId}`
          : `${apiUrl}/api/sessions/default`;
        
        console.log('📋 Loading session from:', endpoint);
        
        const response = await fetch(endpoint, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          // If saved session doesn't exist, fall back to default
          if (savedSessionId) {
            console.warn('⚠️ Saved session not found, loading default');
            localStorage.removeItem('safe_active_session_id');
            // Retry with default
            const defaultResponse = await fetch(`${apiUrl}/api/sessions/default`, {
              credentials: 'include'
            });
            if (!defaultResponse.ok) {
              throw new Error(`Failed to fetch session: ${defaultResponse.statusText}`);
            }
            const defaultData = await defaultResponse.json();
            setSession(defaultData);
            localStorage.setItem('safe_active_session_id', defaultData.id);
            setError(null);
            setLoading(false);
            return;
          }
          throw new Error(`Failed to fetch session: ${response.statusText}`);
        }
        
        const data = await response.json();
        setSession(data);
        
        console.log('✅ Session loaded:', data.name, `(${data.id})`);
        
        // Store session ID in localStorage for service functions
        if (typeof window !== 'undefined') {
          localStorage.setItem('safe_active_session_id', data.id);
        }
        
        setError(null);
      } catch (error) {
        console.error('Failed to load session:', error);
        setError(error instanceof Error ? error.message : 'Failed to load session');
      } finally {
        setLoading(false);
      }
    };

    loadSession();
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

  if (error || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">No Session Found</h2>
          <p className="text-muted-foreground mb-4">
            Unable to load Safe configuration. Please check your backend setup.
          </p>
          {error && (
            <p className="text-sm text-red-500 mb-4">Error: {error}</p>
          )}
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
    isOwner,
    connect,
    disconnect,
    switchSession,
    refreshSession
  };

  return (
    <SafeContext.Provider value={contextValue}>
      {children}
    </SafeContext.Provider>
  );
}
