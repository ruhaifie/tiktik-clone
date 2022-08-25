//react
import React, { useEffect, useState } from 'react';

//sanity | import type from sanity to define type state
import { SanityAssetDocument } from '@sanity/client';

//next. allow to re-route back to home
import { useRouter } from 'next/router';

//icons
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

//axios
import axios from 'axios';

//zustand
import useAuthStore from '../store/authStore';

import { BASE_URL } from '../utils';
import { client } from '../utils/client';
//category/topics
import { topics } from '../utils/constants';

//upload component
const Upload = () => {

  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState<String>(topics[0].name); //show the 1st topic by default
  const [loading, setLoading] = useState<Boolean>(false);
  const [savingPost, setSavingPost] = useState<Boolean>(false);
  //define the type of state | import type from sanity, or *| undefined as start with undefine
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false);

  //get user info from zustand
  //const {userProfile} : {userProfile:any} = useAuthStore() | declare its type to any, so id below define its type
  const userProfile: any = useAuthStore((state) => state.userProfile);
  const router = useRouter();

  useEffect(() => {
    if (!userProfile) router.push('/');
  }, [userProfile, router]);

  //upload video
  const uploadVideo = async (e: any) => {
    //grab, 0 as 1st files
    const selectedFile = e.target.files[0];
    //fileTypes is our own rule, not from any framework lib.if not state like this, means that type is from lib/framework
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    //uploading asset to sanity
    //check tha file types
    if (fileTypes.includes(selectedFile.type)) {
      //true video type
      setWrongFileType(false);
      setLoading(true);

      //sanity | 1st param, 'file' type | 2nd param, grab selectedFile
      client.assets
        .upload('file', selectedFile, {
          //3rd param | option object
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        //
        .then((data) => {
          //need to define type of state
          setVideoAsset(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    //if all below exist, && chained
    if (caption && videoAsset?._id && topic) {
      setSavingPost(true);

      //form document to save to sanity database
      const doc = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            //refer to what we upload above, then merge & connect with post | 1st:upload 2nd:merge
            _ref: videoAsset?._id,
          },
        },
        //connect with user as well the one post it
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          //ref to userProfile get from zustand
          _ref: userProfile?._id,
        },
        topic,
      };

      //then send to backend route
      await axios.post(`${BASE_URL}/api/post`, doc);

      //as soon as we upload, re-direct us back to home page
      router.push('/');
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setCaption('');
    setTopic('');
  };

  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
      <div className=' bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>
          <div className=' border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {loading ? (
              <p className='text-center text-3xl text-red-400 font-semibold'>
                Uploading...
              </p>
            ) : (
              <div>
                {/*  */}
                {!videoAsset ? (
                  //no *! video available, select to upload
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className='text-xl font-semibold'>
                          Select video to upload
                        </p>
                      </div>

                      <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select file
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      onChange={(e) => uploadVideo(e)}
                      className='w-0 h-0'
                    />
                  </label>
                ) : (
                  <div className=' rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center'>
                    <video
                      className='rounded-xl h-[462px] mt-16 bg-black'
                      //controls so can slide move around video lentgh
                      controls
                      loop
                      //question means *? not always availbe 
                      src={videoAsset?.url}
                    />
                    <div className=' flex justify-between gap-20'>
                      <p className='text-lg'>{videoAsset.originalFilename}</p>
                      <button
                        type='button'
                        className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                        onClick={() => setVideoAsset(undefined)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {wrongFileType && (
            <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[260px]'>
              Please select an video file (mp4 or webm or ogg)
            </p>
          )}
        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <label className='text-md font-medium '>Caption</label>
          <input
            //caption
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}  //value of key press store here
            className='rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
          />
          <label className='text-md font-medium '>Choose a topic</label>

          <select
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className='outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
          >
            {topics.map((item) => (
              //render different topic from utils
              <option
                key={item.name}   //due to looping, so react can diff em
                className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                value={item.name} //to grab later
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10'>
            <button
              onClick={handleDiscard} //remove
              type='button'
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Discard
            </button>
            <button
              disabled={videoAsset?.url ? false : true}
              onClick={handlePost}  //post/upload
              type='button'
              className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              {savingPost ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

/**

FORMATTING:

<div>
{ ? (
  <p> true </p>
) : (
  <p> false </p>
) }
</div>

<input
  type='text'
  value={caption}
  onChange={(e) => setCaption(e.target.value)}
  className=''
/>

<option>

typescript
cn be hussle or advantage as it reminds us its propertis within boundaries 
*/