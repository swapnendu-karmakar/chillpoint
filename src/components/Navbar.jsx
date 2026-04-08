import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const LINKS = [
  { href: '#home',    label: 'Home' },
  { href: '#about',   label: 'About' },
  { href: '#menu',    label: 'Menu' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function go(e, href) {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? '#111111' : 'transparent',
      borderBottom: scrolled ? '2px solid rgba(245,200,0,0.2)' : '2px solid transparent',
      transition: 'all 0.3s',
      padding: scrolled ? '12px 0' : '20px 0',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#home" onClick={e => go(e, '#home')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, background: '#F5C800',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Bebas Neue', fontSize: 20, color: '#1C1C1C',
          }}>CP</div>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'white', letterSpacing: 3, lineHeight: 1.1 }}>CHILL POINT</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#F5C800', letterSpacing: 4, textTransform: 'uppercase' }}>TASTE LIKE HOME</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: 36 }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => go(e, l.href)} className="nav-link">{l.label}</a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex" style={{ gap: 12, alignItems: 'center' }}>
          <a href="tel:8866442439" style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 1, textDecoration: 'none' }}>
            📞 88664 42439
          </a>
          <a href="https://wa.me/918866442439?text=Hi%20Chill%20Point!%20I%20want%20to%20order." target="_blank" rel="noreferrer" className="btn-yellow" style={{ padding: '10px 24px', fontSize: 11 }}>
            Order Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: 4 }} className="md:hidden">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: '#111111', borderTop: '2px solid rgba(245,200,0,0.3)', padding: '16px 24px 24px' }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => go(e, l.href)}
              style={{ display: 'block', padding: '14px 0', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {l.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <a href="tel:8866442439" className="btn-outline-white" style={{ flex: 1, justifyContent: 'center', padding: '12px 16px', fontSize: 11 }}>Call Us</a>
            <a href="https://wa.me/918866442439" target="_blank" rel="noreferrer" className="btn-yellow" style={{ flex: 1, justifyContent: 'center', padding: '12px 16px', fontSize: 11 }}>Order</a>
          </div>
        </div>
      )}
    </nav>
  )
}
