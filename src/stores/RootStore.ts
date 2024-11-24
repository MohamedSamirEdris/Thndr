import { makeAutoObservable } from 'mobx';
import { UIStore } from './UIStore';

export class RootStore {
  uiStore: UIStore;

  constructor() {
    makeAutoObservable(this);
    this.uiStore = new UIStore(this);
  }
}

export const rootStore = new RootStore();
