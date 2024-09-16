import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          color: 'black',
          background: '#ffd700',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Voices from Venezuela
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
