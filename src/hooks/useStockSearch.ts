import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchStocks } from '@/services/api';
import type { StocksResponse } from '@/types/stock';
import { NetworkError, RateLimitError } from '@/types/errors';
import { useRootStore } from '@/stores/StoreContext';

export const useStockSearch = (search: string) => {
  const { uiStore } = useRootStore();
  return useInfiniteQuery<StocksResponse>({
    queryKey: ['stocks', search],
    queryFn: async ({ pageParam }) => {
      try {
        return await fetchStocks(search, pageParam as string);
      } catch (error) {
        if (error instanceof RateLimitError) {
          uiStore.setRateLimitTimeout(60000);
        }
        throw error;
      }
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.next_url;
      if (!nextUrl) return undefined;
      
      const url = new URL(nextUrl);
      return url.searchParams.get('cursor');
    },
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !uiStore.isRateLimited,
    retry: (failureCount, error) => {
      if (error instanceof RateLimitError) {
        return false;
      }
      if (error instanceof NetworkError) {
        return failureCount < 3;
      }
      return failureCount < 2;
    },
    refetchInterval: () => {
      return uiStore.shouldRetry ? 1000 : false;
    },
  });
};
