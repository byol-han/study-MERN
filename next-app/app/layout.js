import Link from 'next/link';
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {' '}
      <body>
        <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
          {' '}
          <Link href='/' style={{ marginRight: '10px' }}>
            Home
          </Link>
          <Link href='/about'>About</Link>
        </nav>
        <main style={{ padding: '20px' }}>{children}</main>{' '}
      </body>
    </html>
  );
}
