'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Code2,
  Megaphone,
  Palette,
  Briefcase,
  Workflow,
  Microscope,
  PenLine,
} from 'lucide-react';
import { SIDEBAR_CATALOG, type ToolMinPlan } from '@/lib/dashboard/sidebarCatalog';
import { useAuth } from '@/components/auth/AuthContext';
import { canAccessPlan } from '@/lib/planAccess';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/cn';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  development: Code2,
  marketing: Megaphone,
  design: Palette,
  business: Briefcase,
  automation: Workflow,
  research: Microscope,
  content: PenLine,
};

function badgeClass(min: ToolMinPlan): string {
  if (min === 'free') return 'dash-plan-badge--free';
  if (min === 'basico') return 'dash-plan-badge--basico';
  if (min === 'pro') return 'dash-plan-badge--pro';
  return 'dash-plan-badge--empresarial';
}

function badgeLabel(min: ToolMinPlan): string {
  if (min === 'free') return 'Gratis';
  if (min === 'basico') return 'Básico';
  if (min === 'pro') return 'Pro';
  return 'Empresa';
}

export function SidebarTools() {
  const { user } = useAuth();
  const plan = user?.planType;
  const [openCat, setOpenCat] = React.useState<string | null>('development');
  const selectTool = useDashboardStore((s) => s.selectTool);
  const openPremium = useDashboardStore((s) => s.openPremiumModal);

  return (
    <aside className="dashboard-sidebar flex w-[min(100%,280px)] shrink-0 flex-col border-r">
      <div className="dashboard-sidebar-header border-b px-4 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--dash-text-faint)]">
          Categorías
        </p>
        <p className="text-sm font-semibold text-[var(--dash-text)]">Herramientas IA</p>
      </div>
      <div className="custom-scrollbar flex-1 overflow-y-auto px-2 py-3">
        {SIDEBAR_CATALOG.map((cat) => {
          const Icon = ICONS[cat.id] ?? Code2;
          const expanded = openCat === cat.id;
          return (
            <div key={cat.id} className="mb-1">
              <button
                type="button"
                onClick={() => setOpenCat(expanded ? null : cat.id)}
                className="dashboard-sidebar-cat-btn flex w-full items-center gap-2 rounded-xl px-2 py-2.5 text-left text-sm transition"
              >
                <Icon className="h-4 w-4 shrink-0 opacity-60" />
                <span className="flex-1 font-medium">{cat.label}</span>
                <ChevronRight className={`h-4 w-4 transition ${expanded ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-2"
                  >
                    <div className="dashboard-sidebar-tree space-y-1 border-l py-1 pl-3">
                      {cat.tools.map((t) => {
                        const allowed = canAccessPlan(plan, t.minPlan);
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              if (!allowed) {
                                openPremium({ toolName: t.name, requiredPlan: t.minPlan });
                                return;
                              }
                              selectTool(t.id, t.name);
                            }}
                            className="dashboard-sidebar-tool group flex w-full flex-col rounded-xl px-2 py-2 text-left transition"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-medium">{t.name}</span>
                              <span
                                className={cn(
                                  'ml-auto rounded-md border px-1.5 py-0 text-[9px] font-bold uppercase',
                                  badgeClass(t.minPlan)
                                )}
                              >
                                {badgeLabel(t.minPlan)}
                              </span>
                            </span>
                            <span className="dashboard-sidebar-tool-desc mt-0.5 text-[11px] leading-snug">
                              {t.shortDesc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
