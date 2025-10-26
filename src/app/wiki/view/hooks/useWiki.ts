import { useEffect, useState } from 'react';
import { Wiki } from '../types/wiki.types';

export const useWiki = () => {
  const [data, setData] = useState<Wiki | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const id = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : undefined;
    if (!id) return;
    fetch(`/api/wiki/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { data, isLoading };
};
