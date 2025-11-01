# 1. Base Image for dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# 2. Builder Image
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Production Image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# You can disable the Next.js telemetry here
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# The default port is 3000, but can be overridden by the PORT environment variable
EXPOSE 3000
CMD ["node", "server.js"]
