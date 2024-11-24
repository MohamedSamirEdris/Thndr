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
    this.initializeTheme();
  }

  private initializeTheme() {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('ui-preferences')) {
        this.theme = e.matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', e.matches);
      }
    });

    // Apply initial theme
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
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
