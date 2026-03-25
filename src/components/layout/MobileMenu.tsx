'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

type NavItem = {
  label: string
  link: string
  newTab?: boolean | null
}

type MobileMenuProps = {
  navItems: NavItem[]
  cta?: {
    label?: string | null
    link?: string | null
  } | null
}

export function MobileMenu({ navItems, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-6 bg-primary"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block h-0.5 w-6 bg-primary"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-6 bg-primary"
        />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-primary/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 flex w-80 flex-col bg-surface px-8 pt-24 shadow-2xl"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={item.link}
                  target={item.newTab ? '_blank' : undefined}
                  onClick={() => setIsOpen(false)}
                  className="block border-b border-border py-4 text-lg font-medium uppercase tracking-wider text-primary transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            {cta?.label && cta?.link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Button href={cta.link} className="w-full" onClick={() => setIsOpen(false)}>
                  {cta.label}
                </Button>
              </motion.div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
