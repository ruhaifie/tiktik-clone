import type { NextApiRequest, NextApiResponse } from 'next';

import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //pages > profile > [userId].tsx | const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);
  if (req.method === 'GET') {

    //fetch id from req.query
    const { id } = req.query;   //url /api/profile/:id, wanna grab that id

    const query = singleUserQuery(id);
    const userVideosQuery = userCreatedPostsQuery(id);
    const userLikedVideosQuery = userLikedPostsQuery(id);

    //fetch user query from above
    const user = await client.fetch(query);
    const userVideos = await client.fetch(userVideosQuery);
    const userLikedVideos = await client.fetch(userLikedVideosQuery);

    //pass object contain user 
    const data = { user: user[0], userVideos, userLikedVideos };

    //send to: pages > profile > [userId].tsx
    res.status(200).json(data);
  }
}

/**
objective: fetch all the post that user that created
 */

//pages > api > profile > [id].ts