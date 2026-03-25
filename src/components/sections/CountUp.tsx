'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

export function CountUp({ value }: { value: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const numericPart = parseInt(value.replace(/\D/g, ''), 10)
  const suffix = value.replace(/[\d]/g, '')
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))

  useEffect(() => {
    if (isInView && !isNaN(numericPart)) {
      animate(motionValue, numericPart, { duration: 2, ease: 'easeOut' })
    }
  }, [isInView, numericPart, motionValue])

  return (
    <p ref={ref} className="font-heading text-3xl font-bold text-primary">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </p>
  )
}
