import React from 'react';
import { BarLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-black bg-opacity-60  fixed top-0 left-0 z-50">
      <BarLoader
        color="#fff"
        width={230}
        cssOverride={{
          borderRadius: '10px',
        }}
      />
    </div>
  );
};

export default Loading;
