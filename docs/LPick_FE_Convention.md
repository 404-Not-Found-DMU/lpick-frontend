# LPick 프론트엔드  컨벤션


## 1. 예시 폴더 구조

```
📦src
 ┣ 📂assets
 ┃ ┗ 📜lpick-icon.svg
 ┃   - 프로젝트에서 사용하는 정적 파일(SVG, 이미지 등)을 저장
 ┣ 📂components
 ┃ ┣ 📂Button
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Input
 ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂Modal
 ┃     ┣ 📜Modal.tsx
 ┃     ┗ 📜index.ts
 ┃   - 공통으로 사용되는 UI 컴포넌트
 ┣ 📂hooks
 ┃ ┗ 📂api
 ┃     ┗ 📜useApi.ts
 ┃   - 커스텀 훅을 정의하는 공간
 ┣ 📂modules
 ┃ ┗ 📂comment
 ┃     ┗ 📂feature
 ┃   - 기능 단위 비즈니스 로직을 구성하는 공간
 ┣ 📂pages
 ┃ ┣ 📂LplayerPage
 ┃ ┣ 📂MainPage
 ┃ ┗ 📂WikiPage
 ┃     ┣ 📂EditPage
 ┃     ┣ 📂ViewPage
 ┃     ┃ ┣ 📂api
 ┃     ┃ ┣ 📂components
 ┃     ┃ ┣ 📂hooks
 ┃     ┃ ┣ 📂types
 ┃     ┃ ┗ 📜WikiViewPage.tsx
 ┃     ┗ 📜index.tsx
 ┃   - 실제 라우팅되는 페이지 단위 폴더. 페이지별로 하위 모듈을 세분화
 ┣ 📂store
 ┃   - 전역 상태 관리 관련 코드(zustand)를 저장
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.tsx
 ┃ ┗ 📜theme.ts
 ┃   - 전역 스타일 설정 및 테마 설정
 ┣ 📂types
 ┃ ┗ 📜user.types.ts
 ┃   - 전역에서 사용되는 타입들을 정의
 ┣ 📜App.tsx
 ┗ 📜main.tsx
```
---

## 2. 커밋 메시지 규칙

### 기본 형식

```
<타입>: #<이슈번호> <작업 내용 요약>

<선택 - 본문>
```

```
✅
feat: #13 앨범 검색 기능 구현 

- 이미지 업로드 후 검색 요청 API 호출 기능 추가
- 검색 결과 리스트 컴포넌트 생성 및 mock 데이터로 테스트


🚫
feat, fix: #15 댓글 기능 개발 및 검색 기능 수정
```

### 자주 사용하는 타입

- feat: 새로운 기능 추가
- fix: 버그 수정
- design: UI/스타일 변경
- style: 코드 포맷팅
- refactor: 리팩토링
- test: 테스트 코드 작성
- docs: 문서 수정
- chore: 잡일/설정
- build: 빌드 설정 수정
- ci: CI 설정 수정
- perf: 성능 개선
- rename: 파일/폴더명 변경
- remove: 파일 삭제

### 참고 사항

- 메시지는 한글로 작성
- 하나의 목적만 담기
- 구체적인 내용 작성시 본문에 포함

---

## 3. 브랜치 전략

### 기본 브랜치

- main: 배포용, 직접 커밋 금지
- dev: 개발용, 모든 기능 브랜치 PR 병합

### 브랜치 네이밍

- feature/wiki-editor
- fix/login-error
- design/album-card

### 흐름

1. dev에서 브랜치 생성
2. 작업 후 PR → 리뷰 → 병합
3. 머지 후 브랜치 삭제

---

## 4. 코드 스타일 가이드

- 파일명: 컴포넌트는 `PascalCase`, 유틸은 `camelCase`
- 폴더명: 디렉터리 폴더명은 `camelCase`, 직접적으로 바로 컴포넌트들이 들어있는 컴포넌트 폴더명은 `PascalCase`
- `console.log` 는 테스트용, commit 할 때 지우기
- asset 파일 이름은 소문자
- hook은 기능명 앞에 `use` 붙이기 (`useComment.tsx`)
- api는 뒤에 `.api` 붙이기 (`comment.api.ts`)
- `any` 사용 금지 (막아둠)

---

## 5. 환경 변수 관리

- `.env.local`: Git에 포함 ❌
- `.env.example`: 형식만 제공
- 모든 변수는 `VITE_` 접두사
- 민감한 정보는 절대 커밋 금지

---