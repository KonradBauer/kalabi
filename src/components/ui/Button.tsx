import Link from 'next/link'
import React from 'react'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const variants = {
  primary:
    'cursor-pointer bg-accent text-primary hover:bg-primary hover:text-surface transition-colors duration-200',
  secondary:
    'cursor-pointer bg-primary text-surface hover:bg-secondary transition-colors duration-200',
  outline:
    'cursor-pointer border border-primary text-primary hover:bg-primary hover:text-surface transition-colors duration-200',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-medium tracking-wide uppercase font-body ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
