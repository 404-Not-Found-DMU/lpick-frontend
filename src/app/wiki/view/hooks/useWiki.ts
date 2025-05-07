import { useEffect, useState } from 'react';
import { Wiki } from '../types/wiki.types';

export function useWiki() {
  const [data, setData] = useState<Wiki | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/wiki/view/api') // 상대경로 API 호출
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  return { data, isLoading };
}
