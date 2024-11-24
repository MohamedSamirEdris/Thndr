import { useQuery } from '@tanstack/react-query';
import { fetchStocks } from '@/services/api';
import type { StocksResponse } from '@/types/stock';

export const useStockSearch = (search: string) => {
  return useQuery<StocksResponse>({
    queryKey: ['stocks', search],
    queryFn: () => fetchStocks(search),
    enabled: true,
    staleTime: 30000, 
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};
