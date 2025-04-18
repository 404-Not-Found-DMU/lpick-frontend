# LPick 프론트엔드  컨벤션


## 1. 예시 폴더 구조

```
📦 frontend/
┣ 📂public/
┣ 📂src/
┃ ┣ 📂pages/
┃ ┃ ┣ 📂MainPage/
┃ ┃ ┣ 📂MyPage/
┃ ┃ ┗ 📂CommunityPage/
┃ ┃    ┗ 📂components/
┃ ┣ 📂features/
┃ ┃ ┣ 📂wiki/
┃ ┃ ┃ ┣ 📂components/
┃ ┃ ┃ ┗ 📂hooks/
┃ ┃ ┣ 📂search/
┃ ┣ 📂components/
┃ ┣ 📂hooks/
┃ ┣ 📂stores/
┃ ┣ 📂utils/
┃ ┣ 📂styles/
┃ ┣ 📂types/
┃ ┗ 📜main.tsx
┣ 📜index.html
┣ 📜vite.config.ts
┗ 📜tsconfig.json
```

---

## 2. 커밋 메시지 규칙

### 기본 형식

```
<타입>: #<이슈번호> <작업 내용 요약>

<본문>
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
- `any` 사용 시 주석으로 사용 이유 적어두기
- `console.log` 는 테스트용,
- asset 파일 이름은 소문자

---

## 5. 환경 변수 관리

- `.env.local`: Git에 포함 ❌
- `.env.example`: 형식만 제공
- 모든 변수는 `VITE_` 접두사
- 민감한 정보는 절대 커밋 금지

---