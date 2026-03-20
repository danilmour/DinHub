'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type User = { name: string; email: string }

export default function AppPage() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { location.href = '/login'; return }
      setUser({
        name: data.user.user_metadata?.full_name ?? data.user.email?.split('@')[0] ?? 'Utilizador',
        email: data.user.email ?? '',
      })
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    location.href = '/'
  }

  if (!user) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  const initials = user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="font-serif text-lg text-amber-100/90 hover:text-amber-400 transition-colors">
            DinHub
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30 hidden sm:block">{user.email}</span>
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs font-medium text-amber-300">
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-white/30 hover:text-white/60 transition-colors px-2 py-1"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-white/30 tracking-widest uppercase mb-2">Dashboard</p>
          <h1 className="font-serif text-4xl text-amber-100">
            Olá, {user.name.split(' ')[0]}.
          </h1>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Próximos jantares', value: '0' },
            { label: 'Confirmações pendentes', value: '0' },
            { label: 'Jantares realizados', value: '0' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-2xl font-medium text-amber-100 mb-1">{stat.value}</p>
              <p className="text-xs text-white/30">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div className="border border-white/[0.06] border-dashed rounded-2xl flex flex-col items-center justify-center py-24 px-8 text-center">
          {/* Fork & knife icon */}
          <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400/70">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
            </svg>
          </div>

          <h2 className="font-serif text-2xl text-amber-100 mb-2">
            Nenhum jantar marcado.
          </h2>
          <p className="text-sm text-white/30 mb-8 max-w-xs">
            Cria o teu primeiro jantar e a equipa recebe o convite no WhatsApp.
          </p>

          <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-medium text-sm rounded-lg transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Criar jantar
          </button>
        </div>

      </main>
    </div>
  )
}
