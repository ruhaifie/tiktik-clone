import React from 'react';
import { NextPage } from 'next';

//List & Footer component here

//grab data
import { footerList1, footerList2, footerList3 } from '../utils/constants';

//function
//accept the prop from below to here { items, mt }
//when using typescript, specify which type of element using : *colon then create object *{ }
// { list of props } : { list of props & its types }
//which means items is array of string
const List = ({ items, mt }: { items: string[], mt: Boolean }) => (
  //if empty add margin top
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: string) => (
      <p key={item} className='text-gray-400 text-sm  hover:underline cursor-pointer' >
        {item}
      </p>
    ))}
  </div>
);

const Footer: NextPage = () => (
  //send MULTIPLE items as props to List component
  //items contains footerList, then cycle .map() in above function()
  <div className='mt-6 hidden xl:block'>
    <List items={footerList1} mt={false} />
    <List items={footerList2} mt />
    <List items={footerList3} mt />
    <p className='text-gray-400 text-sm mt-5'>© 2022 TikTik</p>
  </div>
);

export default Footer;

/**

.map() inside <div></div> tags

grab 

margin top = false for 1st footer, others is true auto:does not need to state true

react component does not need to be different file, 
eg: <List> here is from const List, theres no List.js etc
then <List> is inside Footer to be export
*/