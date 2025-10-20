// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Docker 런타임 최소화: .next/standalone 생성
    output: 'standalone',

  // 개발 모드에서 더 엄격한 React 검사
    reactStrictMode: true,

  // 이미지 최적화 비활성화 (Next 빌트인 Image 최적화 대신 직접 호스팅)
    images: {
        unoptimized: true,
        // domains: ['example.com'],
    },

    // 루트 추정 경고 방지: 현재 워크스페이스 루트를 명시
    outputFileTracingRoot: __dirname,
};

export default nextConfig;