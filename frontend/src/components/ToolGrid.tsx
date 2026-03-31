'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bot, Sparkles, Image as ImageIcon } from 'lucide-react';

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  is_premium: boolean;
}

export default function ToolGrid() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intentaremos consumir nuestra API (o usaremos hardcoded fallback si falla)
    const fetchTools = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tools');
        setTools(response.data);
      } catch (error) {
        console.error('API no disponible. Usando datos de prueba.');
        setTools([
          { id: 1, name: 'ChatGPT Plus', description: 'Acceso a GPT-4 y herramientas avanzadas', category: 'Conversational', is_premium: true },
          { id: 2, name: 'Midjourney', description: 'Generación de imágenes de alta calidad', category: 'Image', is_premium: true },
          { id: 3, name: 'Claude 3 Opus', description: 'El modelo más avanzado de Anthropic', category: 'Conversational', is_premium: true },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const getIcon = (category: string) => {
    if (category === 'Image') return <ImageIcon className="w-6 h-6 text-gray-300" />;
    if (category === 'Conversational') return <Bot className="w-6 h-6 text-gray-300" />;
    return <Sparkles className="w-6 h-6 text-gray-300" />;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-20 pb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Herramientas IA Premium</h2>
        <p className="text-gray-400">Accede a las mejores inteligencias artificiales desde una única plataforma</p>
      </div>

      {loading ? (
        <div className="flex justify-center flex-col items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
          <p className="text-gray-500">Cargando herramientas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-[#111111] hover:bg-[#1a1a1a] transition-colors border border-[#222] p-6 rounded-xl group cursor-pointer">
              <div className="w-12 h-12 bg-[#222] group-hover:bg-[#333] transition-colors rounded-lg flex items-center justify-center mb-6 shadow-md">
                {getIcon(tool.category)}
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                {tool.name} 
                {tool.is_premium && <span className="text-[10px] uppercase bg-gradient-to-r from-amber-200 to-yellow-400 text-black px-2 py-0.5 rounded-sm font-bold tracking-wider">PRO</span>}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
