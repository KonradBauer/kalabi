'use client'

import { useEffect } from 'react'

const svg = (bg: string, fg: string) =>
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="${bg}"/><text x="50%25" y="55%25" dominant-baseline="middle" text-anchor="middle" font-family="Georgia,serif" font-size="20" font-weight="700" fill="${fg}">K</text><line x1="6" y1="26" x2="26" y2="26" stroke="%23c9a96e" stroke-width="1.5"/></svg>`

const LIGHT = svg('%23ffffff', '%231a1a1a')
const DARK = svg('%231a1a1a', '%23c9a96e')

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
