import { useState, useEffect, useRef } from 'react'
import { useMenu } from '../hooks/useData'
import { CATEGORIES } from '../data/menuData'

function Skeleton() {
  return (
    <div style={{ display: 'grid', gap: 2 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{ height: 56, background: 'rgba(28,28,28,0.06)', animation: 'pulse 1.5s ease infinite' }} />
      ))}
    </div>
  )
}

function MenuItem({ item }) {
  return (
    <div className="menu-row">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Veg dot */}
        <div style={{
          width: 16, height: 16, border: '2px solid #16a34a',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a' }} />
        </div>

        <div>
          <span style={{
            fontSize: 15, fontWeight: 600, color: item.is_available ? '#1C1C1C' : '#aaa',
            textDecoration: item.is_available ? 'none' : 'line-through',
          }}>{item.name}</span>

          {item.is_popular && item.is_available && (
            <span style={{
              marginLeft: 10, fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: 1, background: '#E85D04', color: 'white', padding: '2px 8px',
            }}>★ Popular</span>
          )}

          {!item.is_available && (
            <span style={{ marginLeft: 10, fontSize: 11, color: '#ef4444', fontWeight: 600 }}>Unavailable</span>
          )}
        </div>
      </div>

      {/* Price badge — inspired by menu card circles */}
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: item.is_available ? '#1C1C1C' : '#e5e5e5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, flexDirection: 'column',
      }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: item.is_available ? '#F5C800' : '#999', lineHeight: 1 }}>₹{item.price}</span>
      </div>
    </div>
  )
}

export default function Menu() {
  const { items, loading } = useMenu()
  const [active, setActive] = useState('chaat')
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

  const filtered = items.filter(i => i.category === active)
  const cat = CATEGORIES.find(c => c.id === active)

  return (
    <section id="menu" ref={ref} style={{ background: '#FFF8EE' }}>

      {/* Section header — dark block */}
      <div style={{ background: '#1C1C1C', padding: '80px clamp(24px,6vw,80px) 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal sec-label" style={{ color: '#F5C800', marginBottom: 16 }}>What We Serve</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="reveal" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 900, color: 'white', lineHeight: 1 }}>
              Our <em style={{ color: '#F5C800' }}>Menu</em>
            </h2>
            <p className="reveal" style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 340, lineHeight: 1.7 }}>
              All 42+ items — 100% vegetarian. Made fresh every evening at 4:30 PM.
            </p>
          </div>
        </div>
      </div>

      {/* Category tabs — yellow bar */}
      <div style={{ background: '#F5C800', borderTop: '3px solid #1C1C1C', borderBottom: '3px solid #1C1C1C', position: 'sticky', top: 56, zIndex: 30 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 0, overflowX: 'auto' }} className="scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`cat-pill ${active === cat.id ? 'cat-pill-active' : ''}`}
              style={{ borderRadius: 0, borderRight: 'none', borderTop: 'none', borderBottom: 'none', borderLeft: active === cat.id ? 'none' : '1px solid rgba(28,28,28,0.15)' }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(24px,4vw,48px)' }}>
        <div style={{ gap: 48, alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left: category info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <div style={{ width: 64, height: 64, background: '#1C1C1C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                {cat?.emoji}
              </div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: 40, color: '#1C1C1C', letterSpacing: 3 }}>{cat?.label}</div>
                <div style={{ fontSize: 13, color: '#888', fontWeight: 600 }}>{filtered.length} items available</div>
              </div>
            </div>

            {/* Category description */}
            <div style={{ background: '#1C1C1C', padding: '24px 28px', marginBottom: 32 }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                {cat?.id === 'chaat' && 'Our chaat is made with freshly fried puris and the finest spice blends — just like the streets of Gujarat.'}
                {cat?.id === 'sandwich' && 'Grilled, toasted and loaded. Our sandwiches use fresh vegetables and real butter — no shortcuts.'}
                {cat?.id === 'pizza' && 'Thin-crust pizzas loaded with cheese and fresh toppings. No delivery needed — just walk in.'}
                {cat?.id === 'ice_slush' && 'Refreshing crushed-ice slushes in 11 bold flavours. Perfect for a Vadodara evening.'}
                {cat?.id === 'puff' && 'Flaky, buttery pastry puffs — eaten fresh out of the oven. Crispy outside, flavourful inside.'}
                {cat?.id === 'maggi' && 'The comfort food of a generation. Our Maggi is masala-loaded and ready in minutes.'}
                {cat?.id === 'fries' && 'Golden, crispy fries — salted or spiced with peri peri. Add cheese for extra indulgence.'}
              </p>
            </div>

            {/* Veg guarantee */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', border: '2px solid #16a34a', background: 'rgba(22,163,74,0.06)' }}>
              <div style={{ width: 18, height: 18, border: '2px solid #16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: 1 }}>All items are 100% Pure Vegetarian</span>
            </div>
          </div>

          {/* Right: items list */}
          <div style={{ background: 'white', border: '2px solid #1C1C1C', padding: '24px 24px 12px' }}>
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '3px solid #1C1C1C', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#888' }}>Item</span>
              <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#888' }}>Price</span>
            </div>

            {loading ? <Skeleton /> : (
              <div>
                {filtered.map(item => <MenuItem key={item.id} item={item} />)}
                {filtered.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '48px 0', color: '#aaa' }}>No items found</div>
                )}
              </div>
            )}

            {/* Footer note */}
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '2px dashed rgba(28,28,28,0.12)', fontSize: 12, color: '#aaa', fontStyle: 'italic' }}>
              * Prices may vary slightly. Call to confirm.
            </div>
          </div>
        </div>

        {/* CTA bar */}
        <div style={{ marginTop: 64, background: '#1C1C1C', padding: '40px clamp(24px,5vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: '#F5C800', letterSpacing: 3, lineHeight: 1 }}>READY TO ORDER?</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Call us or message on WhatsApp — we'll confirm your order.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="tel:8866442439" className="btn-outline-white">📞 Call Now</a>
            <a href="https://wa.me/918866442439?text=Hi%20Chill%20Point!%20I%20want%20to%20order." target="_blank" rel="noreferrer" className="btn-yellow">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}
