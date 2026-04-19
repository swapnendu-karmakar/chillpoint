import { useState, useEffect } from 'react'

const HOURS = [
  { day: 'Monday – Friday', time: '4:30 PM – 9:30 PM' },
  { day: 'Saturday',         time: '4:30 PM – 9:30 PM' },
  { day: 'Sunday',           time: '4:30 PM – 9:30 PM' },
]

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkOpen = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const timeInMinutes = hours * 60 + minutes
      const openTime = 16 * 60 + 30 // 16:30
      const closeTime = 21 * 60 + 30 // 21:30
      setIsOpen(timeInMinutes >= openTime && timeInMinutes <= closeTime)
    }
    checkOpen()
    const timer = setInterval(checkOpen, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="contact" style={{ background: '#1C1C1C' }}>

      {/* Top yellow header */}
      <div style={{ background: '#F5C800', padding: '56px clamp(24px,6vw,80px)', borderBottom: '3px solid #1C1C1C' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="sec-label" style={{ color: '#1C1C1C', opacity: 0.6, marginBottom: 12 }}>Visit Us</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, color: '#1C1C1C', lineHeight: 1 }}>
            Find Chill Point
          </h2>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(24px,4vw,48px)', gap: 48, alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">

        {/* Info cards */}
        <div style={{ display: 'grid', gap: 3 }}>

          {/* Address */}
          <div style={{ background: '#222', border: '1px solid rgba(255,255,255,0.07)', padding: '28px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#F5C800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📍</div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: '#F5C800', letterSpacing: 2, marginBottom: 10 }}>OUR ADDRESS</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                  Chill Point, GF Shop No. 18, Shivalaya Bliss,<br />
                  Taksh Aura Rd, N.H.8,<br />
                  Vadodara, Gujarat 390019
                </div>
                <a href="https://maps.google.com/?q=Shivalaya+Bliss+NH8+Vadodara" target="_blank" rel="noreferrer"
                  style={{ display: 'inline-block', marginTop: 14, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#F5C800', textDecoration: 'none', borderBottom: '1px solid rgba(245,200,0,0.4)' }}>
                  Get Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div style={{ background: '#222', border: '1px solid rgba(255,255,255,0.07)', padding: '28px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📞</div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: '#F5C800', letterSpacing: 2, marginBottom: 8 }}>CALL / WHATSAPP</div>
                <a href="tel:8866442439" style={{ fontSize: 22, fontWeight: 700, color: 'white', textDecoration: 'none', display: 'block', marginBottom: 12 }}>+91 88664 42439</a>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href="tel:8866442439" className="btn-outline-white" style={{ padding: '8px 18px', fontSize: 11 }}>Call</a>
                  <a href="https://wa.me/918866442439?text=Hi%20Chill%20Point!" target="_blank" rel="noreferrer"
                    style={{ padding: '8px 18px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: '#25D366', color: 'white', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div style={{ background: '#F5C800', padding: '28px 32px' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: '#1C1C1C', letterSpacing: 2, marginBottom: 20 }}>OPENING HOURS</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {HOURS.map(h => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid rgba(28,28,28,0.15)' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1C1C' }}>{h.day}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#E85D04' }}>{h.time}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: isOpen ? '#16a34a' : '#ef4444', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1C' }}>{isOpen ? 'Open Now' : 'Closed Now'}</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div style={{ border: '3px solid rgba(255,255,255,0.1)', overflow: 'hidden', height: 480 }}>
          <iframe
            title="Chill Point Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.065435829163!2d73.26052757529297!3d22.31336487967725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcfb3150d58b9%3A0x8d86038b151c4228!2sChill%20Point!5e0!3m2!1sen!2sin!4v1776589736883!5m2!1sen!2sin"
            width="100%" height="100%"
            style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
