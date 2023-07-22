'use client';

import { useState, createContext } from 'react';

import './globals.css';

// export const metadata = {
//   title: 'PixWolf',
//   description: '',
// };

export const BgContext = createContext();
export const SearchContext = createContext();

export default function RootLayout({ children }) {
  const [bgImg, setBgImg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="PixWolf" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PixWolf</title>
      </head>

      <body>
        <BgContext.Provider value={{ bgImg, setBgImg }}>
          <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
          </SearchContext.Provider>
        </BgContext.Provider>
      </body>
    </html>
  );
}
