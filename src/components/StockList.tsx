import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { useStockSearch } from '@/hooks/useStockSearch';
import type { Stock } from '@/types/stock';

export const StockList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error } = useStockSearch(searchQuery);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stocks</div>;

  return (
    <div className="p-4">
      <SearchBar onSearch={setSearchQuery} />
      <div className="mt-4 space-y-2">
        {data?.results.map((stock: Stock) => (
          <div key={stock.ticker} className="p-2 border rounded">
            <h3 className="font-bold">{stock.ticker}</h3>
            <p className="text-sm text-gray-600">{stock.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
