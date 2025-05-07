// app/wiki/view/types/wiki.types.ts

export interface Wiki {
  id: number;
  title: string;
  content: string;
  createdAt: string; // ISO 형식 날짜 문자열
  updatedAt?: string; // 수정된 경우만 존재
  author: {
    id: number;
    name: string;
    profileImage?: string;
  };
  tags?: string[];
}
