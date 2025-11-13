// import { NextResponse } from 'next/server'

// function blocksToMarkdown(blocks: Array<{ id: string; title: string; content: string; depth: 1 | 2 | 3 }>): string {
//   return blocks
//     .map((b) => {
//       const hashes = b.depth === 1 ? '##' : b.depth === 2 ? '###' : '####'
//       return `${hashes} ${b.title}\n\n${b.content}`
//     })
//     .join('\n\n')
// }

// export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
//   // TODO: 실제 백엔드 연동으로 교체
//   const { id } = await params
//   const now = new Date()
//   // 카테고리별 위키 더미 데이터 4종
//   // 1) LP 문서: /wiki/lp-dark-side-of-the-moon (또는 기존 test-lp 호환)
//   if (id === 'test-lp' || id === 'lp-pink-floyd-dark-side-of-the-moon' || id === 'lp-dark-side-of-the-moon') {
//     const lp = dummyLPData
//     const info = lp.categoryData.data.infobox
//     const markdown = `# ${info.title}\n\n${blocksToMarkdown(lp.textBlocks)}`
//     const data = {
//       id,
//       category: 'lp' as const,
//       title: info.title,
//       artist: info.artist,
//       coverImage: info.coverUrl,
//       releaseDate: info.releaseDate,
//       label: info.label,
//       genres: [info.genre],
//       content: markdown,
//       createdAt: now.toISOString(),
//       updatedAt: now.toISOString(),
//       author: { id: 1, name: 'LPick' },
//       tags: ['wiki', 'lp'],
//       views: 52342,
//       contributors: 12,
//       relatedPages: [
//         { title: info.artist, slug: info.artist.toLowerCase().replace(/\s+/g, '-') },
//         { title: info.genre, slug: info.genre.toLowerCase().replace(/\s+/g, '-') },
//       ],
//       bookmarks: 87,
//       recent: [
//         { title: 'Miles Davis - Kind of Blue', slug: 'miles-davis-kind-of-blue', updatedAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString() },
//         { title: 'Technics SL-1200MK7', slug: 'technics-sl-1200mk7', updatedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
//         { title: 'The Beatles - Abbey Road', slug: 'the-beatles-abbey-road', updatedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() },
//       ],
//     }
//     return NextResponse.json(data)
//   }

//   // 2) 아티스트 문서: /wiki/artist-david-bowie
//   if (id === 'artist-david-bowie') {
//     const artist = dummyArtistData
//     const a = artist.categoryData.data
//     const header = `# ${a.name}`
//     const baseInfo = `- 국가: ${a.country}\n- 활동 기간: ${a.activePeriod}\n- 역할: ${a.roles.join(', ')}`
//     const discography = a.discography
//       .map((d) => `- ${d.title} (${d.releaseDate}) • ${d.type} • ${d.role}`)
//       .join('\n')
//     const activities = a.activities
//       .map((ac) => `- ${ac.year} • ${ac.title} — ${ac.description}`)
//       .join('\n')
//     const markdown = [
//       header,
//       '## 기본 정보',
//       baseInfo,
//       '## 디스코그래피',
//       discography,
//       '## 활동 이력',
//       activities,
//       blocksToMarkdown(artist.textBlocks),
//     ].join('\n\n')
//     const data = {
//       id,
//       category: 'artist' as const,
//       title: a.name,
//       coverImage: a.imageUrl,
//       content: markdown,
//       createdAt: now.toISOString(),
//       updatedAt: now.toISOString(),
//       author: { id: 2, name: 'Editor' },
//       tags: ['wiki', 'artist'],
//       views: 18420,
//       contributors: 7,
//       relatedPages: [
//         { title: 'Glam Rock', slug: 'glam-rock' },
//         { title: 'Heroes', slug: 'heroes-1977' },
//       ],
//       bookmarks: 54,
//       recent: [
//         { title: 'Kraftwerk', slug: 'kraftwerk', updatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() },
//         { title: 'Brian Eno', slug: 'brian-eno', updatedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString() },
//       ],
//     }
//     return NextResponse.json(data)
//   }

//   // 3) 장비 문서: /wiki/equipment-fender-stratocaster
//   if (id === 'equipment-fender-stratocaster') {
//     const eq = dummyEquipmentData
//     const e = eq.categoryData.data
//     const header = `# ${e.name}`
//     const baseInfo = `- 브랜드: ${e.brand}\n- 출시년도: ${e.releaseYear}\n- 분류: ${e.equipmentType}`
//     const description = e.description
//     const markdown = [
//       header,
//       '## 기본 정보',
//       baseInfo,
//       '## 설명',
//       description,
//       blocksToMarkdown(eq.textBlocks),
//     ].join('\n\n')
//     const data = {
//       id,
//       category: 'equipment' as const,
//       title: e.name,
//       coverImage: e.imageUrl,
//       content: markdown,
//       createdAt: now.toISOString(),
//       updatedAt: now.toISOString(),
//       author: { id: 3, name: 'Curator' },
//       tags: ['wiki', 'equipment'],
//       views: 9320,
//       contributors: 5,
//       relatedPages: [
//         { title: 'Fender', slug: 'fender' },
//         { title: 'Electric Guitar', slug: 'electric-guitar' },
//       ],
//       bookmarks: 21,
//       recent: [
//         { title: 'Gibson Les Paul', slug: 'gibson-les-paul', updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString() },
//         { title: 'Fender Telecaster', slug: 'fender-telecaster', updatedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString() },
//       ],
//     }
//     return NextResponse.json(data)
//   }

//   // 4) 기타 문서: /wiki/other-rock-music-history
//   if (id === 'other-rock-music-history') {
//     const other = dummyOtherData
//     const o = other.categoryData.data
//     const header = `# ${o.title}`
//     const markdown = [header, o.content, blocksToMarkdown(other.textBlocks)].join('\n\n')
//     const data = {
//       id,
//       category: 'other' as const,
//       title: o.title,
//       content: markdown,
//       createdAt: now.toISOString(),
//       updatedAt: now.toISOString(),
//       author: { id: 4, name: 'LPick' },
//       tags: ['wiki', 'history'],
//       views: 12003,
//       contributors: 3,
//       relatedPages: [
//         { title: '블루스', slug: 'blues' },
//         { title: '컨트리', slug: 'country' },
//       ],
//       bookmarks: 13,
//       recent: [
//         { title: 'Psychedelic Rock', slug: 'psychedelic-rock', updatedAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString() },
//         { title: 'Hard Rock', slug: 'hard-rock', updatedAt: new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString() },
//       ],
//     }
//     return NextResponse.json(data)
//   }

//   const data = {
//     id,
//     title: `문서 ${id}`,
//     content: `문서 ${id}의 내용입니다.`,
//     createdAt: now.toISOString(),
//     updatedAt: now.toISOString(),
//     author: { id: 1, name: 'LPick' },
//     tags: ['wiki'],
//     views: 1245,
//     contributors: 24,
//     relatedPages: [
//       { title: '관련 문서 A', slug: 'related-a' },
//       { title: '관련 문서 B', slug: 'related-b' },
//     ],
//     bookmarks: 12,
//     recent: [
//       { title: 'Miles Davis - Kind of Blue', slug: 'miles-davis-kind-of-blue', updatedAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString() },
//       { title: 'Technics SL-1200MK7', slug: 'technics-sl-1200mk7', updatedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
//       { title: 'The Beatles - Abbey Road', slug: 'the-beatles-abbey-road', updatedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() },
//     ],
//   }
//   return NextResponse.json(data)
// }


