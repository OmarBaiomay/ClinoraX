# ClinoraX

Premium bilingual (Arabic-first / English) landing page for **ClinoraX**, a clinic management platform — Phase 1 of a scalable healthcare SaaS.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- next-intl (`ar` default RTL, `en`)
- Framer Motion + GSAP ScrollTrigger
- Three.js (lazy, reduced-motion safe)
- Zod form validation + stub API routes
- Prisma schema scaffold (PostgreSQL) — not connected in Phase 1

## Requirements

- Node.js **20.19+** or **22+** (recommended)

```bash
export PATH="$HOME/.local/node/bin:$PATH"  # if using local Node install
```

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/ar`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:studio` | Prisma Studio (needs DB) |

## Phase 1 notes

- Demo request / contact forms validate with Zod and hit `/api/leads` & `/api/contact` stubs (no DB writes).
- To enable persistence later:
  1. Set a real `DATABASE_URL` in `.env.local`
  2. `npx prisma migrate dev --name init`
  3. Uncomment `prisma.lead.create` in the API routes

## Project layout

See `src/` for marketing sections, reusable UI, `features/` domain modules, and `prisma/schema.prisma` for future clinic dashboard models (leads, staff roles, appointments).
