import { Button } from '@/components/ui/button';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Button className="bg-red-500">Click me</Button>
      </div>
    </QueryClientProvider>
  );
}

export default App;
