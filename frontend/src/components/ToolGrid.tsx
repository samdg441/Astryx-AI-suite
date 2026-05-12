'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Bot, Sparkles, Image as ImageIcon, Lock } from 'lucide-react';
import { getApiBaseUrl } from '@/lib/apiBase';
import { useAuth } from '@/components/auth/AuthContext';
import { canAccessPlan } from '@/lib/planAccess';

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
    typeof o.is_premium === 'boolean'
      ? o.is_premium
      : required_plan !== 'free';
  return { id, name, description, category, is_premium: isPremium, required_plan };
}

export default function ToolGrid() {
  const { user, token } = useAuth();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get(`${getApiBaseUrl()}/tools`);
        const list = normalizeToolsPayload(response.data);
        setTools(list);
      } catch (error) {
        console.error('API no disponible. Usando datos de prueba.');
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
            is_premium: true,
            required_plan: 'free',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const getIcon = (category: string) => {
    if (category === 'Image') return <ImageIcon className="h-7 w-7 text-gray-300" />;
    if (category === 'Conversational') return <Bot className="h-7 w-7 text-gray-300" />;
    return <Sparkles className="h-7 w-7 text-gray-300" />;
  };

  return (
    <div className="mx-auto mt-20 w-full max-w-[90rem] px-5 pb-20 sm:px-8 md:px-10">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Herramientas IA Premium</h2>
        <p className="mx-auto max-w-3xl text-base text-gray-400 sm:text-lg">
          Accede a las mejores inteligencias artificiales desde una única plataforma
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
          <p className="text-gray-500">Cargando herramientas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {tools.map((tool) => {
            const allowed = token
              ? canAccessPlan(user?.planType, tool.required_plan)
              : tool.required_plan === 'free';
            return (
              <div
                key={tool.id}
                className={`group relative cursor-pointer rounded-xl border border-[#222] bg-[#111111] p-7 transition-colors md:p-8 ${
                  allowed ? 'hover:bg-[#1a1a1a]' : 'opacity-90'
                }`}
              >
                {!allowed && (
                  <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3 rounded-xl bg-black/75 px-4 text-center backdrop-blur-[2px]">
                    <Lock className="h-8 w-8 text-amber-200/90" aria-hidden />
                    <p className="text-sm font-medium text-white">
                      {token ? 'Tu plan no incluye esta herramienta.' : 'Inicia sesión y elige un plan.'}
                    </p>
                    <Link
                      href={token ? '/planes' : '/auth'}
                      className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
                    >
                      {token ? 'Ver planes' : 'Entrar'}
                    </Link>
                  </div>
                )}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#222] shadow-md transition-colors group-hover:bg-[#333]">
                  {getIcon(tool.category)}
                </div>
                <h3 className="mb-2 flex flex-wrap items-center gap-2 text-xl font-bold sm:text-2xl">
                  {tool.name}
                  {tool.is_premium && (
                    <span className="rounded-sm bg-gradient-to-r from-amber-200 to-yellow-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                      PRO
                    </span>
                  )}
                </h3>
                <p className="text-base leading-relaxed text-gray-400">{tool.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
