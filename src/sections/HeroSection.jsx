import { useRef, useEffect } from 'react'

// ─── Particle ────────────────────────────────────────────
class Particle {
  constructor(w, h) {
    this.x  = Math.random() * w
    this.y  = Math.random() * h
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.r  = Math.random() * 1.1 + 0.4
    this.a  = Math.random() * 0.38 + 0.14
  }

  update(w, h, mx, my) {
    if (mx !== null) {
      const dx = this.x - mx
      const dy = this.y - my
      const d  = Math.hypot(dx, dy)
      if (d < 155 && d > 0) {
        const f = (155 - d) / 155
        this.vx += (dx / d) * f * 0.85
        this.vy += (dy / d) * f * 0.85
      }
    }
    this.vx *= 0.97
    this.vy *= 0.97
    const spd = Math.hypot(this.vx, this.vy)
    if (spd > 1.8) { this.vx = (this.vx / spd) * 1.8; this.vy = (this.vy / spd) * 1.8 }
    this.x += this.vx
    this.y += this.vy
    if (this.x < 0) { this.x = 0; this.vx *= -1 }
    if (this.x > w) { this.x = w; this.vx *= -1 }
    if (this.y < 0) { this.y = 0; this.vy *= -1 }
    if (this.y > h) { this.y = h; this.vy *= -1 }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(34,211,238,${this.a})`
    ctx.fill()
  }
}

// ─── Canvas component ─────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const mouse = { x: null, y: null }
    let particles = []
    let raf
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      const count = Math.min(Math.floor((w * h) / 9000), 88)
      particles = Array.from({ length: count }, () => new Particle(w, h))
    }

    const clampMouse = (cx, cy) => {
      const rect = canvas.getBoundingClientRect()
      const mx = cx - rect.left
      const my = cy - rect.top
      if (mx >= 0 && mx <= w && my >= 0 && my <= h) {
        mouse.x = mx; mouse.y = my
      } else {
        mouse.x = null; mouse.y = null
      }
    }

    const onMouseMove = (e) => clampMouse(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      if (e.touches[0]) clampMouse(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onLeave = () => { mouse.x = null; mouse.y = null }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) p.update(w, h, mouse.x, mouse.y)

      // Particle-to-particle lines (cyan)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 110) * 0.13})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Cursor-to-particle lines (amber)
        if (mouse.x !== null) {
          const d = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y)
          if (d < 185) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(232,163,23,${(1 - d / 185) * 0.18})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      for (const p of particles) p.draw(ctx)
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize',     resize)
    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchmove',  onTouchMove, { passive: true })
    window.addEventListener('touchend',   onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

// ─── Hero section ─────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="section-hero">
      <ParticleCanvas />
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      {/* Warm amber bloom anchoring the CTA zone */}
      <div style={{
        position: 'absolute',
        width: '660px',
        height: '360px',
        bottom: '6%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse at center, rgba(232,163,23,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="hero-content">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="JOJO Digital"
          className="hero-logo fade-up-load"
          style={{ filter: 'drop-shadow(0 0 22px rgba(34,211,238,0.16))' }}
        />

        {/* Decorative amber rule between logo and headline */}
        <div
          className="fade-up-load"
          style={{
            animationDelay: '70ms',
            width: '36px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(232,163,23,0.55), transparent)',
            margin: '-0.25rem auto 0',
          }}
        />

        <h1 className="hero-h1 fade-up-load" style={{ animationDelay: '140ms' }}>
          הלקוח שלך מחפש אותך עכשיו.
          <br />
          <span className="text-accent">האם הוא מוצא אותך?</span>
        </h1>

        <p className="hero-sub fade-up-load" style={{ animationDelay: '260ms' }}>
          אם אתה לא מופיע בגוגל ובמנועי ה‑AI, מישהו אחר מופיע במקומך.
        </p>

        <div className="fade-up-load" style={{ animationDelay: '380ms' }}>
          <a
            href="#form"
            className="btn-primary"
            style={{ boxShadow: '0 0 52px rgba(232,163,23,0.20), 0 4px 28px rgba(232,163,23,0.30)' }}
          >
            לקבלת בדיקת נוכחות ללא עלות
          </a>
        </div>

        <div className="hero-badges fade-up-load" style={{ animationDelay: '520ms' }}>
          {['חינם לחלוטין', 'ללא התחייבות', 'תשובה תוך 48 שעות'].map((label) => (
            <span
              key={label}
              className="hero-badge"
              style={{
                background:   'rgba(255,255,255,0.045)',
                border:       '1px solid rgba(255,255,255,0.09)',
                borderRadius: '100px',
                padding:      '0.4rem 0.95rem',
              }}
            >
              <span
                className="hero-badge-dot"
                style={{ boxShadow: '0 0 5px rgba(34,211,238,0.85)' }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
