import { useState, useEffect } from 'react';
import { Post, Comment } from '../../types/community.types';
import { SAMPLE_POSTS } from '../../temp/community.temp';
import { getSampleComments } from '../data/sampleComments';

export const usePostDetail = (postId: number) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // TODO: API에서 실제 데이터 가져오기
    const foundPost = SAMPLE_POSTS.find((p: Post) => p.id === postId);
    if (foundPost) {
      setPost({
        ...foundPost,
        content: foundPost.content || '게시글 내용이 없습니다.',
        comments: 12,
      });
      const allCommentsData = getSampleComments(postId);
      setAllComments(allCommentsData);
      // 첫 페이지 댓글만 표시
      setComments(allCommentsData.slice(0, commentsPerPage));
    }
    setLoading(false);
  }, [postId, isMounted, commentsPerPage]);

  // 페이지 변경시 댓글 업데이트
  useEffect(() => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    setComments(allComments.slice(0, endIndex));
  }, [currentPage, allComments, commentsPerPage]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (post) {
      setPost({
        ...post,
        likes: isLiked ? post.likes - 1 : post.likes + 1,
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.floor(Math.random() * 10000) + 1000, // 더 안정적인 ID 생성
      postId: postId,
      author: '현재사용자',
      content: newComment,
      date: '2025-01-15', // 고정된 날짜 사용 (임시)
      likes: 0,
    };

    setComments([...comments, comment]);
    setNewComment('');

    if (post) {
      setPost({ ...post, comments: post.comments + 1 });
    }
  };

  const handleCommentLike = (commentId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment,
      ),
    );
  };

  const handleLoadMoreComments = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleEdit = () => {
    console.log('게시글 수정');
  };

  const handleDelete = () => {
    console.log('게시글 삭제');
  };

  const totalPages = Math.ceil(allComments.length / commentsPerPage);
  const hasMoreComments = currentPage < totalPages;
  const remainingComments = allComments.length - comments.length;

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
    handleLike,
    handleBookmark,
    handleCommentSubmit,
    handleCommentLike,
    handleLoadMoreComments,
    handleEdit,
    handleDelete,
  };
};
