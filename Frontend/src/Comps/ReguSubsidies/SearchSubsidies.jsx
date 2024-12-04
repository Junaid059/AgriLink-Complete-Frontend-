
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FiSearch } from 'react-icons/fi';

function SearchSubsidies({ subsidies, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredSubsidies = subsidies.filter((subsidy) =>
      subsidy.title.toLowerCase().includes(term)
    );
    onSearch(filteredSubsidies);
  };

  return (
    <div className="relative mb-10">
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search Subsidies by Title"
        className="w-full px-4 py-3 pl-12 border border-green-500 rounded-full shadow-sm focus:ring-2 focus:ring-green-800 focus:outline-none"
      />
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
}

export default SearchSubsidies;
