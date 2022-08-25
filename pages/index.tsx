import React from 'react';
import axios from 'axios';

//nextjs | this file interact with: api > post > index.ts

//components
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';

import { BASE_URL } from '../utils';
import { Video } from '../types';

//typescript practice. when accept props
//like object, have own name *IProps
//use type that we import from video > utils
interface IProps {
  //array of video
  videos: Video[];
}

//types advantage: we know what we dealing with. its properties

//props videos receive from below
const Home = ({ videos }: IProps) => {
  //console.log(videos); //to use to build types.d.ts

  //using length array method eg:if video exist then map
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length
      //ternary operator ? *true : *else/false
        //applied typescript
        ? videos?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
        : <NoResults text={`No Videos`} />}
    </div>
  );
};

export default Home;

//call sanity from srverSideProp
//next pre render page on each request using data return by getServerSideProps
//situation to use eg:fetch new video each time load page
//calling our own server here from getServerSideProps & index.tsx
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  //template string
  //nextjs use file base routing system so: api > post > index.ts
  let response = await axios.get(`${BASE_URL}/api/post`);
  // console.log(response.data.name);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  //next js props. receive here then populate above inside template. videos
  return {
    props: { videos: response.data },
  };
};

/**
api folder: where all routes locate by default contain hello.ts

what sending at post > index.ts would receive here in index.tsx

inside .map => *contain <div>

only apply typescript type : during script not template 

ternary operator ? *true : *else/false
 */