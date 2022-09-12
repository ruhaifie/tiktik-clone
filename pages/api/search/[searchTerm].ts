import type { NextApiRequest, NextApiResponse } from 'next';

import { searchPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { searchTerm } = req.query; //const searchTerm is equivalent to [*same].ts name for this file

    const videosQuery = searchPostsQuery(searchTerm); //searchPostsQuery inside queries.ts

    const videos = await client.fetch(videosQuery);

    res.status(200).json(videos);
  }
}

//thispage: pages > api > search > [searchTerm].ts
//2:08:54