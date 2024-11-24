import type { Stock } from '@/types/stock';

interface StockCardProps {
  stock: Stock;
}

export const StockCard = ({ stock }: StockCardProps) => {
  return (
    <div className="p-4 border rounded-lg transition-all duration-200 shadow-md hover:shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
      <h3 className="font-bold text-center text-lg">{stock.ticker}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2 line-clamp-2">
        {stock.name}
      </p>
    </div>
  );
};
