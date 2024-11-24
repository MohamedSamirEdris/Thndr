import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';
import type { Stock } from '@/types/stock';

export interface Watchlist {
  id: string;
  name: string;
  stocks: Stock[];
}

export class WatchlistStore {
  watchlists: Watchlist[] = [];
  activeWatchlistId: string | null = null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  get activeWatchlist() {
    return this.watchlists.find(w => w.id === this.activeWatchlistId) || null;
  }

  createWatchlist(name: string) {
    const watchlist: Watchlist = {
      id: crypto.randomUUID(),
      name,
      stocks: []
    };
    this.watchlists.push(watchlist);
    this.saveToLocalStorage();
  }

  addToWatchlist(watchlistId: string, stock: Stock) {
    const watchlist = this.watchlists.find(w => w.id === watchlistId);
    if (watchlist && !watchlist.stocks.some(s => s.ticker === stock.ticker)) {
      watchlist.stocks.push(stock);
      this.saveToLocalStorage();
    }
  }

  removeFromWatchlist(watchlistId: string, ticker: string) {
    const watchlist = this.watchlists.find(w => w.id === watchlistId);
    if (watchlist) {
      watchlist.stocks = watchlist.stocks.filter(s => s.ticker !== ticker);
      this.saveToLocalStorage();
    }
  }

  setActiveWatchlist(id: string | null) {
    this.activeWatchlistId = id;
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem('watchlists');
    if (stored) {
      this.watchlists = JSON.parse(stored);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('watchlists', JSON.stringify(this.watchlists));
  }
}
