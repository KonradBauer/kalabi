'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'

type NavItem = {
  label: string
  link: string
}

type NavBarProps = {
  logoUrl: string
  logoAlt: string
  navItems: NavItem[]
  cta: { label: string; link: string } | null
}

export function NavBar({ logoUrl, logoAlt, navItems, cta }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-surface/95 backdrop-blur-md">
        <Container className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="relative z-[60] flex items-center">
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={240}
              height={140}
              priority
              className="h-20 w-auto invert"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="text-sm font-medium uppercase tracking-wider text-primary/80 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            {cta && (
              <Link
                href={cta.link}
                className="inline-flex items-center justify-center bg-accent px-5 py-2.5 text-sm font-medium uppercase tracking-wide text-primary transition-all duration-200 hover:bg-primary hover:text-surface"
              >
                {cta.label}
              </Link>
            )}
          </nav>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-primary"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-primary"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-primary"
            />
          </button>
        </Container>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-surface"
          >
            {/* Spacer for header */}
            <div className="h-[72px] shrink-0" />

            {/* Nav items centered */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.link}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-center font-heading text-3xl font-bold uppercase tracking-wider text-primary transition-colors hover:text-accent sm:text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {cta && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + navItems.length * 0.06, duration: 0.4 }}
                  className="mt-8"
                >
                  <Link
                    href={cta.link}
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center bg-accent px-8 py-4 text-base font-medium uppercase tracking-wide text-primary transition-colors hover:bg-secondary hover:text-surface"
                  >
                    {cta.label}
                  </Link>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
