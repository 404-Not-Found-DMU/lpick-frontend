'use client';
import { Heart, MessageSquare } from 'lucide-react';
import { Post } from '../../community.types';
import { usePopularArticles } from '../../hooks/usePopularArticles';
import Link from 'next/link';

interface SidebarProps {
  post: Post;
}

const Sidebar = ({ post }: SidebarProps) => {
  const { articles: popularArticles, loading: popularLoading, error: popularError } = usePopularArticles();

  return (
    <div className="w-full space-y-6">
      {/* 작성자 정보 */}
      <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">작성자 정보</h3>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
            <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              {post.author.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{post.author}</h4>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600 dark:bg-orange-900 dark:text-orange-300">
                Lv.3
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">2023년 1월 15일 가입</p>
          </div>
        </div>
      </div>

      {/* 인기 게시글 */}
      <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">인기 게시글</h3>
        <div className="space-y-4">
          {popularLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600" />
                    <div className="flex-1">
                      <div className="mb-2 h-4 rounded bg-gray-200 dark:bg-gray-600" />
                      <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : popularError ? (
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              인기 게시글을 불러올 수 없습니다.
            </div>
          ) : popularArticles.length === 0 ? (
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              인기 게시글이 없습니다.
            </div>
          ) : (
            popularArticles.map((article, i) => (
              <Link 
                key={article.articleId} 
                href={`/community/${article.articleId}`}
                className="group block cursor-pointer"
              >
                <div className="flex gap-3">
                  <div
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">{article.author}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-red-500" />
                          <span>{article.likeCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3 text-blue-500" />
                          <span>{article.commentCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <Link 
          href="/community" 
          className="mt-4 block w-full text-center text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400"
        >
          인기 게시글 더보기 →
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
