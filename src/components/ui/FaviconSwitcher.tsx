'use client'

import { useEffect } from 'react'

const svg = (stroke: string) =>
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">` +
  `<polyline points="2,14 16,3 30,14" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<rect x="5" y="14" width="22" height="15" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<rect x="12" y="20" width="8" height="9" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` +
  `</svg>`

const LIGHT = svg('%231a1a1a')
const DARK = svg('%23c9a96e')

export function FaviconSwitcher() {
  useEffect(() => {
    const applyFavicon = (dark: boolean) => {
      let link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.type = 'image/svg+xml'
      link.href = dark ? DARK : LIGHT
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    applyFavicon(mq.matches)

    const handler = (e: MediaQueryListEvent) => applyFavicon(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return null
}
