import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

function Search() {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 w-64 bg-gray-100 focus:bg-white transition-colors duration-200"
      />
    </div>
  );
}

export default Search;
