import React, { useContext } from 'react';
import { BorderButton } from '../button';
import Link from 'next/link';

import { FiLogIn } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

import { UserContext } from '@/app/layout';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className=" flex justify-between items-center w-11/12 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg-inner shadow-white sm:px-14 px-5 py-4 mt-12">
      <div className="flex items-center space-x-4 ">
        <h2 className="sm:text-2xl text-lg font-bold text-white cursor-pointer">
          <Link href="/">Pix Wolf</Link>
        </h2>
      </div>
      <div className="flex gap-5 items-center space-x-4">
        {user != null ? (
          <>
            <div className="flex items-center justify-center gap-3">
              <FaUserCircle className=" text-white text-3xl font-semibold hover:text-gray-200" />
              <div className="sm:block hidden text-white text-lg font-semibold hover:text-gray-200">
                {user.user_metadata.full_name}
              </div>
            </div>
            <BiLogOut
              className=" text-white text-3xl font-semibold hover:text-gray-200"
              onClick={() => {
                setUser(null);
              }}
            />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className=" text-white text-lg font-semibold hover:text-gray-200">
              <FiLogIn className="md:hidden flex" />
              <span className="md:flex hidden">Login</span>
            </Link>
            <Link
              href="/login/?is=signup"
              className=" text-white text-lg font-semibold hover:text-gray-200">
              <span className="md:flex hidden">
                <BorderButton text={'Create Account'} />
              </span>
              <FaUserPlus className="md:hidden flex" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
