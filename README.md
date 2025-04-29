# LPick Frontend

🎵 **LPick**은 음악과 감성을 사랑하는 사람들을 위한 LP 및 음향 기기 커뮤니티 플랫폼입니다.

본 리포지토리는 LPick 프로젝트의 **프론트엔드** 저장소입니다.



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

### 1. 레포지토리 클론
```bash
git clone https://github.com/LPick/LPick-frontend.git
```

### 2. 의존성 설치
```bash
yarn install
```

### 3. 환경 변수 설정
- `.env.example` 파일을 참고하여 `.env.local` 파일 생성 후 환경 변수를 설정합니다.

```bash
cp .env.example .env.local
```

### 4. 개발 서버 실행
```bash
yarn dev
```

개발 서버: [http://localhost:3000](http://localhost:3000)



## 🧹 Git & PR 규칙

- 브랜치 전략
  - `main`: 배포 브랜치
  - `dev`: 개발 통합 브랜치
  - `feature/*`, `fix/*`, `design/*` 등 기능/수정 단위 브랜치 생성 후 PR

- 커밋 컨벤션
  - `<타입>: #이슈번호 작업 내용 요약`
  - 예시: `feat: #13 위키 페이지 뷰어 기능 추가`

- PR 템플릿 사용 필수 (자동 적용)

> 상세한 규칙은 [LPick Frontend Convention](./docs/LPick_FE_Convention.md)을 참고하세요.
> 이슈 템플릿의 예시는 [LPick Frontend Convention](./docs/issue-example.md)을 참고하세요.



## 👥 팀 소개

| 이름 | 역할 |
|:---|:---|
| 이채원 | 프론트엔드 개발자 |
| 이창열 | 프론트엔드 개발자 |
| 고재건 | AI 엔지니어 |
| 김경환 | 백엔드 개발자 |
| 정의진 | 백엔드 개발자 |

> 협업 툴: Discord, GitHub, Microsoft Teams


## 📢 기타 안내

- Node.js 버전: **v22.15.0**
- `console.log`는 커밋 전 삭제합니다.
- any 사용 금지 (strict 타입)
- 커밋 시 husky & commitlint를 통해 커밋 메시지 검사합니다.
- 환경 변수에는 반드시 `NEXT_PUBLIC_` 접두사를 사용합니다.
- 코드 스타일은 `.vscode/settings.json` 기준으로 관리합니다 (Prettier, ESLint 설정 포함)



## 📦 배포 및 인프라

### Vercel 배포
- 개발 완료 후 `main` 브랜치로 머지되면 Vercel에서 자동 배포됩니다.
- 환경 변수는 Vercel 대시보드에서 설정합니다.

### Docker 사용
- 프로젝트를 Docker로 컨테이너라이징하여 배포할 수 있습니다.
- 기본적인 Dockerfile을 제공하며, `Docker Hub`와 연동할 수 있습니다.

### GitHub Actions
- PR 생성 및 병합 시 자동으로 Lint 검사, 빌드 검사를 수행합니다.
- 배포 브랜치(`main`)에 머지될 경우 Vercel 배포 트리거가 활성화됩니다.

---

즐겁게 개발해요 🥰
