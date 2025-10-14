# LPick Frontend

🎵 **LPick**은 음악과 감성을 사랑하는 사람들을 위한 LP 및 음향 기기 커뮤니티 플랫폼입니다.

이 저장소는 **LPick 프로젝트의 프론트엔드** 전용 저장소입니다.

## 👥 Front-end 구성원 소개

| 이채원 | 프론트엔드 개발자 |
| 이창열 | 프론트엔드 개발자 |

## 📦 기술 스택

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **State Management**: Zustand
- **CSS**: TailwindCSS, CSS Modules
- **Build Tool**: Next.js 기본 빌드 도구
- **Package Manager**: Yarn
- **환경 관리**: .env.local / .env.example
- **버전 관리**: Git, GitHub

## 🏗️ 프로젝트 구조

```
📦src
 ┣ 📂assets          // 정적 파일 (SVG, 이미지 등)
 ┣ 📂components      // 공통 UI 컴포넌트
 ┣ 📂hooks           // 커스텀 훅
 ┣ 📂modules         // 도메인별 비즈니스 로직
 ┣ 📂app             // App Router 기반 라우팅 및 페이지
 ┣ 📂store           // 전역 상태 관리 (Zustand)
 ┣ 📂styles          // 글로벌 스타일/테마
 ┣ 📂types           // 전역 타입
 ┣ 📂utils           // 유틸 함수
 ┗ 📜env.d.ts        // 환경 변수 타입 정의
```

> 자세한 컨벤션은 [LPick Frontend Convention](./docs/LPick_FE_Convention.md) 문서를 참고하세요.

## 🚀 시작하기

```bash
# 1. 레포지토리 클론
git clone https://github.com/LPick/LPick-frontend.git

# 2. 의존성 설치
yarn install

# 3. 환경 변수 설정
cp .env.example .env.local

# 4. 개발 서버 실행
yarn dev
```

개발 서버: [http://localhost:3000](http://localhost:3000)

## 🔐 관리자(Admin) 섹션

- 라우트 맵
  - `/admin` 대시보드
  - `/admin/notices` 공지사항 관리
  - `/admin/faq` FAQ 관리
  - `/admin/inquiry` 1:1 문의 관리
  - `/admin/expert` 전문가 등업 심사
  - `/admin/wiki-review` 위키 편집 검수
  - `/admin/users` 사용자 관리

- 접근 가드(임시)
  - `src/middleware.ts`에서 `/admin/**` 접근 시 쿠키 `role=admin` 또는 `NEXT_PUBLIC_ADMIN_MOCK=1`일 때만 통과
  - 비관리자는 `/login?redirect=/admin...`로 리다이렉트

- 구현 원칙
  - `page.tsx`는 서버 컴포넌트, 상호작용은 `parts/*Client.tsx`
  - 테이블/필터/페이지네이션/모달 등 공통 컴포넌트 재사용

## 📦 배포 및 인프라

### Vercel 배포

- `main` 브랜치로 머지되면 **자동으로 Vercel에서 배포**됩니다.
- 환경 변수는 Vercel 프로젝트 대시보드에서 관리합니다.

### Docker 지원

- 개발 및 배포용으로 **Dockerfile**이 포함되어 있습니다.
- 필요 시 `Docker Hub` 또는 기타 컨테이너 환경에 연동 가능합니다.

### GitHub Actions

- PR 생성 및 `main` 병합 시 **자동 Lint 및 빌드 검사**가 실행됩니다.
- CI 설정은 `.github/workflows/` 디렉토리에서 확인할 수 있습니다.

## 🧹 Git & PR 규칙

- 브랜치 전략
  - `main`: 배포 브랜치
  - `dev`: 개발 통합 브랜치
  - `feature/*`, `fix/*`, `design/*` 등 작업 단위 브랜치 생성

- 커밋 컨벤션
  - `<타입>: #이슈번호 작업 내용 요약`
  - 예시: `feat: #13 위키 페이지 뷰어 기능 추가`

- PR 템플릿 사용 필수 (자동 적용)

> 상세한 규칙은 [LPick Frontend Convention](./docs/LPick_FE_Convention.md)을 참고하세요.

즐겁게 개발해요 🥰
