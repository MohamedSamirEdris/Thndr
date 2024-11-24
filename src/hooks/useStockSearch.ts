import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchStocks } from '@/services/api';
import type { StocksResponse } from '@/types/stock';

export const useStockSearch = (search: string) => {
  return useInfiniteQuery<StocksResponse>({
    queryKey: ['stocks', search],
    queryFn: ({ pageParam }) => fetchStocks(search, pageParam as string),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.next_url;
      if (!nextUrl) return undefined;
      
      const url = new URL(nextUrl);
      return url.searchParams.get('cursor');
    },
    staleTime: 30000,
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};
