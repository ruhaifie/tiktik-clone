import type { NextApiRequest, NextApiResponse } from 'next';

//sanity query fetch from here
import { postDetailQuery } from './../../../utils/queries';
//sanity client
import { client } from '../../../utils/client';
import { uuid } from 'uuidv4';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    //detail > [id].tsx pass to | api > post > [id].ts

    //fetch id from req.query. data pass through query
    const { id } = req.query;
    //sanity query
    const query = postDetailQuery(id);

    //grab data | sanity client
    const data = await client.fetch(query);

    //return 1st element of array
    res.status(200).json(data[0]);

    //comment
  } else if (req.method === 'PUT') {
    //get comment and userId from body
    const { comment, userId } = req.body;

    const { id }: any = req.query;


    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          //comment : comment
          comment,
          _key: uuid(),
          postedBy: { _type: 'postedBy', _ref: userId },
        },
      ])
      .commit();

    res.status(200).json(data);
  }
}
