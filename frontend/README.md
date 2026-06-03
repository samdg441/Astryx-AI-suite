# Astryx AI Suite — Frontend

Next.js 16, React 19, TypeScript, Tailwind 4.  
Backend: [Astryx-AI-suite-Back](https://github.com/samdg441/Astryx-AI-suite-Back)

## Inicio

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

`.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://astryx-ai-suite-back.onrender.com/api/v1
```

## Rutas

| Ruta | Acceso |
|------|--------|
| `/`, `/planes`, `/contacto` | público |
| `/auth` | login/registro |
| `/dashboard` | sesión + plan |
| `/admin` | sesión + rol admin |

## Estructura

```
src/app/         páginas (App Router)
src/components/  UI
src/lib/         cliente API y utilidades
src/hooks/       auth, chat
src/store/       estado del dashboard
```

## Despliegue (Vercel)

Root Directory: `frontend`  
Variable: `NEXT_PUBLIC_API_BASE_URL` (URL del back en Render)  
En Render: `CORS_ORIGIN` y `FRONTEND_URL` con la URL de Vercel.

## Admin

```sql
UPDATE usuarios SET rol_global = 'admin' WHERE correo = 'tu@email.com';
```

Cerrar sesión y volver a entrar.
