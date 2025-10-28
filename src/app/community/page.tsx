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
    loading,
    error,
    setSearchQuery,
    setBoardFilter,
    setTagFilter,
    setSortBy,
    setCurrentPage,
    refresh,
  } = useCommunity();

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            게시글을 불러올 수 없습니다
          </p>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

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
          {/* Featured Section */}
          <FeaturedSection posts={featuredPosts} loading={loading} />

          {/* PostList */}
          <PostList 
            posts={recentPosts} 
            sortBy={filters.sortBy} 
            onSortChange={setSortBy}
            loading={loading}
          />

          {!loading && totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
