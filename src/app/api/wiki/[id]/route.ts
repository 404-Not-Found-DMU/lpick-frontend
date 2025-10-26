import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  // TODO: 실제 백엔드 연동으로 교체
  const { id } = params
  const now = new Date()
  // 테스트용 더미 데이터: /wiki/test-lp 에서 풍부한 콘텐츠 확인
  if (id === 'test-lp') {
    const demo = {
      id,
      category: 'lp',
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      coverImage: '/lplayer/temp/images/album1.png',
      releaseDate: '1973-03-01',
      label: 'Harvest Records',
      genres: ['Progressive Rock', 'Psychedelic Rock'],
      content: `## 개요
1973년에 발매된 Pink Floyd의 스튜디오 앨범.

### 상업적 성과
전 세계 판매량 4,500만 장 이상으로 알려져 있다.

## 트랙리스트
| # | 제목 | 길이 |
|---|------|------|
| 1 | Speak to Me | 1:30 |
| 2 | Breathe | 2:43 |
| 3 | Time | 6:53 |

## 장비(Equipment)
> 밴드가 사용한 대표 장비 목록.

- EMS VCS3
- Minimoog Model D

### 코드 예시
\`\`\`js
function money() {
  return 'Money!';
}
\`\`\`

## 관련 이미지
![앨범 커버](/lplayer/temp/images/album1.png)

## 참고 문서
- [/wiki/pink-floyd](내부 링크)
- https://en.wikipedia.org/wiki/The_Dark_Side_of_the_Moon
`,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      author: { id: 1, name: 'LPick' },
      tags: ['wiki', 'album'],
      views: 52342,
      contributors: 12,
      relatedPages: [
        { title: 'Pink Floyd', slug: 'pink-floyd' },
        { title: 'Progressive Rock', slug: 'progressive-rock' },
      ],
      bookmarks: 87,
      recent: [
        { title: 'Miles Davis - Kind of Blue', slug: 'miles-davis-kind-of-blue', updatedAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString() },
        { title: 'Technics SL-1200MK7', slug: 'technics-sl-1200mk7', updatedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
        { title: 'The Beatles - Abbey Road', slug: 'the-beatles-abbey-road', updatedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() },
      ],
    }
    return NextResponse.json(demo)
  }

  const data = {
    id,
    title: `문서 ${id}`,
    content: `문서 ${id}의 내용입니다.`,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    author: { id: 1, name: 'LPick' },
    tags: ['wiki'],
    views: 1245,
    contributors: 24,
    relatedPages: [
      { title: '관련 문서 A', slug: 'related-a' },
      { title: '관련 문서 B', slug: 'related-b' },
    ],
    bookmarks: 12,
    recent: [
      { title: 'Miles Davis - Kind of Blue', slug: 'miles-davis-kind-of-blue', updatedAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString() },
      { title: 'Technics SL-1200MK7', slug: 'technics-sl-1200mk7', updatedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
      { title: 'The Beatles - Abbey Road', slug: 'the-beatles-abbey-road', updatedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() },
    ],
  }
  return NextResponse.json(data)
}


