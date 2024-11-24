import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StockList } from '@/components/StockList';
import { rootStore } from '@/stores/RootStore';
import './App.css';

function App() {
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
      <div className={`container mx-auto ${rootStore.uiStore.theme}`}>
        <StockList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
