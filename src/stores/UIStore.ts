import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export type Theme = 'light' | 'dark';
export type ChartView = 'candlestick' | 'line';

export class UIStore {
  theme: Theme = 'light';
  chartView: ChartView = 'candlestick';

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.saveToLocalStorage();
  }

  setChartView(view: ChartView) {
    this.chartView = view;
    this.saveToLocalStorage();
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem('ui-preferences');
    if (stored) {
      const preferences = JSON.parse(stored);
      this.theme = preferences.theme;
      this.chartView = preferences.chartView;
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('ui-preferences', JSON.stringify({
      theme: this.theme,
      chartView: this.chartView,
    }));
  }
}
