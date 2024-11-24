import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export class ChartStore {
  timeframe: string = '1D';
  data: ChartData[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  setTimeframe(timeframe: string) {
    this.timeframe = timeframe;
  }

  async fetchChartData(symbol: string) {
    this.loading = true;
    this.error = null;
    try {
      // TODO: Implement actual API call
      const response = await fetch(`/api/chart/${symbol}?timeframe=${this.timeframe}`);
      const data = await response.json();
      this.data = data;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to fetch chart data';
    } finally {
      this.loading = false;
    }
  }
}
