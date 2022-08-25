//next back-end/server-side: request & response
//nextjs | this file interact with: pages > index.tsx

//server
import type { NextApiRequest, NextApiResponse } from 'next';

//call to api sanity for get request

import { allPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

/* type Data = {
  name: string
}

export defaul function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  {
    res.status(200).json({ name: 'response success' })
  }
) */

//typescript: req is for NextApiRequest *ctrl + click to check
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  //axios.get from index.tsx
  if (req.method === 'GET') {
    //allPostsQuery from utils > queries.ts
    const query = allPostsQuery();    //to use below

    //fetch data from client *sanity
    //utils > client.ts | sanity credentials info
    const data = await client.fetch(query);

    //pass data back to front-side
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    //if req is post route, get that body the one we just pass
    const doc = req.body;

    //then call the client, then pass that doc to client
    client.create(doc).then(() => {
      //status 201: created
      res.status(200).json('video created');
    });
  }
}

/**

nextjs use file base routing system

shift + alt + a

index.ts call data, data receive send back to index.tsx

each route can be any htto types eg: get, post etc
*/