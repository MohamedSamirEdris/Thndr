import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen } from '@/pages/SplashScreen';
import { ExploreScreen } from '@/pages/ExploreScreen';
import { rootStore } from '@/stores/RootStore';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className={rootStore.uiStore.theme}>
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <ExploreScreen />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
