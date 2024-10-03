import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await cloudinary.uploader.upload(req.body, {
    upload_preset: 'voicesfromvenezuela',
  });

  console.log(data);

  return NextResponse.json(data);
}
