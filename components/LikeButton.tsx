import React, { useEffect, useState } from 'react';

import { MdFavorite } from 'react-icons/md';

import { NextPage } from 'next';

//zustand
import useAuthStore from '../store/authStore';
//if want to update something, use put 
/**
eg: const response = await axios.put(`${BASE_URL}/api/like`, {
  //pass object as 2nd param
  userId: userProfile._id, 
  postId:post._id
})
*/

interface IProps {
  likes: any;   //likes which is array of any types
  flex: string;
  //function type, if not return anything then void
  handleLike: () => void;
  handleDislike: () => void;
}

//receive props from detail > [id].tsx
//[id].tsx send likes props to likeButton.tsx
const LikeButton: NextPage<IProps> = ({ likes, flex, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  //zustand
  const { userProfile }: any = useAuthStore();
  //if user has already like the post. item is like *1 spec item. check if like of that user inside likes array
  //check the likes array if contain like from user
  let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);   //_ref: userId, in like.ts
  //compare data from likes array & like AND userProfile from zustand then put inside filterLikes
  //question mark *? means exist or not exist
  //console.log(filterLikes);
  

  //call whenever likes array changes
  useEffect(() => {
    //if user like post
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className={`${flex} gap-6`}>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {/* if already like *ternary operator ? (true) : (false) */}
        {alreadyLiked ? (
          <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997] ' onClick={handleDislike} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={handleLike} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
