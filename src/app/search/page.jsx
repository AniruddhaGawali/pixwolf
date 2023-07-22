'use client';
import React, { useEffect, useState, useContext } from 'react';

import usePexelClient from '@/hook/usePexelClient';

import Navbar from '@/components/navbar';
import SearchBar from '@/components/searchbar';
import Loading from '@/components/loading';

import { BgContext, SearchContext } from '@/app/layout';
import Card from '@/components/card';

const Search = () => {
  const client = usePexelClient();

  const { bgImg } = useContext(BgContext);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = async (search) => {
    setSearchQuery(search);
    await fetchSearch();
  };

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
  }, []);

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
      <div className=" relative flex flex-col justify-start items-center h-[55vh] w-full">
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

        <h2 className="z-20 text-white text-6xl font-bold">
          Result: {searchQuery}
        </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-16 p-10 w-full">
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
              search={search}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
