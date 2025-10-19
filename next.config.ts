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

    // App Router를 사용하는 경우 edge runtime 페이지가 많은지 확인 필요
    // (대부분 standalone 생성엔 문제 없음)
};

export default nextConfig;