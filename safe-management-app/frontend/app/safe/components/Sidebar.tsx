'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bell, ClipboardList, History, Store, Wallet, TrendingUp, ChevronRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSafe } from '@/app/providers/SafeProvider';

interface SidebarProps {
  onSettingsClick: () => void;
}

export function Sidebar({ onSettingsClick }: SidebarProps) {
  const pathname = usePathname();
  const { session } = useSafe();

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navItems = [
    { href: '/safe', label: 'Updates', icon: Bell, badge: 23 },
    { href: '/safe/transactions', label: 'Tasks', icon: ClipboardList, badge: 9 },
    { href: '/safe/transactions', label: 'Transactions', icon: History },
    { href: '/safe/vendors', label: 'Vendors', icon: Store },
    { href: '/safe/wallets', label: 'Wallets', icon: Wallet },
    { href: '/safe/forecast', label: 'Forecast', icon: TrendingUp },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-60 bg-white">
      <div className="flex flex-col h-full gap-2 p-4">
        {/* Logo/Brand */}
        <Link href="/safe" className="flex items-center px-2 py-2 hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.svg" 
            alt="Safe Manager" 
            width={130}
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-[#E7E5E4] to-[#FAFAF9]" />

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-2 py-2 text-sm rounded-lg transition-all relative',
                  isActive
                    ? 'bg-white border border-[#E7E5E4] shadow-sm text-[#292524] font-medium'
                    : 'text-[#57534E] hover:bg-[#FAFAF9]'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto flex items-center justify-center min-w-[20px] h-5 px-1 bg-[#DC2626] text-white text-xs font-semibold rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Session/Wallet Section */}
        <button
          onClick={onSettingsClick}
          className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#FAFAF9] transition-colors"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start min-w-0">
            <span className="text-sm font-semibold text-[#292524] truncate w-full">
              {session?.name || 'No Session'}
            </span>
            <span className="text-xs text-[#78716C] font-mono">
              {session?.safeAddress ? truncateAddress(session.safeAddress) : '---'}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-[#57534E] flex-shrink-0" strokeWidth={1.5} />
        </button>
      </div>
    </aside>
  );
}
