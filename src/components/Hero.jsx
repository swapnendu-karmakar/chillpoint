import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => {
      if (ref.current) { ref.current.style.opacity = '1'; ref.current.style.transform = 'translateY(0)' }
    }, 80)
    return () => clearTimeout(t)
  }, [])

  function scrollTo(id) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', background: '#1C1C1C', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

      {/* Dot pattern overlay */}
      <div className="dot-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      {/* Big decorative yellow circle — right side */}
      <div style={{
        position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: '#F5C800', opacity: 0.06,
      }} />
      <div style={{
        position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)',
        width: 480, height: 480, borderRadius: '50%',
        border: '2px solid rgba(245,200,0,0.15)',
      }} />

      {/* Right side food visual — solid yellow box with food image */}
      <div className="hidden lg:block" style={{
        position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)',
        width: 420, height: 480,
      }}>
        {/* Yellow backdrop frame */}
        <div style={{ position: 'absolute', top: 20, left: 20, right: -20, bottom: -20, background: '#F5C800', zIndex: 0 }} />
        {/* Food image */}
        <div style={{
          position: 'relative', zIndex: 1, width: '100%', height: '100%',
          backgroundImage: `url('https://images.unsplash.com/photo-1586357507341-3fbe59f2a5d9?q=80&w=880&auto=format&fit=crop')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        {/* Overlay label */}
        <div style={{
          position: 'absolute', bottom: 32, left: -24, zIndex: 2,
          background: '#E85D04', padding: '10px 20px',
        }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 14, color: 'white', letterSpacing: 3 }}>FRESH DAILY</div>
        </div>
      </div>

      {/* LEFT — main content */}
      <div ref={ref} style={{
        position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px',
        width: '100%', opacity: 0, transform: 'translateY(32px)', transition: 'all 0.7s ease',
      }}>
        <div style={{ maxWidth: 580 }}>

          {/* Open badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(245,200,0,0.12)', border: '1px solid rgba(245,200,0,0.3)', padding: '8px 18px', marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 2 }}>Open Today · 4:30 – 9:30 PM</span>
          </div>

          {/* Big heading */}
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(80px, 15vw, 140px)', lineHeight: 0.9, color: 'white', letterSpacing: 4, marginBottom: 8 }}>
            CHILL<br />
            <span style={{ color: '#F5C800' }}>POINT</span>
          </h1>

          {/* Tagline */}
          <p style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3vw, 30px)', color: 'rgba(255,255,255,0.65)', fontStyle: 'italic', marginTop: 16, marginBottom: 40 }}>
            "Taste Like Home"
          </p>

          {/* Three USP pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
            {['🌿 Pure Veg', '🍛 Authentic Chaat', '💰 From ₹20'].map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px 16px', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                {t}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('#menu')} className="btn-yellow">
              View Menu →
            </button>
            <a href="https://wa.me/918866442439?text=Hi%20Chill%20Point!%20I%20want%20to%20order." target="_blank" rel="noreferrer" className="btn-outline-white">
              💬 WhatsApp Order
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[{ n: '42+', l: 'Menu Items' }, { n: '100%', l: 'Pure Veg' }, { n: '4.9★', l: 'Rated' }].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 36, color: '#F5C800', letterSpacing: 2 }}>{s.n}</div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: '#F5C800' }} />
    </section>
  )
}
