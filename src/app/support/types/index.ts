export type FAQItem = {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  visibility: '모든 사용자' | '회원' | '비회원';
  popular?: boolean;
};


