'use client';

import React from 'react';

export const BorderButton = ({ text, onClick, className,type }) => {
  return (
    <button
      onClick={onClick ? onClick : () => {}}
      type={type ? type : 'button'}
      className={`border-[3px] border-white rounded-lg px-4 py-1 text-white font-bold hover:bg-white hover:text-black transition duration-300 ease-in-out ${
        className ? className : ''
      }`}>
      {text ? text : 'Button'}
    </button>
  );
};
