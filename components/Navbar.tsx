//react
import React, { useEffect, useState } from 'react';

//next
import Image from 'next/image';
import Link from 'next/link';   //link component, redirect to what page. next js use file base routing
import { useRouter } from 'next/router';

//icons
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

//google
import { GoogleLogin, googleLogout } from '@react-oauth/google';

//zustand
import useAuthStore from '../store/authStore';

import { IUser } from '../types';
import { createOrGetUser } from '../utils';
import Logo from '../utils/tiktik-logo.png';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  //searchbar
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  //destruct from useAuthStore *authStore.ts
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  //type for function that contain prev def, : { preventDefault: () => void }
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      //pages > search > [searchTerm].tsx
      router.push(`/search/${searchValue}`);  //eg: localhost:3000/search/coding
    }
  };

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/' >
        <div className='w-[100px] md:w-[129px] md:h-[30px] h-[38px]'>
          <Image
            className='cursor-pointer' //pointer so can click 
            src={Logo}  //local path to logo
            alt='logo'
            layout='responsive'
          />
        </div>
      </Link>

      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            //search
            //type="text"
            value={searchValue} //value is store inside state
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
            placeholder='Search accounts and videos'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className='flex gap-5 md:gap-10'>

            {/* upload page */}
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' />{' '}
                <span className='hidden md:block'>Upload </span>
              </button>
            </Link>

            {user.image && (
              //profile image display when user login
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    className='rounded-full cursor-pointer'
                    src={user.image}
                    alt='user'
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}

            <button
              //logout
              //button & onClick is always stick together
              type='button'
              className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

/**

tsx is using typescript and jsx

<Link href='/' > is point to home

npm react google login
google button login without styling

px is pading x & py is pading y axis
hover:
cursor-pointer is hand mouse 

jwt-decode
to decode the json web token to get profile pic
google identity services only alow login but does not allow to get profile pic thats why jwt-deocde comes
then go to _app.tsx 
*/