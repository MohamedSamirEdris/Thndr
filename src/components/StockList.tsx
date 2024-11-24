import { useState, useRef } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { useStockSearch } from '@/hooks/useStockSearch';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { StockCard } from '@/components/StockCard';

export const StockList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStockSearch(searchQuery);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll(loadMoreRef, () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const allStocks = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="p-4 text-black dark:text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <SearchBar onSearch={setSearchQuery} isLoading={isLoading} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-6xl mx-auto">
        {allStocks.map((stock) => (
          <StockCard key={stock.ticker} stock={stock} />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-20 mt-4 flex items-center justify-center">
        {(isLoading || isFetchingNextPage) && (
          <div className="flex flex-col items-center gap-2">
            <LoadingSpinner size="md" />
            <span className="text-sm text-gray-500">
              {isLoading ? 'Loading stocks...' : 'Loading more stocks...'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
