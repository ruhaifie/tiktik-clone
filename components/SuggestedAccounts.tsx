import React, { useEffect } from 'react';

import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';

import { GoVerified } from 'react-icons/go';

//types to use at allUsers
import { IUser } from '../types';

interface IProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}

//receive prop from sidebar.tsx
const SuggestedAccounts: NextPage<IProps> = ({ fetchAllUsers, allUsers }) => {

  //call at the start/inital render
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  //
  const users = allUsers
    .sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested accounts
      </p>
      <div>
        {/* show limited display users 0-6 */}
        {users?.slice(0, 6).map((user: IUser) => (
          //link that links to user profile page
          <Link href={`/profile/${user._id}`} key={user._id}>
            {/* have grab user id, then can access to user name, image */}
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  width={34}
                  height={34}
                  className='rounded-full'
                  src={user.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>

              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {/* replace all space with no space | 1sty param what to replace 2nd is replace with what */}
                  {user.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
