import React, { useEffect, useRef, useState } from 'react';

//next
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

//icons
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

//types.d.ts
import { Video } from './../types';


interface IProps {
  //accept post, type : video
  post: Video;
  isShowingOnHome?: boolean;
}

//videocard type : nextPage<> then list of its props
const VideoCard: NextPage<IProps> = ({ post: { caption, postedBy, video, _id, likes }, isShowingOnHome }) => {

  //type advantage eg: if console.log(post.bla2) *which does not exist then it would show error. it only abide what inside types.d.ts

  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  //tell ts that HTMLVideoElement have pause and play type so no error | HTMLVideoElement is from video, just hover then vscode show
  const videoRef = useRef<HTMLVideoElement>(null);  //getelementbyId

  const onVideoPress = () => {
    if (playing) {
      //add ? to not crash if not work since videoRef value is null above
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      //if not playing
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  if(!isShowingOnHome) {
    return (
      <div>
        {/* template string, that */}
        <Link href={`/detail/${_id}`}>
          <video
            loop
            src={video.asset.url}
            className='w-[250px] md:w-full rounded-xl cursor-pointer'
          ></video>
        </Link>
            <div className='flex gap-2 -mt-8 items-center ml-4'>
              <p className='text-white text-lg font-medium flex gap-1 items-center'>
                <BsPlay className='text-2xl' />
                {likes?.length || 0}
              </p>
            </div>
        <Link href={`/detail/${_id}`}>
          <p className='mt-5 text-md text-gray-800 cursor-pointer w-210'>
            {caption}
          </p>
        </Link>
      </div>
    )
  }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${postedBy?._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className=' rounded-full'
                  src={postedBy?.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postedBy?._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {postedBy.userName}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p className='mt-2 font-normal '>{caption}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4 relative'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className='rounded-3xl'
        >
          <Link href={`/detail/${_id}`}>
            <video
              loop
              ref={videoRef}
              src={video.asset.url}
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
            ></video>
          </Link>

          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3'>
              {playing ? (
                //if play
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                //if not play
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

/**

Use useRef if need to manage focus, text selection, trigger imperative animations or integrating third-party libraries.

tips
cant put image as a child component, need empty react fragment <> </> and then can put <image> inside
*/