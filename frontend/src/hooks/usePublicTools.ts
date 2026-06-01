'use client';

import { useCallback, useEffect, useState } from 'react';
import { listTools } from '@/lib/toolsApi';
import { toast } from '@/lib/toast';

export type PublicTool = {
  id: number;
  name: string;
  description: string;
  category: string;
  is_premium: boolean;
  required_plan: string;
};

const DEMO_TOOLS: PublicTool[] = [
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
];

function mapTool(item: {
  id: number;
  name: string;
  description: string;
  category: string;
  is_premium?: boolean;
  required_plan: string;
}): PublicTool {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category,
    is_premium: item.is_premium ?? item.required_plan !== 'free',
    required_plan: item.required_plan,
  };
}

export function usePublicTools() {
  const [tools, setTools] = useState<PublicTool[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listTools({ page: 1, limit: 24, isActive: true });
      setTools(res.data.map(mapTool));
    } catch {
      toast.info('Mostrando herramientas de demostración');
      setTools(DEMO_TOOLS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { tools, loading, reload: load };
}
