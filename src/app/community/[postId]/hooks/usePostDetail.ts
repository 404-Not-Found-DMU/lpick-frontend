import { useState, useEffect } from 'react';
import { Post, Comment } from '../../types/community.types';
import { SAMPLE_POSTS } from '../../temp/community.temp';
import { getSampleComments } from '../data/sampleComments';

export const usePostDetail = (postId: number) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 실제 데이터 가져오기
    const foundPost = SAMPLE_POSTS.find((p: Post) => p.id === postId);
    if (foundPost) {
      setPost({
        ...foundPost,
        content: foundPost.content || '게시글 내용이 없습니다.',
        comments: 12,
      });
      setComments(getSampleComments(postId));
    }
    setLoading(false);
  }, [postId]);

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
      id: Date.now(),
      postId: postId,
      author: '현재사용자',
      content: newComment,
      date: new Date().toISOString().split('T')[0],
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

  const handleEdit = () => {
    console.log('게시글 수정');
  };

  const handleDelete = () => {
    console.log('게시글 삭제');
  };

  return {
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
  };
};
