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
    'w-full border border-border bg-surface px-4 py-3 text-primary placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors'

  return (
    <div>
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-accent/30 bg-accent/5 p-8 text-center"
          >
            <div className="mb-4 text-4xl text-accent">✓</div>
            <h3 className="font-heading text-xl font-bold text-primary">Dziękujemy!</h3>
            <p className="mt-2 text-muted">
              Twoja wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.
            </p>
            <button
              onClick={() => setState('idle')}
              className="mt-6 text-sm font-medium text-accent hover:text-secondary"
            >
              Wyślij kolejną wiadomość
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

            {state === 'error' && (
              <p className="text-sm text-red-600">
                {errorMessage || 'Wystąpił błąd. Spróbuj ponownie.'}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'submitting'}
              className="cursor-pointer inline-flex w-full items-center justify-center bg-accent px-8 py-4 text-base font-medium uppercase tracking-wide text-primary transition-colors hover:bg-secondary hover:text-surface disabled:opacity-50 sm:w-auto"
            >
              {state === 'submitting' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
