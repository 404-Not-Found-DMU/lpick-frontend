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
    setCategoryFilter,
    setSortBy,
    setCurrentPage,
  } = useCommunity();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={filters.category}
        onCategoryChange={setCategoryFilter}
      />

      <FeaturedSection posts={featuredPosts} />

      <PostList posts={recentPosts} sortBy={filters.sortBy} onSortChange={setSortBy} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default CommunityPage;
