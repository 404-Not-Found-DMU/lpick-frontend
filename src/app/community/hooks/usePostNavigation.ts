import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * 게시물 네비게이션 관련 훅
 */
export const usePostNavigation = () => {
  const router = useRouter();

  const navigateToPost = useCallback(
    (postId: number) => {
      router.push(`/community/${postId}`);
    },
    [router],
  );

  const navigateToWrite = useCallback(() => {
    router.push('/community/write');
  }, [router]);

  return {
    navigateToPost,
    navigateToWrite,
  };
};
