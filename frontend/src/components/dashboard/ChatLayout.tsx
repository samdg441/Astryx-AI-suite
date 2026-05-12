'use client';

import React from 'react';
import { SidebarTools } from '@/components/dashboard/SidebarTools';
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
import { AIChat } from '@/components/dashboard/AIChat';
import { PremiumModal } from '@/components/dashboard/PremiumModal';
import { useDashboardStore } from '@/store/useDashboardStore';

export function ChatLayout() {
  const messages = useDashboardStore((s) => s.messages);
  const premiumModal = useDashboardStore((s) => s.premiumModal);
  const closePremiumModal = useDashboardStore((s) => s.closePremiumModal);
  const sendUserFlow = useDashboardStore((s) => s.sendUserFlow);

  const showHero = messages.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-black text-white">
      <div className="flex min-h-0 flex-1">
        <SidebarTools />
        <main className="relative flex min-w-0 flex-1 flex-col bg-black">
          <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
            {showHero && <WelcomeHero onPick={(t) => sendUserFlow(t)} />}
            <AIChat />
          </div>
        </main>
        <aside className="hidden w-72 shrink-0 border-l border-[#222] bg-[#0a0a0a]/95 p-4 text-xs text-gray-500 xl:block">
          <p className="mb-2 font-semibold uppercase tracking-wider text-gray-400">Contexto</p>
          <p>
            Panel opcional para archivos, memoria de proyecto y métricas. Conecta aquí tus
            integraciones empresariales cuando avances el backend.
          </p>
        </aside>
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
