import type { NextApiRequest, NextApiResponse } from 'next';

import { allUsersQuery } from './../../utils/queries';  //queries.ts | const query = `*[_type == "user"]`;
import { client } from '../../utils/client';

//endpoint to fetch users
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await client.fetch(allUsersQuery());
  
  //data exist
  if(data) {
    res.status(200).json(data);
  } else {
    res.json([]);
  }
}