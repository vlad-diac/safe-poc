'use client';

import { WalletConnect } from './WalletConnect';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-end h-16 px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <WalletConnect />
    </header>
  );
}
