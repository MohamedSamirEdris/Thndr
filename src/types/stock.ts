export interface Stock {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  active: boolean;
}

export interface StocksResponse {
  results: Stock[];
  status: string;
  count: number;
  next_url?: string;
}
