# syntax=docker/dockerfile:1
#
# This packages an ALREADY-BUILT app — it does not run `npm ci`/`next
# build` itself. Build on the host or in CI first:
#
#   npm ci
#   npm run build      # runs `prisma generate` first via the "prebuild" script
#
# then:
#
#   docker build -t clinorax .
#   # or: docker compose up -d --build
#
# Why: `next build`'s static-generation step for this app's marketing
# pages fails intermittently when invoked *from a `docker build` RUN
# step* specifically — reproduced across Alpine and Debian base images,
# with and without an init process, under light and heavy system load —
# with a redacted "Server Components render" error. The exact trigger
# was never pinned down, but it is provably NOT about the runtime: an
# artifact built on bare Node (host or CI) runs perfectly inside this
# same image. So the build step is kept outside Docker entirely, and
# Docker's job here is purely to package + serve the standalone output.
FROM node:20.19-bookworm-slim
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends tini \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Next.js standalone output: minimal server + only the deps it traced.
# NEXT_PUBLIC_* values are already inlined into this build — set them
# correctly before `npm run build`, not here (Docker build args/runtime
# env cannot change them after the fact).
COPY --chown=nextjs:nodejs public ./public
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static
COPY --chown=nextjs:nodejs prisma ./prisma

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server.js"]
