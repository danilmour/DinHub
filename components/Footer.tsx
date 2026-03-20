// components/Footer.tsx
import type { FooterContent } from '@/features/landing/domain/landing-content'

interface FooterProps {
  content: FooterContent
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <a href="/" className="font-serif text-lg text-text-tertiary hover:text-text-secondary transition-colors">
            {content.brandLabel}
          </a>
          <nav className="flex items-center gap-6 text-xs text-text-tertiary">
            {content.links.map((link, index) => (
              <div key={link.href} className="flex items-center gap-6">
                <a href={link.href} className="hover:text-text-secondary transition-colors">
                  {link.label}
                </a>
                {index < content.links.length - 1 ? <span className="text-border">·</span> : null}
              </div>
            ))}
          </nav>
        </div>

        <div className="text-center">
          <p className="text-xs text-text-tertiary">
            {content.legalText}
          </p>
        </div>
      </div>
    </footer>
  )
}
