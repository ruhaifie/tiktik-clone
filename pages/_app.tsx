import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/globals.css';

//AppProps:what kind of prop pass to each component
const MyApp = ({ Component, pageProps }: AppProps) => {

  //nextjs can do front & backend
  //SSR: server side rendering, at 1st true:think as SSR
  const [isSSR, setIsSSR] = useState(true);

  //define when it is not SSR
  useEffect(() => {
    setIsSSR(false);  //set to client side
    //run only at start, that why empty []
  }, []);  

  if (isSSR) return null; //if SSR dont want to show components
  //we want SSR to false = client

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      {/* wrap navigation bar */}
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'> 
        <Navbar />
        <div className='flex gap-6 md:gap-20 '>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;

/**

npm run dev

_app.tsx: main template in next.js

tailwind
md is medium device
mid part to 92% of screen
mt is margin top

console.cloud.google.com
*/