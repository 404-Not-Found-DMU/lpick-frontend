'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PostContent, CommentSection, LoadingSpinner, NotFound, Sidebar } from './components';
import { usePostDetail } from './hooks/usePostDetail';

const PostDetailPage = () => {
  const params = useParams();
  const postId = Number(params.postId);
  const [isMounted, setIsMounted] = useState(false);

  const {
    post,
    comments,
    newComment,
    setNewComment,
    isLiked,
    isBookmarked,
    loading,
    handleLike,
    handleBookmark,
    handleCommentSubmit,
    handleCommentLike,
    handleEdit,
    handleDelete,
  } = usePostDetail(postId);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 하이드레이션 에러 방지: 마운트되기 전까지는 동일한 로딩 UI 표시
  if (!isMounted || loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-500 dark:border-violet-800 dark:border-t-violet-400"></div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              게시글을 불러오는 중...
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">잠시만 기다려주세요</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      {/* 컨테이너 - 완전한 중앙 정렬 */}
      <div className="flex min-h-screen w-full justify-center px-4 py-6 sm:px-6 lg:px-8">
        {/* Instagram 스타일 레이아웃 - 반응형 */}
        <div className="flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:gap-8">
          {/* 메인 콘텐츠 영역 - 반응형 */}
          <div className="w-full max-w-2xl flex-1">
            <PostContent
              post={post}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onEdit={handleEdit}
              onDelete={handleDelete}
              canEdit={true} // TODO: 실제 권한 체크
            />

            <div className="mt-6">
              <CommentSection
                comments={comments}
                newComment={newComment}
                onCommentChange={setNewComment}
                onCommentSubmit={handleCommentSubmit}
                onCommentLike={handleCommentLike}
              />
            </div>
          </div>

          {/* 사이드바 영역 - 반응형 (모바일에서는 하단으로 이동) */}
          <div className="w-full max-w-80 lg:flex-shrink-0">
            <Sidebar post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
