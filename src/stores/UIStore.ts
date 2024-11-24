/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAutoObservable } from 'mobx';
import type { RootStore } from './RootStore';

export type Theme = 'light' | 'dark';

export class UIStore {
  theme: Theme = 'light';
  rateLimitEndTime: number | null = null;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
    this.initializeTheme();
  }

  private initializeTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('ui-preferences')) {
        this.theme = e.matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', e.matches);
      }
    });

    document.documentElement.classList.toggle('dark', this.theme === 'dark');
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
    this.saveToLocalStorage();
  }



  private loadFromLocalStorage() {
    const stored = localStorage.getItem('ui-preferences');
    if (stored) {
      const preferences = JSON.parse(stored);
      this.theme = preferences.theme;
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('ui-preferences', JSON.stringify({
      theme: this.theme,
    }));
  }

  private rateLimitTimer: NodeJS.Timeout | null = null;

  setRateLimitTimeout(durationMs: number = 60000) {
    // Clear any existing timer
    if (this.rateLimitTimer) {
      clearTimeout(this.rateLimitTimer);
    }

    this.rateLimitEndTime = Date.now() + durationMs;
    
    // Set new timer
    this.rateLimitTimer = setTimeout(() => {
      this.clearRateLimit();
    }, durationMs);
  }

  private onRateLimitExpired?: () => void;

  clearRateLimit() {
    this.rateLimitEndTime = null;
    if (this.rateLimitTimer) {
      clearTimeout(this.rateLimitTimer);
      this.rateLimitTimer = null;
    }
    if (this.onRateLimitExpired) {
      setTimeout(() => {
        this.onRateLimitExpired?.();
        this.onRateLimitExpired = undefined;
      }, 0);
    }
  }

  setOnRateLimitExpired(callback: () => void) {
    this.onRateLimitExpired = callback;
  }

  get isRateLimited() {
    if (!this.rateLimitEndTime) return false;
    const isLimited = Date.now() < this.rateLimitEndTime;
    if (!isLimited) {
      this.clearRateLimit();
    }
    return isLimited;
  }

  get rateLimitRemainingSeconds() {
    if (!this.rateLimitEndTime) return 0;
    const remaining = Math.max(0, Math.ceil((this.rateLimitEndTime - Date.now()) / 1000));
    if (remaining === 0) {
      this.clearRateLimit();
    }
    return remaining;
  }

  get shouldRetry() {
    return this.isRateLimited && this.rateLimitRemainingSeconds > 0;
  }
}
