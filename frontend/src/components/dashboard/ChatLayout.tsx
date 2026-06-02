'use client';

import React from 'react';
import { SidebarTools } from '@/components/dashboard/SidebarTools';
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
import { AIChat } from '@/components/dashboard/AIChat';
import { ContextPanel } from '@/components/dashboard/ContextPanel';
import { PremiumModal } from '@/components/dashboard/PremiumModal';
import { useChatSend } from '@/hooks/useChatSend';
import { useDashboardStore } from '@/store/useDashboardStore';

export function ChatLayout() {
  const messages = useDashboardStore((s) => s.messages);
  const premiumModal = useDashboardStore((s) => s.premiumModal);
  const closePremiumModal = useDashboardStore((s) => s.closePremiumModal);
  const { send } = useChatSend();

  const showHero = messages.length === 0;

  return (
    <div className="dashboard-shell flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1">
        <SidebarTools />
        <main className="relative flex min-w-0 flex-1 flex-col">
          <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
            {showHero && <WelcomeHero onPick={(t) => void send(t)} />}
            <AIChat />
          </div>
        </main>
        <ContextPanel />
      </div>

      <PremiumModal
        open={!!premiumModal}
        toolName={premiumModal?.toolName ?? ''}
        requiredPlan={premiumModal?.requiredPlan ?? 'pro'}
        onClose={closePremiumModal}
      />
    </div>
  );
}
