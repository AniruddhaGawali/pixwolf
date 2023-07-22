'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import usePexelClient from '@/hook/usePexelClient';

import Navbar from '@/components/navbar';
import SearchBar from '@/components/searchbar';
import Loading from '@/components/loading';
import Model from '@/components/model';
import Card from '@/components/card';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaShare } from 'react-icons/fa';

import { motion } from 'framer-motion';

const Search = () => {
  const client = usePexelClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [index, setIndex] = useState(0);

  const [bgImg, setBgImg] = useState(
    'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  );

  const fetchSearch = async () => {
    setLoading(true);
    const data = await client.photos.search({
      query: searchQuery ? searchQuery : 'nature',
      per_page: 21,
    });

    setBgImg(
      data.photos[Math.floor(Math.random() * (data.photos.length - 1 - 0 + 1))]
        .src.original
    );
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
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: 1 }}
      className=" flex flex-col justify-center items-center w-full">
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
          searchResult.map((item, index) => (
            <Card
              item={item}
              tags={[
                searchQuery,
                tags[Math.floor(Math.random() * (tags.length - 1 - 0 + 1))],
                tags[Math.floor(Math.random() * (tags.length - 1 - 0 + 1))],
              ]}
              router={router}
              setIndex={() => {
                setIndex(index);
                setOpenModel(true);
              }}
            />
          ))
        )}
      </div>
      {!loading && (
        <div className={`${openModel ? 'flex z-50' : 'hidden'}`}>
          <Model
            onClose={() => {
              setOpenModel(false);
            }}>
            <ModelBox item={searchResult[index]} setOpenModel={setOpenModel} />
          </Model>
        </div>
      )}
      <ToastContainer />
    </motion.div>
  );
};

export default Search;

export const ModelBox = ({ item, setOpenModel }) => {
  const router = useRouter();
  const [type, setType] = useState('small');

  const download = () => {
    if (type === 'original') {
      saveAs(item.src.original, `${item.alt}.png`);
    } else if (type === 'small') {
      saveAs(item.src.small, `${item.alt}.png`);
    } else if (type === 'large') {
      saveAs(item.src.large, `${item.alt}.png`);
    } else if (type === 'medium') {
      saveAs(item.src.medium, `${item.alt}.png`);
    }
  };

  return (
    <div className="rounded-lg lg:overflow-hidden overflow-scroll">
      <div className="flex flex-row justify-between items-center w-full h-full bg-gray-300 px-5 rounded-t-lg">
        <h2 className="text-black sm:text-2xl text-xl whitespace-nowrap font-bold  text-center p-5 rounded-t-lg">
          Preview Id : {item.id}
        </h2>

        <div className="flex justify-center items-center gap-5">
          <FaShare
            className="text-black sm:text-4xl text-2xl font-bold cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(
                'https://pixwolf.vercel.app/' + '/image/?id=' + item.id
              );
              toast.success('Link Copied', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
            }}
          />

          <IoIosCloseCircleOutline
            className="text-black sm:text-5xl text-3xl font-bold cursor-pointer"
            onClick={() => {
              setOpenModel(false);
            }}
          />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col lg:overflow-hidden overflow-scroll justify-center items-center w-full lg:h-[75vh] ">
        <div className="lg:w-1/2 w-full p-5 lg:h-full">
          <img
            src={item.src.large2x}
            alt={item.alt}
            className="object-cover w-full lg:h-full h-[50vh] rounded-lg shadow-lg-inner shadow-white"
          />
        </div>
        <div className=" flex flex-col justify-center items-center lg:w-1/2 w-full p-5 ">
          <div className="flex flex-col justify-start items-start gap-5 m-5 bg-gray-300 p-5 rounded-lg w-full">
            <h2 className="text-black text-2xl font-bold mb-3">
              Download Size
            </h2>
            <div className="flex justify-center items-center gap-5 ">
              <input
                type="radio"
                name="type"
                id="small"
                value={'small'}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                checked={type === 'small'}
              />
              <label htmlFor="small" className="font-semibold text-lg">
                Small 640 x 960
              </label>
            </div>
            <div className="flex justify-center items-center gap-5 ">
              <input
                type="radio"
                name="type"
                id="medium"
                value={'medium'}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                checked={type === 'medium'}
              />
              <label htmlFor="medium" className="font-semibold text-lg">
                Medium 1920 x 2660
              </label>
            </div>
            <div className="flex justify-center items-center gap-5">
              <input
                type="radio"
                name="type"
                id="large"
                value={'large'}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                checked={type === 'large'}
              />
              <label htmlFor="large" className="font-semibold text-lg">
                Large 2400 x 3600
              </label>
            </div>
            <div className="flex justify-center items-center gap-5">
              <input
                type="radio"
                name="type"
                id="original"
                value={'original'}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                checked={type === 'original'}
              />
              <label htmlFor="original" className="font-semibold text-lg">
                Original
              </label>
            </div>
          </div>

          <button
            className="bg-green-400 p-3 rounded-lg text-lg font-semibold text-white w-full"
            onClick={download}>
            Download
          </button>

          <div className="flex flex-col justify-start items-start gap-2 mt-3 sm:p-5 p-2 rounded-lg w-full ">
            <h2 className="text-black text-2xl font-bold mb-2">Information</h2>
            <div className="flex justify-start items-start gap-5">
              <h3 className="text-black text-lg font-semibold whitespace-nowra">
                Title :
              </h3>
              <h3 className="text-black text-lg font-semibold ">{item.alt}</h3>
            </div>
            <div className="flex justify-start items-start gap-5">
              <h3 className="text-black text-lg font-semibold whitespace-nowrap">
                Photographer :
              </h3>
              <h3 className="text-black text-lg font-semibold ">
                {item.photographer}
              </h3>
            </div>
            <div className="flex justify-start items-start gap-5">
              <h3 className="text-black text-lg font-semibold whitespace-nowra">
                Id :
              </h3>
              <h3 className="text-black text-lg font-semibold ">{item.id}</h3>
            </div>
            <div className="flex justify-start items-start gap-5">
              <h3 className="text-black text-lg font-semibold whitespace-nowra">
                Avg Color :
              </h3>
              <h3 className="text-black text-lg font-semibold ">
                {item.avg_color}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
