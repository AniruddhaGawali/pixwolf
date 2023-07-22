import React from 'react';
import { BorderButton } from '../button';

const Navbar = () => {
  return (
    <div className="absolute top-10 flex justify-between items-center w-11/12 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg-inner shadow-white px-14 py-5">
      <div className="flex items-center space-x-4 ">
        <h2 className="text-2xl font-bold text-white"> HomePage</h2>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="#"
          className="text-white text-lg font-semibold hover:text-gray-200">
          Login
        </a>
        <a
          href="#"
          className="text-white text-lg font-semibold hover:text-gray-200">
          <BorderButton />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
