import type { StocksResponse } from '@/types/stock';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_KEY) {
  throw new Error('API_KEY is not defined in environment variables');
}

if (!BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

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

  const response = await fetch(`${BASE_URL}/reference/tickers?${params}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
