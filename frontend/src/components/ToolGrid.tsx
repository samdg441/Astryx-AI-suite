'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Sparkles, Image as ImageIcon, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePublicTools } from '@/hooks/usePublicTools';
import { canAccessPlan } from '@/lib/planAccess';
import { SkeletonToolGrid } from '@/components/ui/Skeleton';
import { buttonLinkClass } from '@/lib/buttonClasses';

export default function ToolGrid() {
  const { user, token } = useAuth();
  const { tools, loading } = usePublicTools();

  const getIcon = (category: string) => {
    if (category === 'Image' || category === 'imagen')
      return <ImageIcon className="text-muted h-7 w-7" />;
    if (category === 'Conversational' || category === 'texto')
      return <Bot className="text-muted h-7 w-7" />;
    return <Sparkles className="text-muted h-7 w-7" />;
  };

  return (
    <div className="mx-auto mt-20 w-full max-w-[90rem] px-5 pb-20 sm:px-8 md:px-10">
      <div className="mb-12 text-center">
        <h2 className="text-heading mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
          Herramientas IA Premium
        </h2>
        <p className="text-muted mx-auto max-w-3xl text-base sm:text-lg">
          Accede a las mejores inteligencias artificiales desde una única plataforma
        </p>
      </div>

      {loading ? (
        <SkeletonToolGrid count={6} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {tools.map((tool) => {
            const allowed = token
              ? canAccessPlan(user?.planType, tool.required_plan)
              : tool.required_plan === 'free';
            return (
              <div
                key={tool.id}
                className={`tool-card group relative cursor-pointer rounded-xl p-7 md:p-8 ${
                  !allowed ? 'opacity-95' : ''
                }`}
              >
                {!allowed && (
                  <div className="tool-lock-overlay">
                    <Lock className="h-8 w-8 text-amber-500" aria-hidden />
                    <p>
                      {token ? 'Tu plan no incluye esta herramienta.' : 'Inicia sesión y elige un plan.'}
                    </p>
                    <Link
                      href={token ? '/planes' : '/auth'}
                      className={buttonLinkClass('primary', 'px-4 py-2 text-sm')}
                    >
                      {token ? 'Ver planes' : 'Entrar'}
                    </Link>
                  </div>
                )}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)]">
                  {getIcon(tool.category)}
                </div>
                <h3 className="text-heading mb-2 flex flex-wrap items-center gap-2 text-xl font-bold sm:text-2xl">
                  {tool.name}
                  {tool.is_premium && (
                    <span className="rounded-sm bg-gradient-to-r from-amber-200 to-yellow-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                      PRO
                    </span>
                  )}
                </h3>
                <p className="text-muted text-base leading-relaxed">{tool.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
