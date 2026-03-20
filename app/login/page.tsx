'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Mode = 'login' | 'signup'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  const handleGoogle = async () => {
    setError(null)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Conta criada! Verifica o teu e-mail para confirmar.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('E-mail ou password incorretos.')
      } else {
        location.href = '/app'
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      {/* Background blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <a href="/" className="block text-center mb-8">
          <span className="font-serif text-2xl text-amber-100">DinHub</span>
        </a>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
          {/* Title */}
          <h1 className="font-serif text-2xl text-amber-100 mb-1">
            {mode === 'login' ? 'Bem-vindo de volta.' : 'Criar conta.'}
          </h1>
          <p className="text-sm text-white/40 mb-6">
            {mode === 'login'
              ? 'Entra para aceder às tuas reservas.'
              : 'Começa a organizar jantares hoje.'}
          </p>

          {/* Social buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={handleGoogle}
              className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg text-sm text-white/80 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continuar com Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-xs text-white/30">ou</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="O teu nome"
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-white/50 mb-1.5">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="tu@exemplo.com"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {success && (
              <p className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-amber-950 font-medium text-sm rounded-lg transition-colors"
            >
              {loading ? '...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-xs text-white/30 mt-6">
            {mode === 'login' ? 'Não tens conta?' : 'Já tens conta?'}{' '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); setSuccess(null) }}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              {mode === 'login' ? 'Criar conta' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
