'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  useSafe, 
  useUpdateOwners, 
  useUpdateThreshold 
} from '@safe-global/safe-react-hooks';
import { toast } from 'sonner';
import { 
  UserPlus, 
  UserMinus, 
  Shield, 
  Copy, 
  CheckCircle2,
  AlertCircle,
  Users
} from 'lucide-react';
import { isAddress } from 'ethers';

export default function SettingsPage() {
  const { getSafeInfo, isOwnerConnected } = useSafe();
  const safeInfoQuery = getSafeInfo();
  const { add, remove } = useUpdateOwners();
  const { updateThreshold } = useUpdateThreshold();

  const [newOwnerAddress, setNewOwnerAddress] = useState('');
  const [removeOwnerAddress, setRemoveOwnerAddress] = useState('');
  const [newThreshold, setNewThreshold] = useState('');

  const safeInfo = safeInfoQuery.data;
  const owners = safeInfo?.owners || [];
  const threshold = safeInfo?.threshold || 1;
  const isOwner = isOwnerConnected;

  // Add owner mutation
  const addOwnerMutation = add;

  // Remove owner mutation
  const removeOwnerMutation = remove;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleAddOwner = async () => {
    if (!isAddress(newOwnerAddress)) {
      toast.error('Invalid Ethereum address');
      return;
    }

    if (owners.some((owner: string) => owner.toLowerCase() === newOwnerAddress.toLowerCase())) {
      toast.error('Address is already an owner');
      return;
    }

    try {
      await addOwnerMutation.addOwner({
        ownerAddress: newOwnerAddress,
        // Optionally increase threshold when adding an owner
        // threshold: threshold + 1
      });
      
      toast.success('Owner added successfully!');
      setNewOwnerAddress('');
      safeInfoQuery.refetch();
    } catch (error: any) {
      console.error('Add owner error:', error);
      toast.error(error?.message || 'Failed to add owner');
    }
  };

  const handleRemoveOwner = async () => {
    if (!isAddress(removeOwnerAddress)) {
      toast.error('Invalid Ethereum address');
      return;
    }

    if (!owners.some((owner: string) => owner.toLowerCase() === removeOwnerAddress.toLowerCase())) {
      toast.error('Address is not an owner');
      return;
    }

    if (owners.length === 1) {
      toast.error('Cannot remove the last owner');
      return;
    }

    try {
      await removeOwnerMutation.removeOwner({
        ownerAddress: removeOwnerAddress,
        // Automatically decrease threshold if needed
        threshold: Math.min(threshold, owners.length - 1)
      });
      
      toast.success('Owner removed successfully!');
      setRemoveOwnerAddress('');
      safeInfoQuery.refetch();
    } catch (error: any) {
      console.error('Remove owner error:', error);
      toast.error(error?.message || 'Failed to remove owner');
    }
  };

  const handleUpdateThreshold = async () => {
    const newThresholdNum = parseInt(newThreshold);
    
    if (isNaN(newThresholdNum) || newThresholdNum < 1) {
      toast.error('Threshold must be at least 1');
      return;
    }

    if (newThresholdNum > owners.length) {
      toast.error(`Threshold cannot exceed number of owners (${owners.length})`);
      return;
    }

    if (newThresholdNum === threshold) {
      toast.error('New threshold is the same as current threshold');
      return;
    }

    try {
      await updateThreshold({
        threshold: newThresholdNum
      });
      
      toast.success('Threshold updated successfully!');
      setNewThreshold('');
      safeInfoQuery.refetch();
    } catch (error: any) {
      console.error('Update threshold error:', error);
      toast.error(error?.message || 'Failed to update threshold');
    }
  };

  if (safeInfoQuery.isLoading) {
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

  if (!isOwner) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Safe Settings</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You must be a Safe owner to manage settings.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Safe Settings</h1>
        <p className="text-muted-foreground">Manage owners and security settings</p>
      </div>

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
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your Safe has only 1 owner. Add more owners and increase the threshold for multi-signature security.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="New threshold"
              value={newThreshold}
              onChange={(e) => setNewThreshold(e.target.value)}
              min="1"
              max={owners.length}
              className="max-w-[200px]"
            />
            <Button
              onClick={handleUpdateThreshold}
              disabled={updateThreshold.isPending || !newThreshold}
            >
              {updateThreshold.isPending ? 'Updating...' : 'Update Threshold'}
            </Button>
          </div>
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

      {/* Add Owner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Owner
          </CardTitle>
          <CardDescription>
            Add a new address that can sign transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Since your threshold is {threshold}, the add owner transaction will be{' '}
              {threshold === 1 ? 'executed immediately' : `executed after ${threshold} signatures`}.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Input
              placeholder="0x... (New owner address)"
              value={newOwnerAddress}
              onChange={(e) => setNewOwnerAddress(e.target.value)}
            />
            <Button
              onClick={handleAddOwner}
              disabled={addOwnerMutation.isPending || !newOwnerAddress}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {addOwnerMutation.isPending ? 'Adding...' : 'Add Owner'}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            💡 Tip: After adding owners, consider increasing the threshold for better security.
          </p>
        </CardContent>
      </Card>

      {/* Remove Owner */}
      {owners.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserMinus className="h-5 w-5" />
              Remove Owner
            </CardTitle>
            <CardDescription>
              Remove an existing owner from the Safe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Removing an owner is permanent. Make sure the address is correct.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Input
                placeholder="0x... (Owner address to remove)"
                value={removeOwnerAddress}
                onChange={(e) => setRemoveOwnerAddress(e.target.value)}
              />
              <Button
                onClick={handleRemoveOwner}
                variant="destructive"
                disabled={removeOwnerMutation.isPending || !removeOwnerAddress}
              >
                <UserMinus className="mr-2 h-4 w-4" />
                {removeOwnerMutation.isPending ? 'Removing...' : 'Remove Owner'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

