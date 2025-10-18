'use client';

import { useState } from 'react';
import { SafeProviderWrapper } from '../providers/SafeProvider';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SessionSettingsModal } from './components/SessionSettingsModal';

export default function SafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <SafeProviderWrapper>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar onSettingsClick={() => setSettingsOpen(true)} />

        {/* Main Content */}
        <div className="flex flex-col flex-1 md:ml-60">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>

        {/* Settings Modal - Controlled externally */}
        <SessionSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      </div>
    </SafeProviderWrapper>
  );
}
