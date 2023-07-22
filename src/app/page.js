'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import SearchBar from '@/components/searchbar';
import usePexelClient from '@/hook/usePexelClient';

export default function Home() {
  const clinet = usePexelClient();
  const query = [
    'nature',
    'flower',
    'forest',
    'animal',
    'sky',
    'mountain',
    'beach',
    'city',
    'space',
  ];
  const random = Math.floor(Math.random() * query.length);
  const [bgImg, setBgImg] = useState('');
  useEffect(() => {
    clinet.photos
      .search({ query: query[random], per_page: 1 })
      .then((photos) => {
        setBgImg(photos.photos[0].src.original);
      });
  }, []);

  return (
    <main className="relative flex  min-h-screen flex-col items-center justify-center">
      <img
        src={bgImg}
        alt="bg"
        className="absolute -z-10 object-cover w-full h-full"
      />
      <div className=" absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center ">
        <Navbar />
        <h1 className="text-7xl text-white font-extrabold text-center mt-20 leading-snug">
          Discover over 2,000,000
          <br />
          free Stock Images
        </h1>
        <SearchBar />
        <div
          className="
        flex items-center justify-center shadow-lg-inner shadow-white rounded-lg
        bg-white bg-opacity-20 backdrop-blur-lg px-7 py-2 mt-12
        text-white text-lg gap-2
        ">
          <span className="font-semibold">Trending: </span>

          <a href="" className="hover:underline">
            flowers,
          </a>
          <a href="" className="hover:underline">
            love,
          </a>
          <a href="" className="hover:underline">
            forest,
          </a>
          <a href="" className="hover:underline">
            river
          </a>
        </div>
      </div>
    </main>
  );
}
