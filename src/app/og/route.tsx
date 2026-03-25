import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'Kalabi'
  const subtitle = searchParams.get('subtitle') || 'Meble na wymiar'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
          fontFamily: 'serif',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: '#c9a96e',
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#faf9f6',
            letterSpacing: 8,
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#9a9a9a',
            letterSpacing: 4,
            marginTop: 20,
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 200,
            height: 2,
            backgroundColor: '#c9a96e',
            marginTop: 30,
          }}
        />

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 16,
            color: '#6b5b3e',
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          kalabi.pl
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
