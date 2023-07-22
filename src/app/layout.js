'use client';

import './globals.css';
import { createContext, useState } from 'react';

export const UserContext = createContext();

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="
Pix Wolf: A User-Friendly Image Search Website with Stunning UI

Discover Pix Wolf, an image searching website featuring a visually appealing white-themed UI. With a user-friendly search bar, effortlessly find and download high-quality images. Like and share your favorites with ease. The website is fully responsive on all devices and boasts helpful animations to ensure smooth navigation. Experience seamless login with email verification for added security. Start exploring now!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>PixWolf</title>
        </head>

        <body>{children}</body>
      </html>
    </UserContext.Provider>
  );
}
