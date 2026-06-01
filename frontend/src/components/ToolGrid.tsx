'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Bot, Sparkles, Image as ImageIcon, Lock } from 'lucide-react';
import { getApiBaseUrl } from '@/lib/apiBase';
import { useAuth } from '@/components/auth/AuthContext';
import { canAccessPlan } from '@/lib/planAccess';
import { SkeletonToolGrid } from '@/components/ui/Skeleton';
import { buttonLinkClass } from '@/lib/buttonClasses';
import { toast } from '@/lib/toast';

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  is_premium: boolean;
  required_plan: string;
}

function normalizeToolsPayload(raw: unknown): Tool[] {
  if (Array.isArray(raw)) {
    return raw.map(mapApiToolToTool);
  }
  if (raw && typeof raw === 'object' && 'data' in raw) {
    const inner = (raw as { data: unknown }).data;
    if (Array.isArray(inner)) {
      return inner.map(mapApiToolToTool);
    }
  }
  return [];
}

function mapApiToolToTool(item: unknown): Tool {
  const o = item as Record<string, unknown>;
  const id = Number(o.id ?? 0);
  const name = String(o.name ?? '');
  const description = String(o.description ?? '');
  const category = String(o.category ?? '');
  const requiredRaw = o.required_plan ?? o.requiredPlan ?? 'free';
  const required_plan = typeof requiredRaw === 'string' ? requiredRaw : 'free';
  const isPremium =
    typeof o.is_premium === 'boolean' ? o.is_premium : required_plan !== 'free';
  return { id, name, description, category, is_premium: isPremium, required_plan };
}

export default function ToolGrid() {
  const { user, token } = useAuth();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get(`${getApiBaseUrl()}/tools`, {
          params: { page: 1, limit: 24, isActive: true },
        });
        const list = normalizeToolsPayload(response.data);
        setTools(list);
      } catch {
        toast.info('Mostrando herramientas de demostración');
        setTools([
          {
            id: 1,
            name: 'ChatGPT Plus',
            description: 'Acceso a GPT-4 y herramientas avanzadas',
            category: 'Conversational',
            is_premium: true,
            required_plan: 'pro',
          },
          {
            id: 2,
            name: 'Midjourney',
            description: 'Generación de imágenes de alta calidad',
            category: 'Image',
            is_premium: true,
            required_plan: 'empresarial',
          },
          {
            id: 3,
            name: 'Claude 3 Opus',
            description: 'El modelo más avanzado de Anthropic',
            category: 'Conversational',
            is_premium: false,
            required_plan: 'free',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    void fetchTools();
  }, []);

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
