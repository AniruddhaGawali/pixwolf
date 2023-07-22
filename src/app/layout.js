'use client';

import './globals.css';
import { createContext , useState} from 'react';

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
          <meta name="description" content="PixWolf" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>PixWolf</title>
        </head>

        <body>{children}</body>
      </html>
    </UserContext.Provider>
  );
}
