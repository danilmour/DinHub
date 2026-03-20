'use client'
import { useState, useRef, useEffect } from 'react'

type Result = {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

type Coords = { lat: number; lon: number }

interface Props {
  value: string
  onChange: (location: string, lat?: number, lon?: number) => void
}

const dist = (a: Coords, b: Coords) => {
  const dx = a.lat - b.lat
  const dy = a.lon - b.lon
  return Math.sqrt(dx * dx + dy * dy)
}

export function LocationSearch({ value, onChange }: Props) {
  const [query, setQuery] = useState(value)
  const [results, setResults] = useState<Result[]>([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [userCoords, setUserCoords] = useState<Coords | null>(null)
  const [proximityOn, setProximityOn] = useState(false)
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const requestLocation = () => {
    if (proximityOn) {
      setProximityOn(false)
      return
    }
    navigator.geolocation?.getCurrentPosition(
      pos => {
        setUserCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setProximityOn(true)
      },
      () => alert('Não foi possível obter a tua localização.')
    )
  }

  const search = (q: string) => {
    setQuery(q)
    onChange(q)
    if (debounce.current) clearTimeout(debounce.current)
    if (q.length < 3) { setResults([]); setOpen(false); return }

    debounce.current = setTimeout(async () => {
      setSearching(true)
      try {
        let url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=20&addressdetails=1`

        if (proximityOn && userCoords) {
          const { lat, lon } = userCoords
          url += `&viewbox=${lon - 0.3},${lat + 0.3},${lon + 0.3},${lat - 0.3}`
        }

        const res = await fetch(url, { headers: { 'Accept-Language': 'pt' } })
        const data: Result[] = await res.json()

        const sorted = (proximityOn && userCoords)
          ? [...data].sort((a, b) =>
              dist(userCoords, { lat: +a.lat, lon: +a.lon }) -
              dist(userCoords, { lat: +b.lat, lon: +b.lon })
            )
          : data

        setResults(sorted.slice(0, 5))
        setOpen(sorted.length > 0)
      } catch { setResults([]) }
      setSearching(false)
    }, 400)
  }

  const select = (r: Result) => {
    const name = r.display_name.split(',').slice(0, 3).join(',').trim()
    setQuery(name)
    setResults([])
    setOpen(false)
    onChange(name, parseFloat(r.lat), parseFloat(r.lon))
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={e => search(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Pesquisa o restaurante ou morada..."
            className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg pl-9 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/40 transition-colors"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20">
            {searching ? (
              <div className="w-3.5 h-3.5 border border-white/20 border-t-white/50 rounded-full animate-spin" />
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            )}
          </div>
        </div>

        {/* Proximity toggle */}
        <button
          type="button"
          onClick={requestLocation}
          title={proximityOn ? 'Desativar proximidade' : 'Ativar resultados próximos'}
          className={`shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
            proximityOn
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              : 'bg-white/[0.05] border-white/[0.08] text-white/30 hover:text-white/60 hover:border-white/20'
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
            <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" strokeOpacity="0"/>
          </svg>
        </button>
      </div>

      {proximityOn && (
        <p className="text-[10px] text-amber-400/50 mt-1 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-amber-400/60 inline-block" />
          Ordenado por proximidade
        </p>
      )}

      {open && (
        <ul className="absolute top-full mt-1.5 left-0 right-0 z-50 bg-[#161616] border border-white/[0.08] rounded-xl overflow-hidden shadow-xl">
          {results.map(r => {
            const parts = r.display_name.split(',')
            const main = parts.slice(0, 2).join(',').trim()
            const sub = parts.slice(2, 4).join(',').trim()
            return (
              <li key={r.place_id}>
                <button
                  type="button"
                  onMouseDown={() => select(r)}
                  className="w-full text-left px-4 py-3 hover:bg-white/[0.05] transition-colors flex items-start gap-3"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-amber-400/50 mt-0.5 shrink-0">
                    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <p className="text-sm text-white/80 leading-tight">{main}</p>
                    {sub && <p className="text-xs text-white/30 mt-0.5">{sub}</p>}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
