import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { BorderButton } from '../button';

import { useSearchParams,useRouter } from 'next/navigation';

const SearchBar = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [search, setSearch] = useState(searchQuery ? searchQuery : '');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search/?search=${search}`);
      }}
      className="flex justify-between items-center lg:w-1/2 sm:w-2/3 px-5 w-5/6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg-inner shadow-white py-4 mt-12">
      <div className="flex items-center space-x-4 h-full w-full">
        <FiSearch className="text-white text-2xl" />
        <div className="h-full w-[2px] bg-white" />
        <input
          type="text"
          className="bg-transparent text-white text-lg font-semibold w-5/6   outline-none placeholder-white "
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <BorderButton text="GO!" type="submit" />
    </form>
  );
};

export default SearchBar;
