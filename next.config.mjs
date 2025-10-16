// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker 런타임 최소화: .next/standalone 생성
  output: 'standalone',

  reactStrictMode: true,

  // 이미지 외부 도메인 쓰면 여기에 추가
  // images: { domains: ['example.com'] },

  // App Router 쓰면 edge runtime 페이지가 많지 않은지 확인
  // (edge가 많아도 대부분 standalone 생성엔 문제 없음)
};

export default nextConfig;