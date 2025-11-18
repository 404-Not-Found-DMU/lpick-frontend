'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UniversalWikiEditor } from '../../components/UniversalWikiEditor';
import type { WikiCategory, TextBlock, CategoryData } from '@/types/hierarchical.editor.types';
import { fetcher } from '@/hooks/api/fetchers';
import { createWikiRevision } from '@/hooks/api/wiki.api';

type WikiContent = { textBlocks: TextBlock[]; categoryData: CategoryData };
type WikiDetail = { wikiId: string; title: string; content: WikiContent; modifiedAt?: string | null };

export default function EditExistingWikiPage() {
  const params = useParams() as { category?: string; id?: string };
  const router = useRouter();

  const category = (params.category as WikiCategory) || 'other';
  const wikiId = params.id as string | undefined;

  const [data, setData] = useState<WikiDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isValidCategory = useMemo(
    () => ['lp', 'artist', 'equipment', 'other'].includes(category),
    [category]
  );

  useEffect(() => {
    let active = true;
    async function run() {
      if (!wikiId) return;
      try {
        setLoading(true);
        const res = await fetcher<WikiDetail>(`/api/v1/public/wiki/${encodeURIComponent(wikiId)}`);
        if (active) setData(res);
      } catch {
        if (active) setError('문서를 불러오지 못했습니다.');
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => {
      active = false;
    };
  }, [wikiId]);

  if (!isValidCategory) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">잘못된 카테고리</h1>
          <p className="text-gray-600">유효하지 않은 위키 카테고리입니다.</p>
        </div>
      </div>
    );
  }

  if (!wikiId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">잘못된 경로</h1>
          <p className="text-gray-600">문서 ID가 없습니다.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-sm text-muted-foreground">로딩 중...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">문서 로드 실패</h1>
          <p className="text-gray-600">문서를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  const initialData = data?.content
    ? {
        categoryData: data.content.categoryData,
        textBlocks: data.content.textBlocks,
      }
    : undefined;

  return (
    <div className="flex-1">
      <UniversalWikiEditor
        category={category}
        initialData={initialData}
        onSave={async ({ categoryData, textBlocks }) => {
          try {
            await createWikiRevision(wikiId, {
              content: { categoryData, textBlocks },
            });

            router.push(`/wiki/${category}/${encodeURIComponent(wikiId)}`);
          } catch (e) {
            console.error('위키 수정 실패:', e);
            alert('위키 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
          }
        }}
      />
    </div>
  );
}


