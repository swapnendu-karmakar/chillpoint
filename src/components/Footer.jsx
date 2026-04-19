import { useState } from 'react'
import AdminPanel from './AdminPanel'

const LINKS = [
  { label: 'Home',     id: '#home' },
  { label: 'About',    id: '#about' },
  { label: 'Menu',     id: '#menu' },
  { label: 'Reviews',  id: '#reviews' },
  { label: 'Contact',  id: '#contact' },
]

export default function Footer() {
  const [showAdmin, setShowAdmin] = useState(false)

  function go(id) { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <>
      <footer style={{ background: '#111111', borderTop: '4px solid #F5C800' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px clamp(24px,4vw,48px) 40px', gap: 48 }} className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <img src="/favicon.png" alt="Chill Point Logo" style={{ width: 48, height: 48, objectFit: 'contain' }} />
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'white', letterSpacing: 3 }}>CHILL POINT</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#F5C800', letterSpacing: 4, textTransform: 'uppercase' }}>TASTE LIKE HOME</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              Vadodara's favourite vegetarian street food destination. Fresh every evening, priced for everyone.
            </p>
            <a href="https://wa.me/918866442439?text=Hi%20Chill%20Point!" target="_blank" rel="noreferrer" className="btn-yellow" style={{ fontSize: 12, padding: '12px 24px' }}>
              💬 Order on WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 16, color: '#F5C800', letterSpacing: 3, marginBottom: 24 }}>QUICK LINKS</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {LINKS.map(l => (
                <button key={l.id} onClick={() => go(l.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.5)', padding: 0, transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#F5C800'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                  → {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 16, color: '#F5C800', letterSpacing: 3, marginBottom: 24 }}>CONTACT</div>
            <div style={{ display: 'grid', gap: 16, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              <div>📍 Chill Point, GF Shop No. 18, Shivalaya Bliss, Taksh Aura Rd, N.H.8, Vadodara, Gujarat 390019</div>
              <div><a href="tel:8866442439" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>📞 +91 88664 42439</a></div>
              <div>🕐 4:30 PM – 9:30 PM (Daily)</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px clamp(24px,4vw,48px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Chill Point, Vadodara. All rights reserved.
          </div>
          <button onClick={() => setShowAdmin(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.2)', padding: 0 }}
            onMouseEnter={e => e.target.style.color = '#F5C800'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.2)'}>
            Admin Panel
          </button>
        </div>
      </footer>

      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </>
  )
}
