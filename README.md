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

## Deployment (Docker)

The image is built in two steps, deliberately:

```bash
cp .env.example .env        # fill in real NEXT_PUBLIC_SITE_URL, phone, whatsapp, email
npm ci
npm run build                # runs `prisma generate` first, then `next build`
docker compose up -d --build # packages .next/standalone and runs it
```

**Why the build isn't inside the Dockerfile**: `next build`'s static-generation
step for the marketing pages fails intermittently when run *from a `docker
build` RUN step* specifically — reproduced across base images, with and
without an init process, under varying system load — with a redacted
"Server Components render" error. The same source builds cleanly every time
on bare Node (host or CI), and a host-built artifact then runs perfectly
inside the same container image. So the build step stays outside Docker;
the Dockerfile only packages and serves the already-built `.next/standalone`
output.

`NEXT_PUBLIC_*` values are inlined at build time — set them correctly in
`.env` (or your shell) **before** `npm run build`, and rebuild whenever they
change. Runtime-only variables (e.g. `DATABASE_URL`) are still read normally
by the running container via `docker-compose.yml`'s `env_file: .env`.

Check `curl http://localhost:3000/api/health` and `docker compose logs -f`
after starting it.
