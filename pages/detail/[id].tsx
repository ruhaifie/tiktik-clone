//square bracket *[], in file base routing. this means its dynamic eg:that random text on url/id

//react
import React, { useEffect, useRef, useState } from 'react';

//next
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

//icons
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import Comments from '../../components/Comments';
import LikeButton from '../../components/LikeButton';
import { BASE_URL } from '../../utils';   //.env

//zustand
import useAuthStore from '../../store/authStore';
//ts types that we create before
import { Video } from '../../types';

//axios
import axios from 'axios';

//Quest: fetch data for detail? Ans: using id inside URL

interface IProps {
  postDetails: Video;
}

//return props:{postDetails} from below
const Detail = ({ postDetails }: IProps) => {
  //state
  const [post, setPost] = useState(postDetails);    //no of likes
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  //ts ref <<HTMLVideoElement>
  const videoRef = useRef<HTMLVideoElement>(null);
  //route back to home page
  const router = useRouter();

  //zustand, to check whos log in
  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  //dependencies, when that state change
  useEffect(() => {
    //if post exist as well
    if (post && videoRef?.current) {
      //isVideoMuted is bool, so switch true false true etc
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  //like unlike post
  //[id].tsx and likes.ts connect via PUT method. if req is put then go to likes.ts
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      //if destructure {data}, so likes: data.likes
      //if want to update something, use put 
      const res = await axios.put(`${BASE_URL}/api/like`, {
        //pass object as 2nd param
        userId: userProfile._id,
        postId: post._id,
        like
      });
      //whenever want to set object: open new object *{} ,then spread previous post, then select which property want to update
      //res.data.likes contain new data to update inside likes:
      setPost({ ...post, likes: res.data.likes });
    }
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        //which video is we posting comment
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          //2nd param, object contain userId
          userId: userProfile._id,
          //actual comment, coming from input
          comment,
        });


        setPost({ ...post, comments: res.data.comments });
        setComment('');   //clear input field
        setIsPostingComment(false); //end post
      }
    }
  };

  return (
    <>
      {post && (
        <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
          <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
            <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
              {/* route back to home page */}
              <p className='cursor-pointer ' onClick={() => router.back()}>
                <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
              </p>
            </div>
            <div className='relative'>
              <div className='lg:h-[100vh] h-[60vh]'>
                <video
                  //video element
                  ref={videoRef}
                  onClick={onVideoClick}
                  loop
                  //types.d.ts of video
                  src={post?.video?.asset.url}
                  className=' h-full cursor-pointer'
                ></video>
              </div>

              <div className='absolute top-[45%] left-[40%]  cursor-pointer'>
                {!isPlaying && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                  </button>
                )}
              </div>
            </div>
            <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer'>
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-3xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-3xl lg:text-4xl' />
                </button>
              )}
            </div>
          </div>

          {/* right side */}
          <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
            <div className='lg:mt-20 mt-10'>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
                  <Image
                    width={60}
                    height={60}
                    alt='user-profile'
                    className='rounded-full'
                    src={post.postedBy.image}
                  />
                  <div>
                    <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                      {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                      <GoVerified className='text-blue-400 text-xl' />
                    </div>
                    <p className='text-md'> {post.postedBy.userName}</p>
                  </div>
                </div>
              </Link>
              <div className='px-10'>
                <p className=' text-md text-gray-600'>{post.caption}</p>
              </div>
              <div className='mt-10 px-10'>
                {/* if there is user then render like component */}
                {userProfile && <LikeButton
                  //[id].tsx send likes props to likeButton.tsx
                  likes={post.likes}
                  flex='flex'
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />}
              </div>
              <Comments
                //passing props to comments components
                comment={comment}
                setComment={setComment}
                addComment={addComment} //comments.tsx
                comments={post.comments}
                isPostingComment={isPostingComment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

//grab id inside URL *1st param
export const getServerSideProps = async ({
  params: { id },
}: {
  //ts rules, type for id above | : means equal to
  params: { id: string };
}) => {
  //call to API to fetch full data for the POST
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);
  //detail > [id].tsx pass to | api > post > [id].ts

  //postDetails is equal to res.data
  return {
    props: { postDetails: res.data },
  };
};

export default Detail;
