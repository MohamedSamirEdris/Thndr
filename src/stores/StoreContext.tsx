import { createContext, useContext, ReactNode } from 'react';
import { RootStore } from './RootStore';

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = new RootStore();
  
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useRootStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within StoreProvider');
  }
  return context;
};
