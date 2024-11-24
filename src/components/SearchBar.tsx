import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);
    debouncedSearch(query);
  };

  return (
    <Input
      type="text"
      placeholder="Search stocks..."
      value={value}
      onChange={handleChange}
      className="max-w-sm mx-auto"
    />
  );
};
