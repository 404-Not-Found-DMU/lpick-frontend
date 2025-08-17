import { Heart, MessageSquare } from 'lucide-react';
import { Post } from '../../types/community.types';

interface SidebarProps {
  post: Post;
}

const Sidebar = ({ post }: SidebarProps) => {
  return (
    <div className="w-full space-y-6">
      {/* 작성자 정보 */}
      <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-xl font-bold text-white">
            {post.author.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{post.author}</h3>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">음악 애호가 · LP 컬렉터</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>게시글 12</span>
              <span>팔로워 1.2k</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700">
            팔로우
          </button>
          <button className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
            메시지
          </button>
        </div>
      </div>

      {/* 관련 게시글 */}
      <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">관련 게시글</h3>
        <div className="space-y-4">
          {[
            {
              title: '오래 고민 끝에 선택한 턴테이블',
              author: '음악덕후',
              time: '2시간 전',
              category: 'LP추천',
            },
            {
              title: 'Pink Floyd - The Dark Side of the Moon 리뷰',
              author: '레코드맨',
              time: '3시간 전',
              category: '리뷰',
            },
            {
              title: '빈티지 구매 가이드',
              author: '컬렉터',
              time: '5시간 전',
              category: '정보',
            },
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-bold text-white">
                  LP
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between">
                    <h4 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                      {item.category}
                    </span>
                    <span>{item.author}</span>
                    <span>·</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400">
          더 많은 관련 게시글 보기 →
        </button>
      </div>

      {/* 인기 게시글 */}
      <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">인기 게시글</h3>
        <div className="space-y-4">
          {[
            {
              title: '처음 구매한 LP 음반을 공유합니다!',
              author: '음악덕후',
              likes: 24,
              comments: 18,
              rank: 1,
            },
            {
              title: '서울 LP 매장 추천',
              author: 'LP컬렉터',
              likes: 19,
              comments: 12,
              rank: 2,
            },
            {
              title: '빈티지 구매 가이드',
              author: '컬렉터',
              likes: 15,
              comments: 8,
              rank: 3,
            },
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="flex gap-3">
                <div
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    item.rank === 1
                      ? 'bg-yellow-500'
                      : item.rank === 2
                        ? 'bg-gray-400'
                        : 'bg-orange-500'
                  }`}
                >
                  {item.rank}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{item.author}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3 text-blue-500" />
                        <span>{item.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400">
          인기 게시글 더보기 →
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
