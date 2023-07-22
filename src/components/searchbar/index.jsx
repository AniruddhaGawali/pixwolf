import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { BorderButton } from '../button';

const SearchBar = () => {
  return (
    <div className="flex justify-between items-center w-1/2 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg-inner shadow-white px-5 py-4 mt-12">
      <div className="flex items-center space-x-4 h-full w-full">
        <FiSearch className="text-white text-2xl" />
        <div className="h-full w-[2px] bg-white" />
        <input
          type="text"
          className="bg-transparent text-white text-lg font-semibold w-5/6 outline-none placeholder-white "
          placeholder="Search"
        />
      </div>
      <BorderButton text="GO!" />
    </div>
  );
};

export default SearchBar;
