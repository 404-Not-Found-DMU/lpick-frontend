'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Post, Comment } from '../types/community.types';
import { SAMPLE_POSTS } from '../temp/community.temp';
import { PostHeader, PostContent, CommentSection, LoadingSpinner, NotFound } from './components';

const PostDetailPage = () => {
  const params = useParams();
  const postId = Number(params.postId);

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
      });

      // 샘플 댓글 데이터
      setComments([
        {
          id: 1,
          postId: postId,
          author: '음악애호가',
          content: '정말 좋은 정보네요! 감사합니다.',
          date: '2024-08-13',
          likes: 5,
        },
        {
          id: 2,
          postId: postId,
          author: 'LP컬렉터',
          content: '저도 비슷한 경험이 있어서 공감됩니다.',
          date: '2024-08-13',
          likes: 2,
        },
      ]);
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
      author: '현재사용자', // TODO: 실제 사용자 정보
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
    };

    setComments([...comments, comment]);
    setNewComment('');

    // 게시글 댓글 수 업데이트
    if (post) {
      setPost({ ...post, comments: post.comments + 1 });
    }
  };

  const handleShare = () => {
    // TODO: 공유 기능 구현
    console.log('공유하기');
  };

  const handleReport = () => {
    // TODO: 신고 기능 구현
    console.log('신고하기');
  };

  const handleEdit = () => {
    // TODO: 수정 기능 구현
    console.log('게시글 수정');
  };

  const handleDelete = () => {
    // TODO: 삭제 기능 구현
    console.log('게시글 삭제');
  };

  const handleCommentLike = (commentId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment,
      ),
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <PostHeader onShare={handleShare} onReport={handleReport} />

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

      <CommentSection
        comments={comments}
        newComment={newComment}
        onCommentChange={setNewComment}
        onCommentSubmit={handleCommentSubmit}
        onCommentLike={handleCommentLike}
      />
    </div>
  );
};

export default PostDetailPage;
