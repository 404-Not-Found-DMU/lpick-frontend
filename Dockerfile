# ---------- deps ----------
FROM node:20-alpine AS deps
WORKDIR /app

# yarn만 사용할 것이므로 필요한 파일만 COPY (캐시 효율 ↑)
COPY package.json yarn.lock ./

# Yarn v1 (node:20-alpine 기본 포함) - 재현성을 위해 frozen-lockfile 사용
RUN yarn install --frozen-lockfile --non-interactive

# ---------- builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# 의존성 복사
COPY --from=deps /app/node_modules ./node_modules

# 앱 소스 복사
COPY . .

# Next 환경변수 승격 (필요한 공개 변수만!)
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1

# next.config.* 에서 output: 'standalone' 설정되어 있다고 가정
RUN yarn build

# ---------- runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# healthcheck용(선택)
RUN apk add --no-cache curl

# standalone 산출물만 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]