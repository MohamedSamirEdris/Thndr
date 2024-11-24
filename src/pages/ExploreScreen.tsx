import { StockList } from '@/components/StockList';
import { Header } from '@/components/Header';
import { observer } from 'mobx-react-lite';

export const ExploreScreen = observer(() => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="container mx-auto">
        <StockList />
      </div>
    </div>
  );
});
