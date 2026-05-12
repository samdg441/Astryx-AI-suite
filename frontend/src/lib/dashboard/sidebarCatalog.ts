/** Plan mínimo por herramienta (debe coincidir con CHECK en BD). */
export type ToolMinPlan = 'free' | 'basico' | 'pro' | 'empresarial';

export type SidebarToolDef = {
  id: string;
  name: string;
  shortDesc: string;
  minPlan: ToolMinPlan;
};

export type SidebarCategoryDef = {
  id: string;
  label: string;
  tools: SidebarToolDef[];
};

export const SIDEBAR_CATALOG: SidebarCategoryDef[] = [
  {
    id: 'development',
    label: 'Desarrollo',
    tools: [
      {
        id: 'dev-code-assistant',
        name: 'Asistente de código',
        shortDesc: 'Refactor, pruebas y fragmentos.',
        minPlan: 'free',
      },
      {
        id: 'dev-bug-finder',
        name: 'Detector de errores',
        shortDesc: 'Patrones y code smells.',
        minPlan: 'basico',
      },
      {
        id: 'dev-sql',
        name: 'Generador SQL',
        shortDesc: 'Consultas y esquemas en lenguaje natural.',
        minPlan: 'pro',
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    tools: [
      { id: 'mkt-ads', name: 'Creador de anuncios', shortDesc: 'Copys y variantes A/B.', minPlan: 'basico' },
      { id: 'mkt-seo', name: 'Redactor SEO', shortDesc: 'Meta, H1 y clusters semánticos.', minPlan: 'free' },
      {
        id: 'mkt-social',
        name: 'Planificador social',
        shortDesc: 'Calendario y ganchos virales.',
        minPlan: 'pro',
      },
    ],
  },
  {
    id: 'design',
    label: 'Diseño',
    tools: [
      { id: 'des-ui', name: 'Prompts de UI', shortDesc: 'Layouts y sistemas de diseño.', minPlan: 'free' },
      { id: 'des-brand', name: 'Guía de marca', shortDesc: 'Paleta y tono de marca.', minPlan: 'basico' },
    ],
  },
  {
    id: 'business',
    label: 'Negocio',
    tools: [
      { id: 'biz-strategy', name: 'Estrategia startup', shortDesc: 'Lean canvas y GTM.', minPlan: 'basico' },
      {
        id: 'biz-pitch',
        name: 'Pitch deck',
        shortDesc: 'Narrativa lista para inversores.',
        minPlan: 'empresarial',
      },
    ],
  },
  {
    id: 'automation',
    label: 'Automatización',
    tools: [
      {
        id: 'auto-workflow',
        name: 'Constructor de flujos',
        shortDesc: 'Encadenar pasos con IA.',
        minPlan: 'pro',
      },
    ],
  },
  {
    id: 'research',
    label: 'Investigación',
    tools: [
      { id: 'res-synth', name: 'Síntesis de fuentes', shortDesc: 'Resume papers y enlaces.', minPlan: 'free' },
      {
        id: 'res-deep',
        name: 'Análisis profundo',
        shortDesc: 'Informes largos multimodelo.',
        minPlan: 'empresarial',
      },
    ],
  },
  {
    id: 'content',
    label: 'Creación de contenido',
    tools: [
      { id: 'cnt-blog', name: 'Arquitecto de blog', shortDesc: 'Esquemas y borradores SEO.', minPlan: 'free' },
      {
        id: 'cnt-video',
        name: 'Guion de vídeo',
        shortDesc: 'Guiones y storyboard textual.',
        minPlan: 'basico',
      },
    ],
  },
];
