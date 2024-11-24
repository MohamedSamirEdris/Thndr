import { makeAutoObservable } from 'mobx';
import { ChartStore } from './ChartStore';
import { WatchlistStore } from './WatchlistStore';
import { UIStore } from './UIStore';

export class RootStore {
  chartStore: ChartStore;
  watchlistStore: WatchlistStore;
  uiStore: UIStore;

  constructor() {
    makeAutoObservable(this);
    this.chartStore = new ChartStore(this);
    this.watchlistStore = new WatchlistStore(this);
    this.uiStore = new UIStore(this);
  }
}

export const rootStore = new RootStore();
