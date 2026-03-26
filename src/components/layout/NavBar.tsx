'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
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
      <header className={`fixed inset-x-0 top-0 z-[60] border-b backdrop-blur-md transition-colors duration-300 ${menuOpen ? 'border-transparent bg-transparent' : 'border-border/50 bg-surface/95'}`}>
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-[60] flex items-center py-2">
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={240}
              height={140}
              priority
              className={`h-20 w-auto transition-all duration-300 ${menuOpen ? '' : 'invert'}`}
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
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium uppercase tracking-wide text-primary transition-colors duration-200 hover:bg-primary hover:text-surface"
              >
                {cta.label}
              </Link>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative z-[60] flex h-10 w-10 items-center justify-center transition-colors hover:text-accent lg:hidden ${menuOpen ? 'text-surface' : 'text-primary'}`}
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            {menuOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
          </button>
        </Container>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 36px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-primary"
          >
            {/* Decorative accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-8 right-8 top-[72px] h-px origin-left bg-accent/30"
            />

            {/* Decorative corner accent */}
            <div className="absolute bottom-12 right-8 h-24 w-24 rounded-full border border-accent/10" />
            <div className="absolute bottom-16 right-12 h-16 w-16 rounded-full border border-accent/5" />

            {/* Spacer for header */}
            <div className="h-[72px] shrink-0" />

            {/* Nav items centered */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.link}
                    onClick={() => setMenuOpen(false)}
                    className="group relative block py-3 text-center font-heading text-3xl font-semibold uppercase tracking-wider text-surface/90 transition-colors hover:text-accent sm:text-4xl"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.span
                      className="absolute inset-x-0 bottom-2 h-px origin-left bg-accent/40"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}

              {cta && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + navItems.length * 0.07 + 0.1, duration: 0.5 }}
                  className="mt-10"
                >
                  <Link
                    href={cta.link}
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-medium uppercase tracking-wide text-primary transition-colors duration-200 hover:bg-surface hover:text-primary"
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
