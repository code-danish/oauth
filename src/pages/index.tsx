import Image from 'next/image';
import { Inter } from 'next/font/google';
import { signIn, signOut, useSession } from 'next-auth/react';
import submitUser from './utility/submitUser';
import { useState } from 'react';
import submitSession from './utility/submitSession';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data, status } = useSession();
  let button = <></>;
  let detail = <></>;
  switch (status) {
    case 'loading':
      button = (
        <button className='border border-slate-600 py-2 px-6 rounded-full drop-shadow-md w-[70vw] md:w-[40vw]'>
          <span>
            <i className='fa-solid fa-hourglass-start mr-3'>Please wait</i>
          </span>
        </button>
      );
      break;
    case 'authenticated':
      button = (
        <button
          className='border border-slate-600 py-2 px-6 rounded-full drop-shadow-md w-[70vw] md:w-[40vw]'
          onClick={() => signOut()}
        >
          <span>
            <i className='fa-solid fa-arrow-right-from-bracket mr-3'></i> Log
            out
          </span>
        </button>
      );
      break;
    case 'unauthenticated':
      button = (
        <button
          className='border border-slate-600 py-2 px-6 rounded-full drop-shadow-md'
          onClick={() => signIn('google')}
        >
          <span className='font-semibold'>
            <i className='fa-brands fa-google mr-3'></i> Sign in with Google
          </span>
        </button>
      );
      break;
    default:
      button = (
        <button className='border border-slate-600 py-2 px-6 rounded-full drop-shadow-md w-[70vw] md:w-[40vw]'>
          <span>
            <i className='fa-solid fa-hourglass-start mr-3'>Please wait</i>
          </span>
        </button>
      );
  }
  let ui =
    status == 'authenticated' ? (
      <div className='flex gap-10 w-[70vw] md:w-[40vw] py-12'>
        <img
          src={data?.user?.image || ''}
          alt='Failed to load image'
          className='rounded-3xl aspect-square h-40'
        ></img>
        <div className='flex flex-col justify-between h-full'>
          <div className='border-b-2 border-stone-600 pb-2 mb-4 text-3xl font-bold font-sans opacity-60 drop-shadow-sm'>
            Profile Details
          </div>
          <div className='font-semibold text-xl'>Name : {data?.user?.name}</div>
          <div className='font-semibold text-xl'>
            Email : {data?.user?.email}
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className='text-3xl font-bold font-sans mt-5 mb-8 opacity-60 drop-shadow-sm'>
          Try signing in with Google
        </div>
      </>
    );
  return (
    <main className={`min-h-screen`}>
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css'
        integrity='sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex justify-center items-center flex-col'>
          <div className='text-7xl font-semibold mb-12 drop-shadow-lg'>
            Hi there! Welcome to my app.
          </div>
        </div>
        <div>{ui}</div>
        <div className=''>{button}</div>
      </div>
    </main>
  );
}
