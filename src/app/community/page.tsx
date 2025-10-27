'use client';
import { Header, FeaturedSection, PostList, Pagination } from './components';
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
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <Header
          searchQuery={filters.searchQuery}
          onSearchChange={setSearchQuery}
          activeBoard={filters.board}
          onBoardChange={setBoardFilter}
          activeTag={filters.tag}
          onTagChange={setTagFilter}
        />

        <div className="mt-8 space-y-8">
          {/* Featured Section - 원래 배경으로 복원 */}
          <FeaturedSection posts={featuredPosts} />

          {/* PostList를 그리드 형태로 표시 */}
          <PostList posts={recentPosts} sortBy={filters.sortBy} onSortChange={setSortBy} />

          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
