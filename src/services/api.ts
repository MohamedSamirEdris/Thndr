import type { StocksResponse } from '@/types/stock';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_KEY) {
  throw new Error('API_KEY is not defined in environment variables');
}

if (!BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

import { APIError, RateLimitError, NetworkError } from '@/types/errors';

export const fetchStocks = async (
  search?: string,
  cursor?: string
): Promise<StocksResponse> => {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    market: 'stocks',
    active: 'true',
    limit: '20',
    exchange: 'XNAS',
    ...(search && { search }),
    ...(cursor && { cursor }),
  });

  try {
    const response = await fetch(`${BASE_URL}/reference/tickers?${params}`);
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new RateLimitError();
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.error || 'An error occurred while fetching stocks',
        response.status,
        errorData.code
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new NetworkError();
    }
    throw new APIError('An unexpected error occurred');
  }
};
