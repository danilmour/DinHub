'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LocationSearch } from '@/components/LocationSearch'

type AuthUser = { id: string; name: string; email: string }
type Dinner = {
  id: string; title: string; description: string | null
  location: string | null; latitude: number | null; longitude: number | null
  date: string | null; created_at: string; created_by: string
  users: { name: string } | null
  confirmed: number
}
type Form = { title: string; description: string; location: string; date: string; time: string; lat: number | null; lon: number | null }
const emptyForm: Form = { title: '', description: '', location: '', date: '', time: '', lat: null, lon: null }

export default function AppPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [dinners, setDinners] = useState<Dinner[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editDinner, setEditDinner] = useState<Dinner | null>(null)
  const [form, setForm] = useState<Form>(emptyForm)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { location.href = '/login'; return }
      const name = data.user.user_metadata?.full_name ?? data.user.email?.split('@')[0] ?? 'Utilizador'
      setUser({ id: data.user.id, name, email: data.user.email ?? '' })
      fetchDinners()
    })
  }, [])

  const fetchDinners = async () => {
    const { data } = await supabase
      .from('dinners')
      .select('*, users(name), dinner_guests(rsvp_status)')
      .order('date', { ascending: true })
    const mapped = (data ?? []).map((d: Record<string, unknown>) => ({
      ...d,
      confirmed: Array.isArray(d.dinner_guests)
        ? (d.dinner_guests as { rsvp_status: string }[]).filter(g => g.rsvp_status === 'yes').length
        : 0,
    }))
    setDinners(mapped as Dinner[])
  }

  const openCreate = () => { setEditDinner(null); setForm(emptyForm); setError(null); setShowModal(true) }
  const openEdit = (d: Dinner) => {
    const dt = d.date ? new Date(d.date) : null
    setEditDinner(d)
    setForm({
      title: d.title, description: d.description ?? '',
      location: d.location ?? '', date: dt ? dt.toISOString().split('T')[0] : '',
      time: dt ? dt.toTimeString().slice(0, 5) : '',
      lat: d.latitude, lon: d.longitude,
    })
    setError(null)
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true); setError(null)
    const datetime = form.date && form.time ? `${form.date}T${form.time}:00` : form.date || null
    const payload = {
      title: form.title, description: form.description || null,
      location: form.location || null, date: datetime,
      latitude: form.lat, longitude: form.lon,
    }
    if (editDinner) {
      const { error: err } = await supabase.from('dinners').update(payload).eq('id', editDinner.id)
      if (err) { setError('Erro ao guardar alterações.'); setLoading(false); return }
    } else {
      const { data, error: err } = await supabase.from('dinners').insert({ ...payload, created_by: user.id }).select().single()
      if (err) { setError('Erro ao criar jantar.'); setLoading(false); return }
      await supabase.from('dinner_guests').insert({ dinner_id: data.id, user_id: user.id, rsvp_status: 'yes', responded_at: new Date().toISOString() })
    }
    setShowModal(false); setLoading(false); fetchDinners()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tens a certeza que queres eliminar este jantar?')) return
    await supabase.from('dinners').delete().eq('id', id)
    fetchDinners()
  }

  if (!user) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  const initials = user.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
  const upcoming = dinners.filter(d => !d.date || new Date(d.date) >= new Date())
  const past = dinners.filter(d => d.date && new Date(d.date) < new Date())
  const fmt = (d: string) => new Date(d).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen bg-[#080808]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="font-serif text-lg text-amber-100/90 hover:text-amber-400 transition-colors">DinHub</a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30 hidden sm:block">{user.email}</span>
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs font-medium text-amber-300">{initials}</div>
            <button onClick={async () => { await supabase.auth.signOut(); location.href = '/' }} className="text-xs text-white/30 hover:text-white/60 transition-colors px-2 py-1">Sair</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-white/30 tracking-widest uppercase mb-2">Dashboard</p>
            <h1 className="font-serif text-4xl text-amber-100">Olá, {user.name.split(' ')[0]}.</h1>
          </div>
          <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-medium text-sm rounded-lg transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Criar jantar
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[{ label: 'Próximos jantares', value: upcoming.length }, { label: 'Total de jantares', value: dinners.length }, { label: 'Jantares realizados', value: past.length }].map(s => (
            <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-2xl font-medium text-amber-100 mb-1">{s.value}</p>
              <p className="text-xs text-white/30">{s.label}</p>
            </div>
          ))}
        </div>

        {dinners.length === 0 ? (
          <div className="border border-white/[0.06] border-dashed rounded-2xl flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-amber-400/70">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-amber-100 mb-2">Nenhum jantar marcado.</h2>
            <p className="text-sm text-white/30 mb-8 max-w-xs">Cria o teu primeiro jantar e a equipa recebe o convite.</p>
            <button onClick={openCreate} className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-medium text-sm rounded-lg transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
              Criar jantar
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {dinners.map(dinner => {
              const isExpanded = expanded === dinner.id
              const isPast = dinner.date && new Date(dinner.date) < new Date()
              return (
                <div key={dinner.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                  {/* Card header */}
                  <div className="px-6 py-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-text-primary">{dinner.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-white/30 mt-0.5">
                        {dinner.date && <span>{fmt(dinner.date)}</span>}
                        {dinner.location && (
                          <span className="flex items-center gap-1 truncate">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {dinner.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${isPast ? 'bg-white/[0.05] text-white/30' : 'bg-amber-500/10 text-amber-400'}`}>
                        {isPast ? 'Realizado' : 'Próximo'}
                      </span>

                      {/* View */}
                      <a href={`/app/dinners/${dinner.id}`} className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all" title="Ver detalhes">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                      </a>

                      {/* Edit */}
                      <button onClick={() => openEdit(dinner)} className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all" title="Editar">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>

                      {/* Delete */}
                      <button onClick={() => handleDelete(dinner.id)} className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-red-500/10 border border-white/[0.06] hover:border-red-500/20 flex items-center justify-center text-white/40 hover:text-red-400 transition-all" title="Eliminar">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>

                      {/* Expand */}
                      <button onClick={() => setExpanded(isExpanded ? null : dinner.id)} className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                    </div>
                  </div>

                  {/* Expanded panel */}
                  {isExpanded && (
                    <div className="border-t border-white/[0.05] px-6 py-5 grid grid-cols-2 gap-5">
                      {/* Info */}
                      <div className="flex flex-col gap-3">
                        {dinner.description && (
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Descrição</p>
                            <p className="text-sm text-white/60">{dinner.description}</p>
                          </div>
                        )}
                        {dinner.location && (
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Local</p>
                            <p className="text-sm text-white/60">{dinner.location}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Organizador</p>
                          <p className="text-sm text-white/60">{dinner.users?.name ?? '—'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Confirmados</p>
                          <p className="text-sm text-white/60">{dinner.confirmed} {dinner.confirmed === 1 ? 'pessoa' : 'pessoas'}</p>
                        </div>
                      </div>

                      {/* Map — clicável abre Google Maps */}
                      {dinner.latitude && dinner.longitude ? (
                        <a href={`https://www.google.com/maps/search/?api=1&query=${dinner.latitude},${dinner.longitude}`} target="_blank" rel="noreferrer" className="group relative rounded-lg overflow-hidden border border-white/[0.06] h-44 block">
                          <iframe
                            title="mapa"
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${dinner.longitude - 0.005},${dinner.latitude - 0.005},${dinner.longitude + 0.005},${dinner.latitude + 0.005}&layer=mapnik&marker=${dinner.latitude},${dinner.longitude}`}
                            className="w-full h-full pointer-events-none"
                            style={{ filter: 'invert(0.9) hue-rotate(190deg) brightness(0.85)' }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white/80 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                              Abrir no Google Maps
                            </span>
                          </div>
                        </a>
                      ) : (
                        <div className="rounded-lg border border-white/[0.06] border-dashed h-44 flex items-center justify-center">
                          <p className="text-xs text-white/20">Sem localização definida</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Modal criar/editar */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-[#111111] border border-white/[0.08] rounded-2xl p-7 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-amber-100">{editDinner ? 'Editar jantar.' : 'Novo jantar.'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white/60 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Nome do jantar *</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ex: Jantar de equipa Q2" className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/40 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Descrição</label>
                <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Notas, dress code, etc." className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/40 transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Data</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-amber-500/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Hora</label>
                  <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-amber-500/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Local</label>
                <LocationSearch value={form.location} onChange={(loc, lat, lon) => setForm(f => ({ ...f, location: loc, lat: lat ?? null, lon: lon ?? null }))} />
              </div>
              {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-amber-950 font-medium text-sm rounded-lg transition-colors mt-1">
                {loading ? 'A guardar...' : editDinner ? 'Guardar alterações' : 'Criar jantar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
