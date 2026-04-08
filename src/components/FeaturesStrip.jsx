const ITEMS = ['🍛 Authentic Chaat', '🥪 Fresh Sandwiches', '🍕 Cheesy Pizzas', '🧊 Cool Ice Slush', '🌿 100% Pure Veg', '💰 Prices from ₹20', '🍜 Hot Maggi', '🍟 Crispy Fries', '📍 Vadodara', '⭐ 4.9 Rated']

export default function FeaturesStrip() {
  return (
    <div style={{ background: '#F5C800', overflow: 'hidden', padding: '14px 0', borderTop: '3px solid #1C1C1C', borderBottom: '3px solid #1C1C1C' }}>
      <div className="marquee-track" style={{ display: 'flex', width: 'max-content' }}>
        {[...ITEMS, ...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} style={{ padding: '0 32px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#1C1C1C', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
            {t}
            <span style={{ marginLeft: 24, width: 4, height: 4, borderRadius: '50%', background: '#1C1C1C', display: 'inline-block', opacity: 0.4 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
