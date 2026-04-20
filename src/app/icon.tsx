import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          background: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 96,
        }}
      >
        <span
          style={{
            color: '#c9a96e',
            fontSize: 340,
            fontWeight: 700,
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.02em',
          }}
        >
          K
        </span>
      </div>
    ),
    { width: 512, height: 512 },
  )
}
