'use client';
import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import usePexelClient from '@/hook/usePexelClient';

import Navbar from '@/components/navbar';
import SearchBar from '@/components/searchbar';
import Loading from '@/components/loading';

import { BgContext } from '@/app/layout';
import Card from '@/components/card';

const Search = () => {
  const client = usePexelClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  const { bgImg } = useContext(BgContext);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSearch = async () => {
    setLoading(true);
    const data = await client.photos.search({
      query: searchQuery ? searchQuery : 'nature',
      per_page: 21,
    });

    setSearchResult(data.photos);
    setLoading(false);
  };

  useEffect(() => {
    fetchSearch();
  }, [searchQuery]);

  const tags = [
    'nature',
    'love',
    'wallpaper',
    'flowers',
    'food',
    'business',
    'house',
    'city',
    'car',
    'computer',
    'phone',
    'people',
    'animal',
    'cat',
    'dog',
    'sky',
  ];

  return (
    <div className=" flex flex-col justify-center items-center w-full">
      <div className=" relative flex flex-col justify-start items-center sm:h-[55vh] h-[47vh] w-full">
        <img
          src={bgImg}
          alt="bg"
          class="absolute object-cover  h-full w-full"
        />

        <Navbar />

        <br />
        <br />

        <SearchBar searchFunction={fetchSearch} />

        <br />
        <br />
        <br />

        <h2 className="z-20 text-white lg:text-7xl sm:text-5xl text-3xl font-bold">
          Result: {searchQuery}
        </h2>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:gap-16 gap-5 p-10 w-full">
        {/* <div className="flex flex-row flex-wrap justify-center items-center w-full h-full gap-5"> */}
        {loading ? (
          <Loading />
        ) : (
          searchResult.map((item) => (
            <Card
              item={item}
              tags={[
                searchQuery,
                tags[Math.floor(Math.random() * (tags.length - 1 - 0 + 1))],
                tags[Math.floor(Math.random() * (tags.length - 1 - 0 + 1))],
              ]}
              router={router}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
