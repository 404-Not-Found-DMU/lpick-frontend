# ---------- deps ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Corepack로 Yarn Berry 활성화 (필요 시 특정 버전 고정)
RUN corepack enable && corepack prepare yarn@4.10.3 --activate

# 설치 캐시 최적화를 위해 필요한 파일만 먼저 복사
COPY package.json yarn.lock* .yarnrc.yml* ./
# .yarn 디렉터리가 있으면 함께 복사 (Berry 캐시/플러그인)
# (옵션) .yarn 디렉터리가 없더라도 빌드 가능하도록 스킵

# 패키지 매니저별 무결성 설치
RUN if [ -f yarn.lock ]; then \
    yarn install --immutable --check-cache --inline-builds; \
    elif [ -f pnpm-lock.yaml ]; then \
    corepack prepare pnpm@latest --activate && pnpm i --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
    npm ci; \
    else \
    echo "No lockfile found" && exit 1; \
    fi

# ---------- builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Yarn Berry 활성화
RUN corepack enable && corepack prepare yarn@4.10.3 --activate

# deps 단계의 설치 결과와 프로젝트 파일 복사
COPY --from=deps /app/ ./
COPY . .

# Next 환경변수 승격 (필요한 공개 변수만!)
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1

# next.config: output: 'standalone' 기준
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