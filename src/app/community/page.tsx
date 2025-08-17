'use client';
import { Header } from './components/Header';
import { FeaturedSection } from './components/FeaturedSection';
import { PostList } from './components/PostList';
import { Pagination } from './components/Pagination';
import { useCommunity } from './hooks/useCommunity';

const CommunityPage = () => {
  const {
    featuredPosts,
    recentPosts,
    filters,
    currentPage,
    totalPages,
    setSearchQuery,
    setBoardFilter,
    setTagFilter,
    setSortBy,
    setCurrentPage,
  } = useCommunity();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      {/* 컨테이너 - 완전한 중앙 정렬 */}
      <div className="flex min-h-screen w-full justify-center">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
          <Header
            searchQuery={filters.searchQuery}
            onSearchChange={setSearchQuery}
            activeBoard={filters.board}
            onBoardChange={setBoardFilter}
            activeTag={filters.tag}
            onTagChange={setTagFilter}
          />

          <div className="space-y-8">
            <FeaturedSection posts={featuredPosts} />

            <PostList posts={recentPosts} sortBy={filters.sortBy} onSortChange={setSortBy} />

            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
