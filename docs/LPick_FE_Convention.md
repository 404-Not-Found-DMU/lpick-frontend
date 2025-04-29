# LPick 프론트엔드 코드 컨벤션
## 1. 폴더 구조 예시
```
📦src
 ┣ 📂assets
 ┃ ┗ 📜lpick-icon.svg
 ┣ 📂components
 ┃ ┣ 📂Button
 ┃ ┣ 📂Input
 ┃ ┗ 📂Modal
 ┣ 📂hooks
 ┃ ┗ 📜useApi.ts
 ┣ 📂modules
 ┃ ┗ 📂comment
 ┃     ┗ 📂feature
 ┣ 📂app
 ┃ ┣ 📂(main)
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(lplayer)
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(wiki)
 ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂view
 ┃ ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┗ 📜layout.tsx
 ┣ 📂store
 ┣ 📂styles
 ┃ ┣ 📜global.css
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┗ 📜user.types.ts
 ┣ 📂utils
 ┃ ┗ 📜formatDate.ts
 ┗ 📜env.d.ts
```

## 2. 커밋 메시지 규칙
**기본 형식**
```
<타입>: #<이슈번호> <작업 내용 요약>

(선택 - 본문)
```

**자주 사용하는 타입**
| 타입 | 설명 |
|:---|:---|
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| design | UI/스타일 수정 |
| style | 코드 포맷팅/스타일 수정 (기능 변화 없음) |
| refactor | 리팩터링 (기능 변화 없음) |
| test | 테스트 코드 추가 |
| docs | 문서 수정 |
| chore | 빌드 설정/패키지/기타 잡일 |
| build | 빌드 설정 변경 |
| ci | CI 설정 변경 |
| perf | 성능 개선 |
| rename | 파일/폴더명 변경 |
| remove | 파일/폴더 삭제 |

**규칙**
- 메시지는 **한글**로 작성
- **하나의 목적만** 담기
- 세부 내용은 필요 시 본문에 작성

## 3. 브랜치 전략
**기본 브랜치**
- `main`: 배포용 (직접 커밋 금지)
- `dev`: 개발용 (모든 기능 브랜치 PR 병합)

**브랜치 네이밍**
| 분류 | 예시 |
|:---|:---|
| 기능 개발 | `feature/wiki-editor` |
| 버그 수정 | `fix/login-error` |
| 디자인 수정 | `design/album-card` |

**작업 흐름**
1. `dev`에서 브랜치 생성
2. 작업 후 PR 작성 → 리뷰 → dev에 병합
3. 병합 후 브랜치 삭제

## 4. 코드 스타일 가이드
| 항목 | 규칙 |
|:---|:---|
| 파일명 | 컴포넌트: PascalCase, 유틸/훅: camelCase |
| 폴더명 | 디렉터리: camelCase, 컴포넌트 폴더: PascalCase |
| console.log | 테스트용만 허용, 커밋 전 제거 |
| asset 파일 이름 | 소문자 사용 |
| 훅 파일명 | use 접두어 필수 (ex: `useComment.ts`) |
| API 파일명 | .api.ts 접미어 (ex: `comment.api.ts`) |
| 타입 파일명 | .types.ts 접미어 (ex: `user.types.ts`) |
| any 사용 | 금지 |
| 환경 변수 타입 | `env.d.ts` 파일로 관리 |

## 5. 환경 변수 관리
| 항목 | 규칙 |
|:---|:---|
| `.env.local` | Git에 커밋 ❌ |
| `.env.example` | 포맷만 제공 |
| 변수명 | NEXT_PUBLIC_ 접두사 사용 |
| 민감한 값 | 절대 커밋 금지 |

> 예시: `NEXT_PUBLIC_API_URL=https://api.example.com`
