'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import usePexelClient from '@/hook/usePexelClient';
import { createClient } from '@supabase/supabase-js';
import { BorderButton } from '@/components/button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

import { useContext } from 'react';
import { UserContext } from '@/app/layout';

const handleSignIn = async (email, password, setUser, router) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data.user) {
      toast.success('Login Succeessfull', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setUser(data.user);
      router.push('/');
    } else {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  } catch (error) {
    toast.error(error.message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
};

const handleSignUp = async (email, password, fullName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (data.user) {
      toast.info('Check your email for confirmation!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  } catch (error) {
    toast.error(error, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
};

export default function Login() {
  const params = useSearchParams();
  const clinet = usePexelClient();

  const query = [
    'nature',
    'flower',
    'forest',
    'sky',
    'mountain',
    'beach',
    'city',
    'space',
  ];
  const random = Math.floor(Math.random() * query.length);
  const [bgImg, setBgImg] = useState('');
  const [isSignUp, setIsSignUp] = useState(
    params.get('is') === 'signup' ? true : false
  );

  useEffect(() => {
    clinet.photos
      .search({ query: query[random], per_page: 1 })
      .then((photos) => {
        setBgImg(photos.photos[0].src.original);
      });
  }, []);

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <img
          src={bgImg}
          alt=""
          className="fixed object-cover w-full h-full top-0 left-0 z-0"
        />

        <div className="absolute top-10 left-10 z-10">
          <h1 className="text-3xl font-bold text-white text-center">
            <Link href="/">Home</Link>
          </h1>
        </div>

        <div className="relative w-full h-full flex space-x-10 z-30">
          {isSignUp ? (
            <Signup setIsSignUp={setIsSignUp} />
          ) : (
            <Signin setIsSignUp={setIsSignUp} />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

const Signin = ({ setIsSignUp }) => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full h-full max-w-sm mx-auto">
      <form className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg-inner shadow-white rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold text-white mb-6">Sign In</h2>
        <div className="mb-4">
          <label
            className="block text-gray-100 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-100 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <BorderButton
            text="Sign in"
            onClick={() => handleSignIn(email, password, setUser, router)}
            type="button"
          />
          <span
            className="text-lg text-white font-semibold cursor-pointer underline "
            onClick={() => setIsSignUp(true)}>
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
};

const Signup = ({ setIsSignUp }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full max-w-sm mx-auto">
      <form className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg-inner shadow-white w-full rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl text-white font-semibold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label
            className="block text-gray-100 text-sm font-bold mb-2"
            htmlFor="fullName">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <BorderButton
            text="Sign up"
            onClick={() => handleSignUp(email, password, fullName)}
            type="button"
          />
          <span
            className="text-lg text-white font-semibold cursor-pointer underline "
            onClick={() => setIsSignUp(false)}>
            Login
          </span>
        </div>
      </form>
    </div>
  );
};
