//for type: e.target.value setComment
import React, { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

//zustand
import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

//props receive from [id].tsx
interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;   //nested type
  addComment: (e: React.FormEvent) => void; //function
  comments: IComment[]; //array of below interface | put [] to make array
}

//from above. 2nd interface | Icomment array properties
interface IComment {
  comment: string;
  length?: number;  //optional length property | ? means optional
  _key: string;
  postedBy: { _ref?: string; _id?: string };  //who created it
}

//props rec eive from [id].tsx
const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {
  const { allUsers, userProfile }: any = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[457px]'>
        {/* eg: 1st post does not have comment, so need to show it tho. tht use of ? *optional */}
        {comments?.length > 0 ? (
          //individual item contain Icomment, idx is index
          comments?.map((item: IComment, idx: number) => (
            <>
            {/* map over all users, each individual user what they comment */}
              {allUsers?.map(
                (user: IUser) =>
                //does this user posted specific comment | look for a ref or id 
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=' p-2 items-center' key={idx}>
                      {/* Link must contain several div have contents, cant straight contents */}
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex items-start gap-3'>
                          <div className='w-12 h-12'>
                            <Image
                              width={48}
                              height={48}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-profile'
                              layout='responsive'
                            />
                          </div>

                          <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                            {user.userName}{' '}
                            <GoVerified className='text-blue-400' />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className='-mt-5 ml-16 text-[16px] mr-8'>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text='No Comments Yet! Be First to do add the comment.' />
        )}
      </div>
     {userProfile && <div className='absolute bottom-0 left-0  pb-6 px-2 md:px-10 '>
        <form onSubmit={addComment} className='flex gap-4'>
          <input
            value={comment}
            //keep track comment on input, .trim() remove leading and trailing whitespace
            onChange={(e) => setComment(e.target.value)}
            className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            placeholder='Add comment..'
          />
          <button className='text-md text-gray-400 ' onClick={addComment}>
            {isPostingComment ? 'Commenting...' : 'Comment'}
          </button>
        </form>
      </div>}
    </div>
  );
};

export default Comments;

/**

//keep track comment on input, remove leading and trailing whitespace
onChange={(e) => setComment(e.target.value.trim())}
 */