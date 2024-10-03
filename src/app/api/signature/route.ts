import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const timestamp = Math.round(Date.now() / 1000);

  const apiSecret = process.env.NEXT_CLOUDINARY_API_SECRET ?? '';
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      upload_preset: process.env.NEXT_CLOUDINARY_UPLOAD_PRESET ?? '',
    },
    apiSecret
  );

  return NextResponse.json({
    signature,
    timestamp,
    api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  });
}
