import { useEffect, useRef } from 'react'
import { useReviews } from '../hooks/useData'

const PILLARS = [
  { icon: '🌿', title: '100% Pure Veg', body: 'Every single item — no exceptions. Clean, vegetarian ingredients you can trust.' },
  { icon: '🏠', title: 'Tastes Like Home', body: 'Recipes crafted with love. That familiar flavour you crave on every visit.' },
  { icon: '✨', title: 'Hygienic Kitchen', body: 'FSSAI licensed. Fresh prep every day. We treat cleanliness as seriously as taste.' },
  { icon: '💰', title: 'Pocket Friendly', body: 'Starting at just ₹20. Great food should never be out of reach.' },
]

export default function About() {
  const { reviews } = useReviews()
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '5.0'
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} style={{ background: '#FFF8EE' }}>

      {/* Top split: cream left text, dark right image */}
      <div style={{ minHeight: 600 }} className="grid grid-cols-1 md:grid-cols-2">

        {/* Left: text */}
        <div style={{ padding: 'clamp(48px,8vw,96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="reveal sec-label" style={{ marginBottom: 16 }}>Who We Are</div>
          <h2 className="reveal" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, color: '#1C1C1C', lineHeight: 1.1, marginBottom: 24 }}>
            Vadodara's Favourite<br /><em style={{ color: '#E85D04' }}>Chill Spot</em>
          </h2>
          <p className="reveal" style={{ fontSize: 16, lineHeight: 1.8, color: '#555', maxWidth: 480, marginBottom: 16 }}>
            Chill Point is where street food meets soul. Nestled at Shivalaya Bliss on NH-8, we serve the most authentic chaat, loaded sandwiches, cheesy pizzas, refreshing ice slushes, and more — all pure vegetarian.
          </p>
          <p className="reveal" style={{ fontSize: 16, lineHeight: 1.8, color: '#555', maxWidth: 480, marginBottom: 40 }}>
            No fancy menus. No gimmicks. Just real food made fresh every day, priced so everyone can enjoy it.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })} className="btn-dark">
              See Our Menu →
            </button>
            <a href="tel:8866442439" className="btn-yellow">Call Us</a>
          </div>
        </div>

        {/* Right: food photography block */}
        <div style={{ position: 'relative', background: '#1C1C1C', minHeight: 480 }}>
          {/* Main food photo */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('./assets/bhel.jpg')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.7,
          }} />
          {/* Yellow accent box bottom-left */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, background: '#F5C800', padding: '20px 28px', zIndex: 2 }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: '#1C1C1C', letterSpacing: 2 }}>Since Day 1</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1C1C1C', letterSpacing: 2, textTransform: 'uppercase', opacity: 0.7 }}>Vadodara, Gujarat</div>
          </div>
          {/* Top-right stats card */}
          <div style={{ position: 'absolute', top: 24, right: 24, background: '#1C1C1C', border: '2px solid #F5C800', padding: '16px 24px', zIndex: 2 }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 40, color: '#F5C800', letterSpacing: 2 }}>{avg}★</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 2 }}>Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Bottom: four pillars on yellow background */}
      <div style={{ background: '#1C1C1C', padding: '72px clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
          {PILLARS.map((p, i) => (
            <div key={p.title} className="reveal lift" style={{
              background: i % 2 === 0 ? '#222222' : '#1C1C1C',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '40px 32px',
              transitionDelay: `${i * 80}ms`,
            }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: '#F5C800', letterSpacing: 2, marginBottom: 12 }}>{p.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>{p.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
