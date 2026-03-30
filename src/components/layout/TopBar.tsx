import { Phone, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SocialIcon } from '@/components/ui/SocialIcon'

type SocialLink = {
  platform: string
  url: string
}

type TopBarProps = {
  phone?: string | null
  email?: string | null
  socials: SocialLink[]
}

export function TopBar({ phone, email, socials }: TopBarProps) {
  if (!phone && !email && socials.length === 0) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[36px] bg-primary">
      <Container className="flex h-full items-center justify-between text-xs text-surface/70">
        {/* Contact info — left */}
        <div className="flex items-center gap-4 sm:gap-5">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline">{phone}</span>
              <span className="sm:hidden">{phone.replace(/^\+48\s?/, '')}</span>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-accent sm:flex"
            >
              <Mail className="h-3 w-3" />
              <span>{email}</span>
            </a>
          )}
        </div>

        {/* Social icons — right */}
        {socials.length > 0 && (
          <div className="flex items-center gap-3">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface/50 transition-colors hover:text-accent [&_svg]:h-3.5 [&_svg]:w-3.5"
                aria-label={social.platform}
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
