'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link2, Loader2, CheckCircle2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { parseEther } from 'ethers';
import { useRouter } from 'next/navigation';

export default function CreatePaymentLinkPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    to: '',
    value: '',
    description: '',
    expiresIn: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [paymentLink, setPaymentLink] = useState<{
    id: string;
    url: string;
    safeTxHash: string;
  } | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);

      // Validate address
      if (!formData.to || !formData.to.match(/^0x[a-fA-F0-9]{40}$/)) {
        toast.error('Invalid recipient address');
        return;
      }

      // Validate value
      if (!formData.value || isNaN(parseFloat(formData.value))) {
        toast.error('Invalid ETH value');
        return;
      }

      // Get default session first
      const sessionResponse = await fetch(`${apiUrl}/api/sessions/default`);
      if (!sessionResponse.ok) {
        throw new Error('Failed to get session');
      }
      const session = await sessionResponse.json();

      // Prepare payment link data
      const linkData: any = {
        sessionId: session.id,
        to: formData.to,
        value: parseEther(formData.value).toString(),
        description: formData.description || undefined,
      };

      if (formData.expiresIn) {
        // Convert hours to milliseconds
        const expiresInMs = parseInt(formData.expiresIn) * 60 * 60 * 1000;
        linkData.expiresIn = expiresInMs;
      }

      // Create payment link
      const response = await fetch(`${apiUrl}/api/payment-links/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(linkData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment link');
      }

      const result = await response.json();
      
      // Generate full URL
      const fullUrl = `${window.location.origin}/safe/pay/${result.id}`;
      setPaymentLink({
        id: result.id,
        url: fullUrl,
        safeTxHash: result.safeTxHash,
      });
      
      toast.success('Payment link created successfully!');

    } catch (error: any) {
      console.error('Failed to create payment link:', error);
      toast.error(error?.message || 'Failed to create payment link');
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = async () => {
    if (!paymentLink) return;
    
    try {
      await navigator.clipboard.writeText(paymentLink.url);
      toast.success('Payment link copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  if (paymentLink) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <CardTitle>Payment Link Created!</CardTitle>
            </div>
            <CardDescription>
              Share this link to receive payments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium">Payment Link:</span>
              <div className="flex gap-2 mt-2">
                <Input
                  value={paymentLink.url}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button onClick={copyLink} size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium">Safe Transaction Hash:</span>
              <p className="text-sm font-mono text-muted-foreground break-all mt-1 p-2 bg-muted rounded">
                {paymentLink.safeTxHash}
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={() => setPaymentLink(null)}>
                Create Another
              </Button>
              <Button variant="outline" onClick={() => router.push('/safe/payment-links')}>
                View All Links
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open(paymentLink.url, '_blank')}
              >
                Open Payment Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Generate Payment Link</h1>
        <p className="text-muted-foreground">Create a shareable link to receive payments</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Fill in the details for your payment link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* To Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Recipient Address <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="0x..."
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                required
                pattern="^0x[a-fA-F0-9]{40}$"
              />
              <p className="text-xs text-muted-foreground">
                The address that will receive the payment
              </p>
            </div>

            {/* Value */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Amount (ETH) <span className="text-destructive">*</span>
              </label>
              <Input
                type="number"
                step="0.000000000000000001"
                placeholder="0.0"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
                min="0"
              />
              <p className="text-xs text-muted-foreground">
                Amount of ETH to request
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (Optional)</label>
              <Input
                placeholder="Payment for services..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Add a note to help identify this payment
              </p>
            </div>

            {/* Expiration */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Expires In (hours)</label>
              <Input
                type="number"
                placeholder="24"
                value={formData.expiresIn}
                onChange={(e) => setFormData({ ...formData, expiresIn: e.target.value })}
                min="1"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Set when this payment link expires (leave empty for no expiration)
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Payment Link...
                  </>
                ) : (
                  <>
                    <Link2 className="mr-2 h-4 w-4" />
                    Generate Payment Link
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Info Card */}
      <Card className="border-blue-500/50 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-sm">How Payment Links Work</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>A transaction proposal is created in your Safe</li>
            <li>Anyone with the link can execute the payment (if they connect a wallet)</li>
            <li>The payment still requires your Safe's signature threshold to be met</li>
            <li>You can track all payment links in your dashboard</li>
            <li>Links can be shared via email, messaging, or QR code</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
