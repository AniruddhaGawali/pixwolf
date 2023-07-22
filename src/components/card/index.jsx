import React from 'react';
import { useRouter } from 'next/router';
import { saveAs } from 'file-saver';
import { FiDownload } from 'react-icons/fi';

const Card = ({ item, tags, router, setIndex }) => {
  return (
    <div className=" group relative flex flex-col justify-end items-start p-5 h-[50vh]">
      <img
        src={item.src.large}
        alt={item.alt}
        class=" absolute top-0 left-0 object-cover rounded-lg shadow-lg-inner w-full h-full"
        onClick={setIndex}
      />
      <div className=" flex justify-between items-end w-full z-10">
        <div>
          <h2 className="text-white text-2xl font-bold">{item.photographer}</h2>
          <div className=" mt-3 flex text-white text-sm font-semibold">
            {tags.map((tag) => (
              <span
                className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg cur shadow-lg-inner shadow-white px-2 py-1 mr-3 cursor-pointer"
                onClick={() => {
                  router.push(`/search/?search=${tag}`);
                }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="group-hover:flex hidden bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg-inner shadow-white px-3 py-3 mt-12 cursor-pointer "
          onClick={() => {
            saveAs(item.src.original, `${item.alt}.png`);
          }}>
          <FiDownload className="text-white text-2xl font-bold" />
        </div>
      </div>
    </div>
  );
};

export default Card;
