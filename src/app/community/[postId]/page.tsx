'use client';

import { useParams } from 'next/navigation';
import { PostContent, CommentSection, LoadingSpinner, NotFound, Sidebar } from './components';
import { usePostDetail } from './hooks/usePostDetail';

const PostDetailPage = () => {
  const params = useParams();
  const postId = Number(params.postId);

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

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/30">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/30">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/30">
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
