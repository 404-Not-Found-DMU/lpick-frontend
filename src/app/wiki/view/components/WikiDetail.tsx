'use client';

import { useWiki } from '../hooks/useWiki';

export const WikiDetail = () => {
  const { data, isLoading } = useWiki();

  if (isLoading) return <p>로딩 중...</p>;
  if (!data) return <p>데이터 없음</p>;

  return (
    <section>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
    </section>
  );
}
