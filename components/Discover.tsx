import React from 'react';

import { NextPage } from 'next';
//next routing
import Link from 'next/link';
import { useRouter } from 'next/router';

//footer, array of topic
import { topics } from '../utils/constants';

const Discover: NextPage = () => {
  //grab data inside url using next router
  const router = useRouter();
  //extract/destructure topic from router
  const { topic } = router.query;

  const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]';
  const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {topics?.map((item) => (
          //dynamic template literals: / *link ? *existOrNot topic= variable > item.name
          //1st: call variable 2nd: display inside <div></div>
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}>
              <span className='font-bold text-2xl xl:text-md '>
                {item.icon}
              </span>
              <span className={`font-medium text-md hidden xl:block capitalize`}>
                {item.name}
              </span>
            </div>
          </Link>
          //
        ))}
      </div>
    </div>
  );
};

export default Discover;

/**

template literals
dynamic values in template using `${ }`

styling
<div className={topic === item.name ? activeTopicStyle : topicStyle}>
1st: create const for each style 2nd: at div then process/apply the styles based on router.query
no need to create oustide function(), just based on router query
bind classname styling with router query

*/