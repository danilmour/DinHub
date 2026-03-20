// components/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <a href="/" className="font-serif text-lg text-text-tertiary hover:text-text-secondary transition-colors">
            DinHub
          </a>
          <nav className="flex items-center gap-6 text-xs text-text-tertiary">
            <a href="/privacy" className="hover:text-text-secondary transition-colors">
              Privacidade
            </a>
            <span className="text-border">·</span>
            <a href="/terms" className="hover:text-text-secondary transition-colors">
              Termos
            </a>
            <span className="text-border">·</span>
            <a href="/contact" className="hover:text-text-secondary transition-colors">
              Contacto
            </a>
          </nav>
        </div>

        {/* Row 2 */}
        <div className="text-center">
          <p className="text-xs text-text-tertiary">
            © 2025 DinHub. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
