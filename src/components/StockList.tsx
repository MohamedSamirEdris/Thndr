import { useState, useRef } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { useStockSearch } from '@/hooks/useStockSearch';
import type { Stock } from '@/types/stock';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { NetworkError, RateLimitError } from '@/types/errors';

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

  const renderError = () => {
    if (!error) return null;

    let title = 'Error loading stocks';
    let message = 'Please try again later';
    let icon = (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    );

    if (error instanceof RateLimitError) {
      title = 'Rate Limit Exceeded';
      message = 'Please wait a moment before trying again';
      icon = (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    } else if (error instanceof NetworkError) {
      title = 'Network Error';
      message = 'Please check your internet connection';
      icon = (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
        />
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {icon}
        </svg>
        <div className="text-lg font-medium">{title}</div>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    );
  };

  if (error) {
    return renderError();
  }

  const allStocks = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="p-4 text-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <SearchBar onSearch={setSearchQuery} isLoading={isLoading} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-6xl mx-auto">
        {allStocks.map((stock: Stock) => (
          <div
            key={stock.ticker}
            className="p-4 border rounded-lg transition-shadow shadow-md hover:shadow-lg"
          >
            <h3 className="font-bold text-center text-lg">{stock.ticker}</h3>
            <p className="text-sm text-gray-600 text-center mt-2 line-clamp-2">
              {stock.name}
            </p>
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} className="h-20 mt-4 flex items-center justify-center">
        {isLoading || isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-2">
            <LoadingSpinner size="md" />
            <span className="text-sm text-gray-500">
              {isLoading ? 'Loading stocks...' : 'Loading more stocks...'}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
