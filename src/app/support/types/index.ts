export type FAQItem = {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  visibility: '모든 사용자' | '회원' | '비회원';
  popular?: boolean;
};

export type NoticeType = '공지' | '대회' | '이벤트';

export interface NoticeItem {
  id: number;
  title: string;
  summary: string;
  date: string; // YYYY-MM-DD
  type?: NoticeType;
  views?: number;
}


