import React from 'react';
import { BorderButton } from '../button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className=" flex justify-between items-center w-11/12 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg-inner shadow-white px-14 py-4 mt-12">
      <div className="flex items-center space-x-4 ">
        <h2 className="text-2xl font-bold text-white cursor-pointer">
          <Link href="/">Pix Wolf</Link>
        </h2>
      </div>
      <div className="flex gap-5 items-center space-x-4">
        <a
          href="#"
          className="text-white text-lg font-semibold hover:text-gray-200">
          Login
        </a>
        <a
          href="#"
          className="text-white text-lg font-semibold hover:text-gray-200">
          <BorderButton text={'Create Account'} />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
