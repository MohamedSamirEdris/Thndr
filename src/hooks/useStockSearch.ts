import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchStocks } from '@/services/api';
import type { StocksResponse } from '@/types/stock';
import { NetworkError, RateLimitError } from '@/types/errors';

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
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: true,
    retry: (failureCount, error) => {
      if (error instanceof RateLimitError) {
        return false; 
      }
      if (error instanceof NetworkError) {
        return failureCount < 3; 
      }
      return failureCount < 2; // Retry other errors up to 2 times
    },
  });
};
