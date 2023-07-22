import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="PixWolf" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PixWolf</title>
      </head>

      <body>{children}</body>
    </html>
  );
}
