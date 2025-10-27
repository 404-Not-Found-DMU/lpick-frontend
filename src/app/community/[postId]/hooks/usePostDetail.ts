import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Post, Comment } from '../../types/community.types';
import { useArticle } from '../../hooks/useArticles';
import { useArticleInteractions, useArticleManager } from '../../hooks/useArticleManager';
import { getSampleComments } from '../data/sampleComments';

export const usePostDetail = (articleId: string) => {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // API 훅 사용
  const {
    article,
    loading: articleLoading,
    error: articleError,
    refresh: refreshArticle
  } = useArticle(articleId);

  const {
    loading: interactionLoading,
    error: interactionError,
    toggleLike,
    toggleBookmark
  } = useArticleInteractions();

  const {
    loading: managerLoading,
    error: managerError,
    updateExistingArticle,
    deleteExistingArticle
  } = useArticleManager();

  // 게시글 데이터를 Post 형태로 변환
  const post: Post | null = useMemo(() => {
    if (!article) return null;

    // ISO 날짜를 YYYY-MM-DD 형식으로 변환
    const formatDate = (isoString: string) => {
      try {
        return new Date(isoString).toISOString().split('T')[0];
      } catch {
        return isoString; // 파싱 실패 시 원본 반환
      }
    };

    // articleId에서 고유한 숫자 ID 생성 (해시 기반)
    const generateNumericId = (articleId: string) => {
      let hash = 0;
      for (let i = 0; i < articleId.length; i++) {
        const char = articleId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 32비트 정수로 변환
      }
      return Math.abs(hash);
    };

    return {
      id: generateNumericId(article.articleId),
      articleId: article.articleId,
      title: article.title,
      content: article.content,
      author: article.oauthId, // Post 타입에서는 string
      oauthId: article.oauthId,
      date: formatDate(article.createdAt),
      board: '자유게시판', // 기본값, 실제로는 게시판 정보 필요
      tag: undefined, // 태그 정보 필요
      likes: article.likeCount,
      likeCount: article.likeCount,
      comments: article.commentCount,
      commentCount: article.commentCount,
      bookmarkCount: article.bookmarkCount,
      liked: article.liked,
      bookmarked: article.bookmarked,
      views: 0, // 조회수 정보 필요
      image: '', // 이미지 정보 필요
    };
  }, [article]);

  const isLiked = article?.liked || false;
  const isBookmarked = article?.bookmarked || false;
  const loading = articleLoading || interactionLoading || managerLoading;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !article) return;

    // TODO: 댓글 API 연동 필요 - 현재는 임시 데이터 사용
    const allCommentsData = getSampleComments(parseInt(articleId) || 0);
    setAllComments(allCommentsData);
    // 첫 페이지 댓글만 표시
    setComments(allCommentsData.slice(0, commentsPerPage));
  }, [articleId, isMounted, article, commentsPerPage]);

  // 페이지 변경시 댓글 업데이트
  useEffect(() => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    setComments(allComments.slice(0, endIndex));
  }, [currentPage, allComments, commentsPerPage]);

  const handleLike = useCallback(async () => {
    if (!article) return;
    
    const success = await toggleLike(article.articleId, isLiked);
    if (success) {
      refreshArticle(); // 게시글 데이터 새로고침
    }
  }, [article, isLiked, toggleLike, refreshArticle]);

  const handleBookmark = useCallback(async () => {
    if (!article) return;
    
    const success = await toggleBookmark(article.articleId, isBookmarked);
    if (success) {
      refreshArticle(); // 게시글 데이터 새로고침
    }
  }, [article, isBookmarked, toggleBookmark, refreshArticle]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // TODO: 댓글 생성 API 연동 필요
    const comment: Comment = {
      id: Math.floor(Math.random() * 10000) + 1000,
      postId: parseInt(articleId) || 0,
      author: '현재사용자',
      content: newComment,
      date: '2025-01-15',
      likes: 0,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleCommentLike = (commentId: number) => {
    // TODO: 댓글 좋아요 API 연동 필요
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment,
      ),
    );
  };

  const handleLoadMoreComments = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleEdit = useCallback(async () => {
    if (!article) return;
    
    // TODO: 게시글 수정 모달/페이지로 이동하거나 인라인 편집 구현
    // 현재는 간단한 prompt로 제목만 수정
    const newTitle = prompt('새 제목을 입력하세요:', article.title);
    if (!newTitle || newTitle === article.title) return;
    
    const success = await updateExistingArticle(article.articleId, {
      title: newTitle,
      content: article.content
    });
    
    if (success) {
      alert('게시글이 수정되었습니다.');
      refreshArticle(); // 데이터 새로고침
    } else {
      alert(`게시글 수정에 실패했습니다. ${managerError || ''}`);
    }
  }, [article, updateExistingArticle, refreshArticle, managerError]);

  const handleDelete = useCallback(async () => {
    if (!article) return;
    
    const confirmed = confirm('정말로 이 게시글을 삭제하시겠습니까?');
    if (!confirmed) return;
    
    const success = await deleteExistingArticle(article.articleId);
    
    if (success) {
      alert('게시글이 삭제되었습니다.');
      router.push('/community'); // 커뮤니티 목록으로 이동
    } else {
      alert(`게시글 삭제에 실패했습니다. ${managerError || ''}`);
    }
  }, [article, deleteExistingArticle, router, managerError]);

  const totalPages = Math.ceil(allComments.length / commentsPerPage);
  const hasMoreComments = currentPage < totalPages;
  const remainingComments = allComments.length - comments.length;

  // 에러 처리
  const error = articleError || interactionError || managerError;

  return {
    post,
    comments,
    allComments,
    currentPage,
    commentsPerPage,
    totalPages,
    hasMoreComments,
    remainingComments,
    newComment,
    setNewComment,
    isLiked,
    isBookmarked,
    loading,
    error,
    handleLike,
    handleBookmark,
    handleCommentSubmit,
    handleCommentLike,
    handleLoadMoreComments,
    handleEdit,
    handleDelete,
  };
};
