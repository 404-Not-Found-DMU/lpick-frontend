import { Comment } from '../../types/community.types';

export const getSampleComments = (postId: number): Comment[] => [
  {
    id: 1,
    postId: postId,
    author: '음악애호가',
    content: '정말 좋은 정보네요! 감사합니다.',
    date: '2024-08-13',
    likes: 5,
  },
  {
    id: 2,
    postId: postId,
    author: 'LP컬렉터',
    content: '저도 비슷한 경험이 있어서 공감됩니다.',
    date: '2024-08-13',
    likes: 2,
  },
  {
    id: 3,
    postId: postId,
    author: '레코드맨',
    content:
      '@음악애호가 정말 도움이 되었다니 다행입니다! 혹시 어떤 부분이 가장 유용했는지 궁금하네요 😊',
    date: '2024-08-13',
    likes: 3,
    parentId: 1, // 음악애호가 댓글의 답글
  },
  {
    id: 4,
    postId: postId,
    author: '빈티지러버',
    content: '@LP컬렉터 저도 같은 생각이에요! 특히 턴테이블 선택 부분이 정말 유익했습니다.',
    date: '2024-08-13',
    likes: 1,
    parentId: 2, // LP컬렉터 댓글의 답글
  },
  {
    id: 5,
    postId: postId,
    author: '음악초보',
    content: '@LP컬렉터 저는 완전 초보인데 어떤 장비부터 사야할까요?',
    date: '2024-08-13',
    likes: 0,
    parentId: 2, // LP컬렉터 댓글의 두 번째 답글
  },
  {
    id: 6,
    postId: postId,
    author: '초보수집가',
    content: '처음 LP를 시작하려는 사람에게 정말 완벽한 가이드네요! 북마크 필수 ⭐',
    date: '2024-08-13',
    likes: 8,
  },
  {
    id: 7,
    postId: postId,
    author: '클래식매니아',
    content:
      '@초보수집가 맞아요! 저도 시작할 때 이런 글이 있었으면 좋았을텐데요. 요즘 좋은 정보들이 많아서 부럽습니다 😄',
    date: '2024-08-13',
    likes: 4,
    parentId: 6, // 초보수집가 댓글의 답글
  },
  {
    id: 8,
    postId: postId,
    author: '음질덕후',
    content: '가격대별 턴테이블 추천도 궁금해요! 다음에는 그 주제로도 글 써주세요 🎵',
    date: '2024-08-13',
    likes: 6,
  },
  {
    id: 9,
    postId: postId,
    author: 'LP매니아',
    content: '@음질덕후 저도 그거 궁금해요! 예산별로 정리해주시면 정말 도움될 것 같아요',
    date: '2024-08-13',
    likes: 2,
    parentId: 8, // 음질덕후 댓글의 답글
  },
  {
    id: 10,
    postId: postId,
    author: '턴테이블수리',
    content: '@음질덕후 @LP매니아 중고 시장에서 주의할 점도 함께 알려주시면 좋겠어요!',
    date: '2024-08-13',
    likes: 1,
    parentId: 8, // 음질덕후 댓글의 두 번째 답글
  },
  {
    id: 11,
    postId: postId,
    author: '재즈러버',
    content: '재즈 LP 컬렉션 하시는 분 계신가요? 추천 받고 싶어요 🎷',
    date: '2024-08-13',
    likes: 3,
  },
  {
    id: 12,
    postId: postId,
    author: '블루노트',
    content:
      '@재즈러버 Blue Note 레이블부터 시작하시는 걸 추천해요! Miles Davis, John Coltrane 명반들이 많거든요',
    date: '2024-08-13',
    likes: 5,
    parentId: 11, // 재즈러버 댓글의 답글
  },
];
