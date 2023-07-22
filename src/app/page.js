'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import usePexelClient from '@/hook/usePexelClient';

import Navbar from '@/components/navbar';
import SearchBar from '@/components/searchbar';
import Loading from '@/components/loading';
export default function Home() {
  const router = useRouter();
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
  const [loading, setLoading] = useState(true);
  const [bgImg, setBgImg] = useState('');

  useEffect(() => {
    clinet.photos
      .search({ query: query[random], per_page: 1 })
      .then((photos) => {
        setBgImg(photos.photos[0].src.original);
        setLoading(false);
      });
  }, []);

  const treadSearch = (search) => {
    router.push(`/search/?search=${search}`);
  };

  return (
    <main className="relative flex  min-h-screen flex-col items-center justify-center">
      {loading && <Loading />}
      <img
        src={bgImg}
        alt="bg"
        className="absolute -z-10 object-cover w-full h-full"
      />
      <div className=" absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center ">
        <Navbar />
        <h1 className="lg:text-7xl sm:text-5xl text-3xl text-white font-extrabold text-center mt-20 leading-snug">
          Discover over 2,000,000
          <br />
          free Stock Images
        </h1>
        <SearchBar
          searchFunction={() => {
            router.push('/search');
          }}
        />
        <div
          className="
        flex items-center justify-center shadow-lg-inner shadow-white rounded-lg
        bg-white bg-opacity-20 backdrop-blur-lg px-7 py-2 mt-12
        text-white sm:text-lg text-xs gap-2
        ">
          <span className="font-semibold">Trending: </span>

          <a
            onClick={() => {
              treadSearch('flower');
            }}
            className="hover:underline cursor-pointer">
            flowers,
          </a>
          <a
          onClick={() => {
            treadSearch('love');
          }}
          className="hover:underline cursor-pointer">
            love,
          </a>
          <a 
          onClick={() => {
            treadSearch('forest');
          }}
          className="ho ver:underline cursor-pointer">
            forest,
          </a>
          <a
          onClick={() => {
            treadSearch('river');
          }}
            className="hover:underline cursor-pointer">
            river
          </a>
        </div>
      </div>
    </main>
  );
}
