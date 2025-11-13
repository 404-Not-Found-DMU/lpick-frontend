import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast/ToastProvider';
import { Post, Comment, convertApiCommentToUiComment } from '../../types/community.types';
import { useArticle } from '../../hooks/useArticles';
import { useArticleInteractions, useArticleManager } from '../../hooks/useArticleManager';
import { useComments, useCommentManager, useCommentInteractions } from '../../hooks';
import { useUserStore } from '@/store/userStore';

// 안정된 빈 배열 참조
const EMPTY_COMMENTS: any[] = [];

export const usePostDetail = (articleId: string) => {
  const router = useRouter();
  const { push: toast } = useToast();
  const { userInfo } = useUserStore();
  const isAuthenticated = !!userInfo;
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // 로그인 상태와 관계없이 public API 사용
  // API 훅 사용
  const {
    article,
    loading: articleLoading,
    error: articleError,
    refresh: refreshArticle
  } = useArticle(articleId);

  // Hook들을 항상 호출 (조건부 호출 금지)
  const articleInteractions = useArticleInteractions();
  const articleManager = useArticleManager();
  const commentsHook = useComments(articleId, { page: 1, size: 50 });
  const commentManager = useCommentManager();
  const commentInteractions = useCommentInteractions();

  // 로그인 상태에 따라 기능 제한
  const {
    loading: interactionLoading,
    error: interactionError,
    toggleLike,
    toggleBookmark
  } = isAuthenticated ? articleInteractions : {
    loading: false,
    error: null,
    toggleLike: async () => false,
    toggleBookmark: async () => false
  };

  const {
    loading: managerLoading,
    error: managerError,
    deleteExistingArticle
  } = isAuthenticated ? articleManager : {
    loading: false,
    error: null,
    deleteExistingArticle: async () => false
  };

  // 댓글 관련 기능들
  const {
    comments: apiComments,
    fetchComments,
    refresh: refreshComments
  } = isAuthenticated ? commentsHook : {
    comments: EMPTY_COMMENTS,
    fetchComments: async () => {},
    refresh: async () => {}
  };

  const {
    createNewComment,
    createNewReply
  } = isAuthenticated ? commentManager : {
    createNewComment: async () => false,
    createNewReply: async () => false
  };

  const {
    handleCommentLike: apiHandleCommentLike
  } = isAuthenticated ? commentInteractions : {
    handleCommentLike: async () => ({ success: false, message: 'Login required' })
  };

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
      author: article.author, // API에서 제공하는 author 필드 사용
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

  // API 댓글을 UI 댓글로 변환
  const convertedComments = useMemo(() => {
    if (!apiComments || apiComments.length === 0 || !articleId) return [];
    
    const allComments: Comment[] = [];
    
    // 부모 댓글들을 변환
    apiComments.forEach(apiComment => {
      // 삭제된 댓글은 제외
      if (apiComment.isDel === 'Y') return;
      
      const parentComment = convertApiCommentToUiComment(apiComment, articleId);
      allComments.push(parentComment);
      
      // 자식 댓글들도 변환
      if (apiComment.childsCommentList && apiComment.childsCommentList.length > 0) {
        apiComment.childsCommentList.forEach(childApiComment => {
          const childComment = convertApiCommentToUiComment(childApiComment, articleId);
          allComments.push(childComment);
        });
      }
    });
    
    return allComments;
  }, [apiComments, articleId]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !articleId || !isAuthenticated) return;
    
    // 댓글 데이터 로드 (로그인한 경우만)
    if (fetchComments) {
      fetchComments();
    }
  }, [articleId, isMounted, isAuthenticated]);

  // 변환된 댓글을 전체 댓글과 현재 댓글로 설정
  useEffect(() => {
    setAllComments(convertedComments);
    // 첫 페이지 댓글만 표시
    setComments(convertedComments.slice(0, commentsPerPage));
  }, [convertedComments, commentsPerPage]);

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

  const handleCommentSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !articleId) return;

    const success = await createNewComment(articleId, {
      comment: newComment.trim()
    });

    if (success) {
      setNewComment('');
      // 댓글 목록 새로고침
      await refreshComments();
      toast('댓글이 작성되었습니다.', 'success');
    } else {
      toast('댓글 작성에 실패했습니다. 다시 시도해주세요.', 'error');
    }
  }, [newComment, articleId, createNewComment, refreshComments, toast]);

  const handleCommentLike = useCallback(async (commentId: number): Promise<boolean> => {
    console.log('댓글 좋아요 클릭:', commentId);
    
    // UI commentId로부터 실제 API commentId 찾기
    let realCommentId: string | undefined;
    
    // 모든 API 댓글과 자식 댓글을 확인
    apiComments?.forEach(comment => {
      // 부모 댓글 확인
      const match = comment.commentId.match(/\d+/g);
      const parentUiId = match && match.length > 0 ? parseInt(match[match.length - 1]) : 0;
      
      if (parentUiId === commentId) {
        realCommentId = comment.commentId;
        return;
      }
      
      // 자식 댓글들 확인
      comment.childsCommentList?.forEach(child => {
        const childMatch = child.commentId.match(/\d+/g);
        const childUiId = childMatch && childMatch.length > 0 ? parseInt(childMatch[childMatch.length - 1]) : 0;
        
        if (childUiId === commentId) {
          realCommentId = child.commentId;
        }
      });
    });

    if (!realCommentId) {
      console.error('실제 댓글 ID를 찾을 수 없습니다:', commentId);
      console.log('사용 가능한 댓글들:', apiComments?.map(c => ({
        commentId: c.commentId,
        children: c.childsCommentList?.map(child => child.commentId)
      })));
      toast('댓글을 찾을 수 없습니다.', 'error');
      return false;
    }

    console.log('댓글 좋아요 요청:', { uiId: commentId, realId: realCommentId });
    
    // 현재 좋아요 상태 찾기
    const currentComment = convertedComments.find(c => c.id === commentId);
    const isCurrentlyLiked = currentComment?.liked || false;
    
    console.log('현재 좋아요 상태:', { 
      commentId, 
      isCurrentlyLiked, 
      currentComment: {
        id: currentComment?.id,
        likes: currentComment?.likes,
        liked: currentComment?.liked
      }
    });
    
    const result = await apiHandleCommentLike(realCommentId, isCurrentlyLiked);
    if (result.success) {
      console.log('댓글 좋아요/취소 성공');
      // 댓글 목록 새로고침
      await refreshComments();
      return true;
    } else {
      console.error('댓글 좋아요/취소 실패:', result.message);
      
      // 에러 메시지에 따라 다른 처리
      if (result.message?.includes('ALREADY_HAS_LIKE')) {
        toast('이미 좋아요를 누른 댓글입니다.', 'info');
      } else if (result.message?.includes('404')) {
        toast('댓글을 찾을 수 없습니다.', 'error');
      } else {
        toast(result.message || '댓글 좋아요에 실패했습니다. 다시 시도해주세요.', 'error');
      }
      return false;
    }
  }, [apiComments, convertedComments, apiHandleCommentLike, refreshComments, toast]);

  const handleLoadMoreComments = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const handleEdit = useCallback(() => {
    // 게시글 작성 페이지로 이동하면서 편집 모드로 설정
    router.push(`/community/write?edit=${articleId}`);
  }, [router, articleId]);

  const handleDelete = useCallback(async () => {
    if (!article) return;
    
    const confirmed = confirm('정말로 이 게시글을 삭제하시겠습니까?');
    if (!confirmed) return;
    
    const success = await deleteExistingArticle(article.articleId);
    
    if (success) {
      toast('게시글이 삭제되었습니다.', 'success');
      router.push('/community'); // 커뮤니티 목록으로 이동
    } else {
      toast(`게시글 삭제에 실패했습니다. ${managerError || ''}`, 'error');
    }
  }, [article, deleteExistingArticle, router, managerError, toast]);

  const handleReplySubmit = useCallback(async (
    parentCommentId: number, 
    replyText: string
  ): Promise<boolean> => {
    if (!replyText.trim() || !articleId) return false;

    // UI commentId로부터 실제 API commentId 찾기
    let realParentCommentId: string | undefined;
    
    // 부모 댓글의 실제 ID 찾기
    apiComments?.forEach(comment => {
      const match = comment.commentId.match(/\d+/g);
      const parentUiId = match && match.length > 0 ? parseInt(match[match.length - 1]) : 0;
      
      if (parentUiId === parentCommentId) {
        realParentCommentId = comment.commentId;
      }
    });

    if (!realParentCommentId) {
      console.error('부모 댓글 ID를 찾을 수 없습니다:', parentCommentId);
      toast('댓글을 찾을 수 없습니다.', 'error');
      return false;
    }

    console.log('답글 작성 요청:', { 
      parentUiId: parentCommentId, 
      realParentId: realParentCommentId,
      replyText 
    });

    const success = await createNewReply(articleId, realParentCommentId, {
      comment: replyText.trim()
    });

    if (success) {
      toast('답글이 작성되었습니다.', 'success');
      // 댓글 목록 새로고침
      await refreshComments();
      return true;
    } else {
      toast('답글 작성에 실패했습니다. 다시 시도해주세요.', 'error');
      return false;
    }
  }, [articleId, apiComments, createNewReply, refreshComments, toast]);

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
    handleReplySubmit,
    handleLoadMoreComments,
    handleEdit,
    handleDelete,
  };
};
