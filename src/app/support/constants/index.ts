import type { FAQItem } from '../types';

export const QUICK_ACTIONS = [
  {
    id: 'faq',
    label: '자주 묻는 질문',
    desc: '가장 많이 문의하는 내용들을 확인해 보세요',
    icon: 'HelpCircle',
    accent: 'violet',
  },
  {
    id: 'qna',
    label: '1:1 문의',
    desc: '개별 문의사항을 남겨주시면 빠르게 답변드립니다',
    icon: 'MessageCircle',
    accent: 'violet',
  },
  {
    id: 'guide',
    label: '이용 가이드',
    desc: 'LPick 서비스 이용 방법을 상세히 안내합니다',
    icon: 'BookOpen',
    accent: 'violet',
  },
  {
    id: 'expert',
    label: '전문가 등록 신청',
    desc: '음향 전문가 인증을 받아보세요',
    icon: 'ShieldCheck',
    accent: 'amber',
  },
] as const;

export const CONTACT_CARDS = [
  { id: 'phone', title: '전화 문의', value: '1588-1234', desc: '평일 09:00 - 18:00' },
  { id: 'email', title: '이메일 문의', value: 'support@lpick.com', desc: '24시간 접수 가능' },
  { id: 'hours', title: '운영 시간', value: '평일 09:00 - 18:00', desc: '주말 및 공휴일 휴무' },
] as const;

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'FAQ-001',
    title: 'LPick은 어떤 서비스인가요?',
    excerpt:
      'LPick는 LP(바이닐 레코드) 애호가들을 위한 종합 플랫폼으로, 음반 정보 위키, 커뮤니티, 음악 플레이어 기능을 제공합니다.',
    tags: ['서비스 소개', '기본 이용'],
    visibility: '모든 사용자',
    popular: true,
  },
  {
    id: 'FAQ-002',
    title: '회원가입 없이도 서비스를 이용할 수 있나요?',
    excerpt:
      '일부 공개 콘텐츠는 비회원도 열람 가능합니다. 커뮤니티 참여와 개인 컬렉션 관리는 회원가입이 필요합니다.',
    tags: ['서비스 이용', '회원가입'],
    visibility: '비회원',
    popular: true,
  },
  {
    id: 'FAQ-003',
    title: '음반을 어떻게 검색할 수 있나요?',
    excerpt:
      '앨범 사진이나 QR 코드로 검색하거나, 아티스트/앨범명으로 텍스트 검색이 가능합니다.',
    tags: ['음반/워키', '음반 검색'],
    visibility: '모든 사용자',
  },
  {
    id: 'FAQ-004',
    title: '위키 정보를 수정하려면 어떻게 해야 하나요?',
    excerpt:
      '전문가 인증을 받은 사용자만 포인트 제한 없이 편집 가능합니다. 일반 사용자는 제안 기능으로 참여할 수 있습니다.',
    tags: ['편집/기여', '위키 업데이트'],
    visibility: '회원',
  },
  {
    id: 'FAQ-005',
    title: '커뮤니티에 글을 작성하려면 어떻게 해야 하나요?',
    excerpt:
      '회원가입 후 커뮤니티 페이지에서 자유롭게 글을 작성할 수 있습니다. 음반 리뷰, 장비 추천, 질문 등 다양한 주제를 소통해보세요.',
    tags: ['커뮤니티', '게시글 작성'],
    visibility: '회원',
  },
];


