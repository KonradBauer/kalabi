'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Wystąpił błąd')
      }

      setState('success')
      form.reset()
    } catch (err) {
      setState('error')
      setErrorMessage(err instanceof Error ? err.message : 'Wystąpił błąd')
    }
  }

  const inputClasses =
    'w-full rounded-xl border border-border bg-surface px-4 py-3 text-primary placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors'

  return (
    <div>
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-surface to-accent/10 px-6 py-16 text-center shadow-lg"
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/5" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent/5" />

            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10"
            >
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="text-accent"
              >
                <motion.path
                  d="M10 20L17 27L30 13"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                />
              </motion.svg>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-heading text-2xl font-bold text-primary"
            >
              Wiadomość wysłana!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mx-auto mt-3 max-w-md text-muted"
            >
              Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe - zwykle w ciągu 24 godzin.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setState('idle')}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent/30 px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Wyślij kolejną wiadomość
            </motion.button>
          </motion.div>
        ) : state === 'error' ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 via-surface to-red-50/50 px-6 py-14 text-center shadow-lg"
          >
            {/* Animated X icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
            >
              <motion.svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                className="text-red-500"
              >
                <motion.path
                  d="M12 12L24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                />
                <motion.path
                  d="M24 12L12 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                />
              </motion.svg>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-2xl font-bold text-primary"
            >
              Coś poszło nie tak
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mx-auto mt-3 max-w-md text-muted"
            >
              {errorMessage || 'Nie udało się wysłać wiadomości. Sprawdź połączenie internetowe i spróbuj ponownie.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <button
                onClick={() => setState('idle')}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-surface transition-colors hover:bg-secondary"
              >
                Spróbuj ponownie
              </button>
              <a
                href="tel:+48510131577"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14.5 11.35v1.95a1.3 1.3 0 0 1-1.42 1.3A12.86 12.86 0 0 1 7.47 12a12.67 12.67 0 0 1-3.9-3.9A12.86 12.86 0 0 1 1.1 2.42 1.3 1.3 0 0 1 2.4 1h1.95a1.3 1.3 0 0 1 1.3 1.12c.08.63.23 1.25.44 1.84a1.3 1.3 0 0 1-.29 1.37l-.83.83a10.4 10.4 0 0 0 3.9 3.9l.83-.83a1.3 1.3 0 0 1 1.37-.29c.59.2 1.21.36 1.84.44a1.3 1.3 0 0 1 1.12 1.32Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Zadzwoń do nas
              </a>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-primary">
                  Imię i nazwisko *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={inputClasses}
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-primary">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={inputClasses}
                  placeholder="jan@example.pl"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-primary">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={inputClasses}
                  placeholder="+48 123 456 789"
                />
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-primary">
                  Temat *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className={inputClasses}
                  placeholder="Meble kuchenne na wymiar"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-primary">
                Wiadomość *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className={inputClasses}
                placeholder="Opisz swój projekt..."
              />
            </div>

            <button
              type="submit"
              disabled={state === 'submitting'}
              className="cursor-pointer inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-medium uppercase tracking-wide text-primary transition-colors duration-200 hover:bg-primary hover:text-surface disabled:opacity-50 sm:w-auto"
            >
              {state === 'submitting' ? (
                <span className="inline-flex items-center gap-3">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Wysyłanie...
                </span>
              ) : (
                'Wyślij wiadomość'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
