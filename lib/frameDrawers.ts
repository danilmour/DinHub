// lib/frameDrawers.ts
// Used ONLY by Benefits.tsx (2D canvas)
// Hero + HowItWorks use francesinhaScene.ts (Three.js WebGL)

export function benefitsFrame(
  frame: number,
  total: number,
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const t = frame / total // 0 → 1

  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#080808'
  ctx.fillRect(0, 0, w, h)

  // Simulate a RSVP list filling up
  const names = ['Ana Costa', 'Rafael Silva', 'Mariana Lopes', 'João Faria', 'Sofia Mendes', 'Pedro Rocha']
  const visibleCount = Math.floor(t * names.length)
  const partialAlpha = (t * names.length) - visibleCount

  const listX = w * 0.35
  const listStartY = h * 0.2
  const rowH = Math.min(60, h * 0.1)

  // Title
  ctx.fillStyle = '#f5f0e8'
  ctx.font = `500 ${Math.min(20, w * 0.03)}px system-ui, sans-serif`
  ctx.textAlign = 'left'
  ctx.fillText('Confirmados para o jantar', listX - 28, listStartY - 40)

  // Divider line
  ctx.beginPath()
  ctx.moveTo(listX - 28, listStartY - 20)
  ctx.lineTo(listX + w * 0.35, listStartY - 20)
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.lineWidth = 1
  ctx.stroke()

  names.forEach((name, i) => {
    const y = listStartY + i * rowH
    const alpha = i < visibleCount ? 1 : i === visibleCount ? partialAlpha : 0.15

    // Checkmark circle
    ctx.beginPath()
    ctx.arc(listX - 14, y + 4, 12, 0, Math.PI * 2)
    
    if (i < visibleCount || (i === visibleCount && partialAlpha > 0.5)) {
      // Filled green circle
      ctx.fillStyle = `rgba(93,190,138,${alpha})`
      ctx.fill()
      
      // White checkmark
      ctx.strokeStyle = '#080808'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(listX - 18, y + 4)
      ctx.lineTo(listX - 14, y + 8)
      ctx.lineTo(listX - 8, y - 1)
      ctx.stroke()
    } else {
      ctx.strokeStyle = `rgba(74,68,56,${Math.max(alpha, 0.3)})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    // Name
    ctx.fillStyle = i < visibleCount
      ? `rgba(245,240,232,${alpha})`
      : `rgba(74,68,56,0.4)`
    ctx.font = `400 ${Math.min(18, w * 0.025)}px system-ui, sans-serif`
    ctx.textAlign = 'left'
    ctx.fillText(i < visibleCount ? name : '————————', listX + 12, y + 8)

    // Status badge for confirmed
    if (i < visibleCount) {
      const badgeX = listX + w * 0.28
      ctx.fillStyle = `rgba(93,190,138,${alpha * 0.15})`
      ctx.beginPath()
      ctx.roundRect(badgeX, y - 8, 70, 24, 4)
      ctx.fill()
      
      ctx.fillStyle = `rgba(93,190,138,${alpha})`
      ctx.font = `500 ${Math.min(12, w * 0.018)}px system-ui, sans-serif`
      ctx.fillText('Confirmado', badgeX + 8, y + 7)
    }
  })

  // Count summary
  ctx.fillStyle = '#8a8070'
  ctx.font = `400 ${Math.min(14, w * 0.02)}px system-ui, sans-serif`
  ctx.fillText(`${visibleCount} de ${names.length} confirmados`, listX - 28, listStartY + names.length * rowH + 30)

  // Warm amber background glow increases as list fills
  const glowAlpha = t * 0.08
  const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7)
  grad.addColorStop(0, `rgba(252,173,63,${glowAlpha})`)
  grad.addColorStop(1, 'transparent')
  ctx.fillStyle = grad
  ctx.globalCompositeOperation = 'screen'
  ctx.fillRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'source-over'
}
