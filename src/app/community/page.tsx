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
    setCategoryFilter,
    setSortBy,
    setCurrentPage,
  } = useCommunity();

  return (
    <div className="mx-auto min-h-screen w-full bg-gray-50/50 px-4 py-4 dark:bg-gray-900/50 sm:px-6 sm:py-6 lg:px-16 lg:py-8">
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
