import type { NextApiRequest, NextApiResponse } from 'next';

import { allUsersQuery } from './../../utils/queries';
import { client } from '../../utils/client';

//next js api handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //if(req.method === 'POST'){ below code inside here }
  //get doc, data request is getting inside req.body
  const doc = req.body;

  //call sanity client
  client.createIfNotExists(doc)
    .then(() => {
      res.status(200).json('Login successful');
    });
}
