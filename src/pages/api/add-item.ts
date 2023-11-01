import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_w8stwzpw6FUvUZhH6BBD5LSUL1QLywDuj0zd3DxawVo',
});

const databaseId = '74779e6b4a0847b996a41a520479d25e';

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
    console.log(response);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { name } = req.query;
  if (name == null) {
    return res.status(400).json({ message: 'name is required' });
  }
  try {
    await addItem(String(name));
    res.status(200).json({ message: 'jacket' });
  } catch (e) {
    res.status(400).json({ message: 'failed to add' });
  }
}
