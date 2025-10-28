import { useState, useEffect } from 'react';
import { Heart, Reply, MoreHorizontal } from 'lucide-react';
import { Comment } from '../../types/community.types';

interface CommentItemProps {
  comment: Comment;
  onLike: (commentId: number) => Promise<boolean>;
  onReply: (commentId: number, replyText: string) => Promise<boolean>;
  isReply?: boolean;
}

// @멘션을 파싱하여 스타일링하는 함수
const renderContentWithMentions = (content: string) => {
  const mentionRegex = /@([^\s@]+)/g;
  const parts = content.split(mentionRegex);

  return parts.map((part, index) => {
    // 홀수 인덱스는 멘션된 사용자명
    if (index % 2 === 1) {
      return (
        <span
          key={index}
          className="cursor-pointer font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          @{part}
        </span>
      );
    }
    return part;
  });
};

export const CommentItem = ({ comment, onLike, onReply, isReply = false }: CommentItemProps) => {
  const [isLiked, setIsLiked] = useState(comment.liked || false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // 댓글 데이터가 변경될 때 좋아요 상태 동기화
  useEffect(() => {
    setIsLiked(comment.liked || false);
  }, [comment.liked]);

  const handleLike = async () => {
    if (isLikeLoading) return;
    
    setIsLikeLoading(true);
    
    try {
      const success = await onLike(comment.id);
      // API 호출이 성공했을 때는 새로고침을 기다림 (useEffect에서 처리)
      if (!success) {
        // 실패한 경우에만 로그 출력
        console.log('Like action failed');
      }
    } catch (error) {
      // 에러는 이미 onLike에서 처리됨
      console.error('Like error:', error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const success = await onReply(comment.id, replyText.trim());
    if (success) {
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className={`${isReply ? '' : ''}`}>
      <div
        className={`group p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30 ${
          isReply ? 'bg-gray-25 pl-6 dark:bg-gray-800/30' : ''
        }`}
      >
        <div className="flex gap-3">
          {/* 프로필 아바타 */}
          <div
            className={`flex flex-shrink-0 items-center justify-center rounded-full font-bold text-white ${
              isReply
                ? 'h-7 w-7 bg-gradient-to-r from-emerald-500 to-teal-500 text-xs'
                : 'h-9 w-9 bg-gradient-to-r from-blue-500 to-cyan-500 text-sm'
            }`}
          >
            {comment.author.charAt(0)}
          </div>

          <div className="min-w-0 flex-1">
            {/* 댓글 헤더 */}
            <div className="mb-1 flex items-center gap-2">
              <span
                className={`font-semibold text-gray-900 dark:text-white ${
                  isReply ? 'text-sm' : 'text-sm'
                }`}
              >
                {comment.author}
              </span>
              {isReply && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  답글
                </span>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
              {!isReply && (
                <button className="rounded-full p-1 opacity-0 transition-opacity hover:bg-gray-200 group-hover:opacity-100 dark:hover:bg-gray-600">
                  <MoreHorizontal className="h-3 w-3 text-gray-500" />
                </button>
              )}
            </div>

            {/* 댓글 내용 */}
            <div
              className={`mb-3 leading-relaxed text-gray-800 dark:text-gray-200 ${
                isReply ? 'text-sm' : 'text-sm'
              }`}
            >
              {renderContentWithMentions(comment.content)}
            </div>

            {/* 댓글 액션 */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                disabled={isLikeLoading}
                className={`flex items-center gap-1 transition-all hover:scale-110 ${
                  isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                } ${isLikeLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''} ${isLikeLoading ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">{comment.likes}</span>
              </button>

              {!isReply && (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center gap-1 text-gray-500 transition-colors hover:text-blue-500"
                >
                  <Reply className="h-4 w-4" />
                  <span className="text-xs font-medium">답글</span>
                </button>
              )}
            </div>

            {/* 답글 작성 폼 */}
            {showReplyForm && (
              <div className="mt-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                <form onSubmit={handleReplySubmit} className="flex gap-3">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-xs font-bold text-white">
                    U
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`${comment.author}님에게 답글 달기...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full bg-transparent text-sm placeholder-gray-500 focus:outline-none dark:text-white dark:placeholder-gray-400"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowReplyForm(false)}
                        className="px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        disabled={!replyText.trim()}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                          replyText.trim()
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'cursor-not-allowed bg-gray-200 text-gray-400'
                        }`}
                      >
                        답글
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
