import { useState, useEffect, useRef } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { useStockSearch } from '@/hooks/useStockSearch';
import type { Stock } from '@/types/stock';

export const StockList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = 
    useStockSearch(searchQuery);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error)
    return (
      <div className="text-center text-lg text-red-500">
        Error loading stocks
      </div>
    );

  const allStocks = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="p-4 text-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-6xl mx-auto">
        {allStocks.map((stock: Stock) => (
          <div
            key={stock.ticker}
            className="p-4 border rounded-lg transition-shadow shadow-md hover:shadow-lg"
          >
            <h3 className="font-bold text-center text-lg">{stock.ticker}</h3>
            <p className="text-sm text-gray-600 text-center mt-2 line-clamp-2">{stock.name}</p>
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} className="h-10 mt-4">
        {isLoading || isFetchingNextPage ? (
          <div className="text-center text-lg">Loading more stocks...</div>
        ) : null}
      </div>
    </div>
  );
};
