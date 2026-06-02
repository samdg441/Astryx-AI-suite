# Astryx AI Suite — Frontend

Frontend de **Astryx AI Suite**: landing, autenticación, planes, dashboard y panel admin. Construido con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS 4**.

API backend: [Astryx-AI-suite-Back](https://github.com/samdg441/Astryx-AI-suite-Back)

## Requisitos

- Node.js 20+
- Backend en ejecución (local o Render)

## Configuración

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Edita `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://astryx-ai-suite-back.onrender.com/api/v1
```

## Scripts

```bash
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # servir build
```

## Estructura

```txt
src/
├── app/              # Rutas (App Router)
│   ├── admin/        # Panel admin (rol admin)
│   ├── auth/         # Login / registro
│   ├── dashboard/    # Workspace (requiere sesión + plan)
│   └── contacto/     # Formulario → POST /contact-leads
├── components/       # UI y layouts
├── hooks/            # useAuth, useRequireAuth, usePublicTools
├── lib/              # API clients (authApi, toolsApi, contactApi, apiClient)
├── services/         # subscriptionApi
└── store/            # Estado del dashboard
```

## Funcionalidades

- Login/registro con JWT y sesión en `localStorage`
- Rutas privadas: `/dashboard` y `/admin` (`middleware.ts` + cookie + `useRequireAuth`)
- Panel admin `/admin` (solo `globalRole === admin`): CRUD herramientas IA y gestión de contactos
- Formulario de contacto integrado con la API
- Modo claro / oscuro
- Página 404 personalizada
- Redirect automático en 401 (sesión expirada) vía `apiClient` en todas las llamadas autenticadas
- Validación de auth con errores **debajo de cada campo** (login y registro)

## Usuario admin

El rol `admin` se asigna en la base de datos (tabla `usuarios`, columna `rol_global`). Ejemplo en Supabase SQL:

```sql
UPDATE usuarios SET rol_global = 'admin' WHERE correo = 'tu@email.com';
```

Cierra sesión y vuelve a entrar para ver el enlace **Admin** en la navbar.

## Despliegue (Vercel)

1. Importa el repo **Astryx-AI-suite** (raíz del monorepo).
2. **Root Directory** = `frontend` (Settings → General). Si no, verás error **NOT_FOUND** en la URL.
3. Variable de entorno: `NEXT_PUBLIC_API_BASE_URL` = `https://astryx-ai-suite-back.onrender.com/api/v1`
4. En Render, actualiza `CORS_ORIGIN` y `FRONTEND_URL` con la URL de Vercel.
5. Tras `git push`, Vercel redeploya solo.

El repo incluye `vercel.json` en la raíz que apunta los comandos de build a `frontend/`.

## Demo en producción

- Frontend: _(añadir URL Vercel tras desplegar)_
- Backend: https://astryx-ai-suite-back.onrender.com/api/v1/health
