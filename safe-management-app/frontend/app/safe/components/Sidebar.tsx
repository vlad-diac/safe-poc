'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, List, Plus, Link2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onSettingsClick: () => void;
}

export function Sidebar({ onSettingsClick }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/safe', label: 'Home', icon: Home },
    { href: '/safe/transactions', label: 'Tasks', icon: List },
    { href: '/safe/create', label: 'Create Task', icon: Plus },
    { href: '/safe/payment-links', label: 'Payment Links', icon: Link2 },
    { href: '/safe/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 border-r bg-background">
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="flex items-center h-16 px-6 border-b">
          <h1 className="text-xl font-bold">Safe Manager</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Session Settings at bottom */}
        <div className="p-3 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={onSettingsClick}
          >
            <Settings className="mr-3 h-5 w-5" />
            Session Settings
          </Button>
        </div>
      </div>
    </aside>
  );
}
