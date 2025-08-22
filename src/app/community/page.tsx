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
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Header
          searchQuery={filters.searchQuery}
          onSearchChange={setSearchQuery}
          activeBoard={filters.board}
          onBoardChange={setBoardFilter}
          activeTag={filters.tag}
          onTagChange={setTagFilter}
        />

        <div className="mt-8 space-y-6">
          <FeaturedSection posts={featuredPosts} />

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
