# Astryx AI Suite

Plataforma full-stack para centralizar herramientas de IA, planes de suscripción, autenticación JWT y panel de administración.

## Repositorios

| Parte | Carpeta / repo | Stack |
| --- | --- | --- |
| **Frontend** | [`frontend/`](./frontend) · [Astryx-AI-suite](https://github.com/samdg441/Astryx-AI-suite) | Next.js 16, React 19, TypeScript, Tailwind 4 |
| **Backend** | [Astryx-AI-suite-Back](https://github.com/samdg441/Astryx-AI-suite-Back) | Express 5, Prisma 7, PostgreSQL (Supabase), JWT |

## Demo (producción)

- **API:** https://astryx-ai-suite-back.onrender.com/api/v1/health
- **Web:** _(añadir URL de Vercel tras desplegar el frontend)_

## Inicio rápido

### Backend

```bash
cd Astryx-AI-suite-Back   # o clona el repo Back
cp .env.example .env
npm install
npx prisma migrate deploy
npm run prisma:seed
npm run dev
```

API en `http://localhost:4000/api/v1`

### Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

App en `http://localhost:3000` — en `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
```

## Funcionalidades entregadas

- Registro / login con JWT y roles (`admin` | `usuario`)
- CRUD API: herramientas IA (`/tools`) y contactos (`/contact-leads`)
- Panel admin en el front: usuarios, IAs y mensajes de contacto
- Formulario de contacto conectado al API
- Modo claro / oscuro
- Rutas protegidas (`middleware` + guards en cliente)

## Estructura del monorepo (front)

```txt
frontend/src/
├── app/          # Rutas Next.js (auth, dashboard, admin, planes…)
├── components/   # UI
├── hooks/        # useAuth, useRequireAuth, usePublicTools
├── lib/          # Clientes API (apiClient, authApi, toolsApi…)
├── services/     # subscriptionApi
└── store/        # Estado del dashboard
```

## Usuario admin de prueba

Tras `npm run prisma:seed-admin` en el backend (ver README del Back):

- Correo: `admin@gmail.com`
- Contraseña: la definida en el script de seed

## Documentación detallada

- [frontend/README.md](./frontend/README.md)
- [Astryx-AI-suite-Back/README.md](https://github.com/samdg441/Astryx-AI-suite-Back#readme)

## Autor

Proyecto de entrega — Astryx AI Suite.
