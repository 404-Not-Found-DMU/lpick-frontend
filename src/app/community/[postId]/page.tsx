'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { PostContent, CommentSection, NotFound, Sidebar } from './components';
import { usePostDetail } from './hooks/usePostDetail';
import { useUserStore } from '@/store/userStore';

const PostDetailPage = () => {
  const params = useParams();
  const articleId = params.postId as string; // URL의 postId를 articleId로 사용
  const [isMounted, setIsMounted] = useState(false);
  
  // 로컬 상태로 좋아요/북마크 상태 관리 (optimistic update)
  const [localIsLiked, setLocalIsLiked] = useState(false);
  const [localIsBookmarked, setLocalIsBookmarked] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // 사용자 정보 가져오기
  const { userInfo } = useUserStore();

  const {
    post,
    comments,
    hasMoreComments,
    remainingComments,
    newComment,
    setNewComment,
    isLiked: serverIsLiked,
    isBookmarked: serverIsBookmarked,
    error,
    handleLike: serverHandleLike,
    handleBookmark: serverHandleBookmark,
    handleCommentSubmit,
    handleCommentLike,
    handleReplySubmit,
    handleLoadMoreComments,
    handleEdit,
    handleDelete,
  } = usePostDetail(articleId);

  // 수정/삭제 권한 체크
  const canEdit = useMemo(() => {
    if (!post || !userInfo) return false;
    // 게시글 작성자와 현재 로그인한 사용자가 같은지 확인
    return post.oauthId === userInfo.oauthId;
  }, [post, userInfo]);

  // 서버 상태가 변경되면 로컬 상태도 동기화 (초기에만)
  const [hasInitialized, setHasInitialized] = useState(false);
  
  useEffect(() => {
    if (!hasInitialized && (serverIsLiked !== undefined && serverIsBookmarked !== undefined)) {
      setLocalIsLiked(serverIsLiked);
      setLocalIsBookmarked(serverIsBookmarked);
      setHasInitialized(true);
      setIsInitialLoading(false); // 초기 로딩 완료
    }
  }, [serverIsLiked, serverIsBookmarked, hasInitialized]);

  // 완전히 독립적인 좋아요 핸들러 (서버 상태와 무관)
  const handleOptimisticLike = useCallback(async () => {
    if (!userInfo) {
      // 로그인하지 않은 경우 로그인 페이지로 이동하거나 안내 메시지
      return;
    }
    
    // 즉시 UI 업데이트
    const newLikedState = !localIsLiked;
    setLocalIsLiked(newLikedState);
    
    // 백그라운드에서 실제 API 호출 (UI와 독립적)
    try {
      await serverHandleLike();
      console.log('좋아요 API 성공');
    } catch (error) {
      console.error('좋아요 API 실패:', error);
      // 실패해도 UI는 그대로 유지
    }
  }, [userInfo, localIsLiked, serverHandleLike]);

  // 완전히 독립적인 북마크 핸들러 (서버 상태와 무관)
  const handleOptimisticBookmark = useCallback(async () => {
    if (!userInfo) {
      // 로그인하지 않은 경우 로그인 페이지로 이동하거나 안내 메시지
      return;
    }
    
    // 즉시 UI 업데이트
    const newBookmarkedState = !localIsBookmarked;
    setLocalIsBookmarked(newBookmarkedState);
    
    // 백그라운드에서 실제 API 호출 (UI와 독립적)
    try {
      await serverHandleBookmark();
      console.log('북마크 API 성공');
    } catch (error) {
      console.error('북마크 API 실패:', error);
      // 실패해도 UI는 그대로 유지
    }
  }, [userInfo, localIsBookmarked, serverHandleBookmark]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 마운트되기 전과 초기 로딩만 로딩 UI 표시
  if (!isMounted || isInitialLoading) {
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

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">
              게시글을 불러올 수 없습니다
            </h3>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
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
      <div className="flex min-h-screen w-full justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="w-full max-w-2xl flex-1">
            <PostContent
              post={post}
              isLiked={localIsLiked}
              isBookmarked={localIsBookmarked}
              onLike={handleOptimisticLike}
              onBookmark={handleOptimisticBookmark}
              onEdit={handleEdit}
              onDelete={handleDelete}
              canEdit={canEdit} // 실제 권한 체크
            />

            <div className="mt-6">
              <CommentSection
                comments={comments}
                hasMoreComments={hasMoreComments}
                remainingComments={remainingComments}
                newComment={newComment}
                onCommentChange={setNewComment}
                onCommentSubmit={handleCommentSubmit}
                onCommentLike={handleCommentLike}
                onReply={handleReplySubmit}
                onLoadMore={handleLoadMoreComments}
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
