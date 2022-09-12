//nextjs backend for like/unlike post
import type { NextApiRequest, NextApiResponse } from 'next';

//unique identifier, allow attach unique identifier to every single like
//to tracking put request
import { uuid } from 'uuidv4';

import { client } from '../../utils/client';

//[id].tsx and likes.ts connect via PUT method. if req is put then go to likes.ts
export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  //PUT for update
  if (req.method === 'PUT') {
    //destrutue req.body
    const { userId, postId, like } = req.body;

    //function to like & unlike post
    const data = 
    //like ? ,is if like
    like ? await client
      //patch is change something
      .patch(postId)
      //only happen for 1st like, set likes to empty array
      .setIfMissing({ likes: [] })
      //insert is put at the end, after strings of likes minus 1 aka end of the array. then insert object that have key property
      .insert('after', 'likes[-1]', [
        {
          _key: uuid(),
          _ref: userId, //know who like the post
        },
      ])
      //after insert, call commit() .this would save it
      .commit()
      //if not like *else
    : await client
      .patch(postId)
      //unset() ,check all the likes,find the like inside the likes array that has _ref equeal to userID then remove
      //after that commit
      .unset([`likes[_ref=="${userId}"]`])  //double quotes strings " "
      .commit();

    //get/return the data
    res.status(200).json(data);
  }
}
