'use client';

import { useState, useEffect } from 'react';
import { Settings, Trash2, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from '@/app/providers/SafeProvider';

interface Session {
  id: string;
  name: string;
  safeAddress: string;
  apiKey: string;
  chainId: number;
  transactionServiceUrl: string;
  isDefault: boolean;
}

interface SessionSettingsModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SessionSettingsModal({ trigger, open: controlledOpen, onOpenChange }: SessionSettingsModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use controlled open state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    safeAddress: '',
    chainId: 1,
    apiKey: '',
    transactionServiceUrl: 'https://safe-transaction-mainnet.safe.global',
    isDefault: false,
  });
  const router = useRouter();
  const { session: currentSession, switchSession } = useSession();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (open) {
      fetchSessions();
      // Debug: show what's in localStorage
      const savedId = localStorage.getItem('safe_active_session_id');
      console.log('🔍 SessionModal opened - localStorage has:', savedId);
      console.log('🔍 Current active session:', currentSession?.id, currentSession?.name);
    }
  }, [open, currentSession]);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/sessions`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('📋 Fetched sessions:', data.length, 'sessions');
        console.log('Sessions:', data.map((s: Session) => ({ id: s.id, name: s.name, isDefault: s.isDefault })));
        setSessions(data);
        
        // Set default or first session
        const defaultSession = data.find((s: Session) => s.isDefault) || data[0];
        if (defaultSession) {
          setSelectedSessionId(defaultSession.id);
          loadSession(defaultSession);
        }
      } else {
        console.error('Failed to fetch sessions, status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const loadSession = (session: Session) => {
    setFormData({
      name: session.name,
      safeAddress: session.safeAddress,
      chainId: session.chainId,
      apiKey: session.apiKey,
      transactionServiceUrl: session.transactionServiceUrl,
      isDefault: session.isDefault,
    });
  };

  const handleSessionChange = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    if (sessionId === 'new') {
      // Reset form for new session
      setFormData({
        name: '',
        safeAddress: '',
        chainId: 1,
        apiKey: '',
        transactionServiceUrl: 'https://safe-transaction-mainnet.safe.global',
        isDefault: false,
      });
    } else {
      const session = sessions.find(s => s.id === sessionId);
      if (session) {
        loadSession(session);
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const isNew = selectedSessionId === 'new';
      const url = isNew 
        ? `${apiUrl}/api/sessions`
        : `${apiUrl}/api/sessions/${selectedSessionId}`;
      
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save session');
      }

      const savedSession = await response.json();
      
      console.log('💾 Session saved:', savedSession.id, savedSession.name);
      console.log('🔄 Current session:', currentSession?.id);
      console.log('🔀 Need to switch?', savedSession.id !== currentSession?.id || isNew);
      
      // Close modal first
      setOpen(false);
      
      // If this is a new session or different from current, switch to it
      if (savedSession.id !== currentSession?.id) {
        console.log('🔀 Switching to session:', savedSession.id);
        await switchSession(savedSession.id);
      } else {
        // Just updated current session, refresh the data
        toast.success('Session updated successfully');
        router.refresh();
      }
      
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save session');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedSessionId || selectedSessionId === 'new') return;
    
    if (!confirm('Are you sure you want to delete this session?')) return;

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/sessions/${selectedSessionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete session');
      }

      toast.success('Session deleted successfully');
      
      // If deleting the currently active session, clear localStorage
      if (selectedSessionId === currentSession?.id) {
        console.log('🗑️ Deleting active session, clearing localStorage');
        localStorage.removeItem('safe_active_session_id');
      }
      
      // Close modal and reload page
      setOpen(false);
      window.location.reload();
      
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete session');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async () => {
    if (!selectedSessionId || selectedSessionId === 'new') return;

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/sessions/${selectedSessionId}/set-default`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to set default session');
      }

      toast.success('Default session updated');
      
      // Refetch sessions to update the default flag display
      await fetchSessions();
      
    } catch (error: any) {
      toast.error(error?.message || 'Failed to set default session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedSessionId === 'new' ? '✨ Create New Session' : '⚙️ Edit Session'}
          </DialogTitle>
          <DialogDescription>
            {selectedSessionId === 'new' 
              ? 'Create a new Safe session configuration'
              : 'Manage your Safe sessions and configurations'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Session</label>
            <Select value={selectedSessionId} onValueChange={handleSessionChange}>
              <SelectTrigger className={selectedSessionId === 'new' ? 'border-green-500 bg-green-50' : ''}>
                <SelectValue placeholder="Select a session" />
              </SelectTrigger>
              <SelectContent>
                {sessions.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    {session.name} {session.isDefault && '(Default)'} {session.id === currentSession?.id && '✓ Active'}
                  </SelectItem>
                ))}
                <SelectItem value="new" className="text-green-600 font-medium">
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Session
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {selectedSessionId === 'new' && (
              <p className="text-sm text-green-600 font-medium">
                ✨ Creating a new session
              </p>
            )}
            {selectedSessionId !== 'new' && selectedSessionId !== currentSession?.id && (
              <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-600 flex-1">
                  💡 This session is different from the currently active one
                </p>
                <Button 
                  size="sm" 
                  onClick={async () => {
                    setLoading(true);
                    setOpen(false);
                    await switchSession(selectedSessionId);
                    setLoading(false);
                  }}
                  disabled={loading}
                >
                  Switch Now
                </Button>
              </div>
            )}
          </div>

          {/* Session Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Session Name
                <span className="text-muted-foreground ml-2 font-normal">(Auto-generated)</span>
              </label>
              <Input
                placeholder="Auto: {Network}-{Address}"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                💡 Leave empty to auto-generate from network and address
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Safe Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                placeholder="0x..."
                value={formData.safeAddress}
                onChange={(e) => setFormData({ ...formData, safeAddress: e.target.value })}
                required
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Your Safe's Ethereum address (42 characters starting with 0x)
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Network
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select 
                value={formData.chainId.toString()} 
                onValueChange={(value) => {
                  const chainId = parseInt(value);
                  const txServiceUrl = chainId === 1 
                    ? 'https://safe-transaction-mainnet.safe.global'
                    : chainId === 11155111
                    ? 'https://safe-transaction-sepolia.safe.global'
                    : chainId === 137
                    ? 'https://safe-transaction-polygon.safe.global'
                    : chainId === 10
                    ? 'https://safe-transaction-optimism.safe.global'
                    : chainId === 42161
                    ? 'https://safe-transaction-arbitrum.safe.global'
                    : 'https://safe-transaction-mainnet.safe.global';
                  
                  setFormData({ 
                    ...formData, 
                    chainId,
                    transactionServiceUrl: txServiceUrl
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">🌐 Ethereum Mainnet</SelectItem>
                  <SelectItem value="11155111">🧪 Sepolia Testnet</SelectItem>
                  <SelectItem value="137">🟣 Polygon</SelectItem>
                  <SelectItem value="10">🔴 Optimism</SelectItem>
                  <SelectItem value="42161">🔵 Arbitrum One</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                ⚡ RPC URLs are automatically configured for this network
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Safe API Key
                <span className="text-muted-foreground ml-2">(Optional)</span>
              </label>
              <Input
                type="password"
                placeholder="Leave empty to use company key"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Optional: Provide your own Safe API key. If left empty, a shared company key will be used.
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                <span className="text-lg">🎉</span> Simplified Configuration
              </p>
              <ul className="text-sm text-blue-700 space-y-1.5 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>RPC URLs:</strong> Automatically configured by network</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>API Key:</strong> Optional - uses company key as fallback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Faster setup:</strong> Just select network and Safe address</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Transaction Service URL
                <span className="text-red-500 ml-1">*</span>
                <span className="text-muted-foreground ml-2 font-normal text-xs">(Auto-filled by network)</span>
              </label>
              <Input
                placeholder="https://safe-transaction-mainnet.safe.global"
                value={formData.transactionServiceUrl}
                onChange={(e) => setFormData({ ...formData, transactionServiceUrl: e.target.value })}
                required
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Safe's transaction indexing service (automatically set when you select a network)
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-2">
              {selectedSessionId && selectedSessionId !== 'new' && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleSetDefault}
                    disabled={loading || formData.isDefault}
                  >
                    Set as Default
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading} className={selectedSessionId === 'new' ? 'bg-green-600 hover:bg-green-700' : ''}>
                {loading 
                  ? 'Saving...' 
                  : selectedSessionId === 'new' 
                    ? '✨ Create Session' 
                    : '💾 Update Session'
                }
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
