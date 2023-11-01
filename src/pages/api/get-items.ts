import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_w8stwzpw6FUvUZhH6BBD5LSUL1QLywDuj0zd3DxawVo',
});

const databaseId = '74779e6b4a0847b996a41a520479d25e';

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const response = await getItems();
    res.status(200).json({ items: response?.results, message: 'success' });
  } catch (e) {
    res.status(400).json({ message: 'failed' });
  }
}
