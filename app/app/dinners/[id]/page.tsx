'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Dinner = {
  id: string; title: string; description: string | null
  location: string | null; latitude: number | null; longitude: number | null
  date: string | null; created_at: string; created_by: string
}
type Guest = {
  id: string; rsvp_status: string; responded_at: string | null
  users: { name: string; email: string } | null
}

const rsvpLabel: Record<string, { label: string; color: string }> = {
  yes:     { label: 'Confirmado',  color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  no:      { label: 'Não vai',     color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  maybe:   { label: 'Talvez',      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  pending: { label: 'Pendente',    color: 'bg-white/[0.05] text-white/30 border-white/[0.08]' },
}

export default function DinnerPage() {
  const { id } = useParams<{ id: string }>()
  const [dinner, setDinner] = useState<Dinner | null>(null)
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { location.href = '/login'; return }

      const [{ data: d }, { data: g }] = await Promise.all([
        supabase.from('dinners').select('*').eq('id', id).single(),
        supabase.from('dinner_guests').select('id, rsvp_status, responded_at, users(name, email)').eq('dinner_id', id),
      ])

      setDinner(d)
      setGuests(g ?? [])
      setLoading(false)
    })
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  if (!dinner) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <p className="text-white/30">Jantar não encontrado.</p>
    </div>
  )

  const fmt = (d: string) => new Date(d).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  const confirmed = guests.filter(g => g.rsvp_status === 'yes').length

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          <a href="/app" className="text-white/30 hover:text-white/60 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </a>
          <span className="text-white/20">|</span>
          <a href="/" className="font-serif text-lg text-amber-100/90 hover:text-amber-400 transition-colors">DinHub</a>
          <span className="text-xs text-white/20 ml-1">/ {dinner.title}</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-white/30 tracking-widest uppercase mb-2">
            {dinner.date && new Date(dinner.date) < new Date() ? 'Realizado' : 'Próximo jantar'}
          </p>
          <h1 className="font-serif text-5xl text-amber-100 mb-3">{dinner.title}</h1>
          {dinner.description && <p className="text-white/40 max-w-xl">{dinner.description}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <p className="text-2xl font-medium text-amber-100 mb-1">{confirmed}</p>
            <p className="text-xs text-white/30">Confirmados</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <p className="text-2xl font-medium text-amber-100 mb-1">{guests.length}</p>
            <p className="text-xs text-white/30">Convidados</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <p className="text-2xl font-medium text-amber-100 mb-1">{guests.filter(g => g.rsvp_status === 'pending').length}</p>
            <p className="text-xs text-white/30">Pendentes</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {/* Left — info + guests */}
          <div className="col-span-3 flex flex-col gap-6">
            {/* Details */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 flex flex-col gap-4">
              {dinner.date && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-amber-400/60">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5">Data & Hora</p>
                    <p className="text-sm text-white/70 capitalize">{fmt(dinner.date)}</p>
                  </div>
                </div>
              )}
              {dinner.location && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-amber-400/60">
                      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5">Local</p>
                    <p className="text-sm text-white/70">{dinner.location}</p>
                    {dinner.latitude && dinner.longitude && (
                      <a href={`https://www.google.com/maps/search/?api=1&query=${dinner.latitude},${dinner.longitude}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-400/60 hover:text-amber-400 mt-1 transition-colors">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Abrir no Google Maps
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Guests */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
              <h2 className="text-sm font-medium text-white/60 mb-4">Convidados ({guests.length})</h2>
              {guests.length === 0 ? (
                <p className="text-xs text-white/20">Nenhum convidado ainda.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {guests.map(g => {
                    const r = rsvpLabel[g.rsvp_status] ?? rsvpLabel.pending
                    const name = g.users?.name ?? 'Desconhecido'
                    const email = g.users?.email ?? ''
                    const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
                    return (
                      <div key={g.id} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs text-amber-300 font-medium">{initials}</div>
                          <div>
                            <p className="text-sm text-white/70">{name}</p>
                            <p className="text-xs text-white/25">{email}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${r.color}`}>{r.label}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right — map */}
          <div className="col-span-2">
            {dinner.latitude && dinner.longitude ? (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden sticky top-20">
                <div className="h-72">
                  <iframe
                    title="mapa"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${dinner.longitude - 0.008},${dinner.latitude - 0.008},${dinner.longitude + 0.008},${dinner.latitude + 0.008}&layer=mapnik&marker=${dinner.latitude},${dinner.longitude}`}
                    className="w-full h-full"
                    style={{ filter: 'invert(0.9) hue-rotate(190deg) brightness(0.85)' }}
                  />
                </div>
                <div className="px-4 py-3 border-t border-white/[0.05]">
                  <p className="text-xs text-white/30 truncate">{dinner.location}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.03] border border-white/[0.06] border-dashed rounded-xl h-72 flex items-center justify-center">
                <p className="text-xs text-white/20">Sem localização</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
