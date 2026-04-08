import { useState } from 'react'
import { FiX, FiLock, FiTrash2 } from 'react-icons/fi'
import { useMenu } from '../hooks/useData'
import { CATEGORIES } from '../data/menuData'

const ADMIN_PASSWORD = 'chillpoint2024'

export default function AdminPanel({ onClose }) {
  const [authed, setAuthed]   = useState(false)
  const [pw, setPw]           = useState('')
  const [pwErr, setPwErr]     = useState('')
  const { items, loading, toggleAvailability, addMenuItem, deleteMenuItem } = useMenu()
  const [newItem, setNewItem] = useState({ name: '', category: 'chaat', price: '', is_available: true, is_popular: false, is_veg: true })
  const [adding, setAdding]   = useState(false)
  const [addErr, setAddErr]   = useState('')

  function login(e) {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) setAuthed(true)
    else setPwErr('Wrong password. Try: chillpoint2024')
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!newItem.name.trim() || !newItem.price) { setAddErr('Name and price required.'); return }
    setAdding(true); setAddErr('')
    await addMenuItem({ ...newItem, price: parseInt(newItem.price) })
    setAdding(false)
    setNewItem({ name: '', category: 'chaat', price: '', is_available: true, is_popular: false, is_veg: true })
  }

  const inputStyle = { width: '100%', padding: '12px 14px', border: '2px solid #e5e5e5', fontSize: 14, outline: 'none', background: 'white', color: '#1C1C1C' }

  if (!authed) return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'white', padding: '48px 40px', width: '100%', maxWidth: 400, position: 'relative', borderTop: '4px solid #F5C800' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><FiX size={20} /></button>
        <div style={{ width: 52, height: 52, background: '#1C1C1C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <FiLock size={22} color="#F5C800" />
        </div>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: '#1C1C1C', letterSpacing: 3, marginBottom: 8 }}>ADMIN ACCESS</div>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 28 }}>Enter admin password to manage menu</div>
        <form onSubmit={login} style={{ display: 'grid', gap: 16 }}>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" style={inputStyle} />
          {pwErr && <div style={{ color: '#ef4444', fontSize: 13 }}>{pwErr}</div>}
          <button type="submit" className="btn-dark" style={{ justifyContent: 'center' }}>Login</button>
        </form>
        <div style={{ marginTop: 16, fontSize: 12, color: '#aaa', textAlign: 'center' }}>Demo: chillpoint2024</div>
      </div>
    </div>
  )

  const grouped = CATEGORIES.map(c => ({ ...c, items: items.filter(i => i.category === c.id) }))

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#f9f9f9', width: '100%', maxWidth: 860, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', borderTop: '4px solid #F5C800' }}>

        {/* Header */}
        <div style={{ background: '#1C1C1C', padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: '#F5C800', letterSpacing: 3 }}>⚙ MENU MANAGER</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><FiX size={20} /></button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: 28 }}>

          {/* Add item */}
          <div style={{ background: 'white', border: '2px solid #e5e5e5', padding: '24px 24px 20px', marginBottom: 24, borderTop: '3px solid #F5C800' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: '#1C1C1C', letterSpacing: 2, marginBottom: 20 }}>ADD NEW ITEM</div>
            <form onSubmit={handleAdd} style={{ gap: 12 }} className="grid grid-cols-1 md:grid-cols-2">
              <input value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} placeholder="Item name" style={inputStyle} />
              <select value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))} style={{ ...inputStyle, background: 'white' }}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
              <input type="number" value={newItem.price} onChange={e => setNewItem(p => ({ ...p, price: e.target.value }))} placeholder="Price (₹)" style={inputStyle} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#555', cursor: 'pointer' }}>
                <input type="checkbox" checked={newItem.is_popular} onChange={e => setNewItem(p => ({ ...p, is_popular: e.target.checked }))} style={{ accentColor: '#F5C800', width: 18, height: 18 }} />
                Mark as Popular
              </label>
              {addErr && <div style={{ color: '#ef4444', fontSize: 13, gridColumn: '1/-1' }}>{addErr}</div>}
              <button type="submit" disabled={adding} className="btn-dark" style={{ gridColumn: '1/-1', justifyContent: 'center', opacity: adding ? 0.6 : 1 }}>
                {adding ? 'Adding...' : '+ Add Item'}
              </button>
            </form>
          </div>

          {/* Items by category */}
          {loading ? <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>Loading...</div> : (
            grouped.map(cat => (
              <div key={cat.id} style={{ background: 'white', border: '2px solid #e5e5e5', marginBottom: 12, overflow: 'hidden' }}>
                <div style={{ background: '#1C1C1C', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>{cat.emoji}</span>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 16, color: '#F5C800', letterSpacing: 2 }}>{cat.label}</span>
                  <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '2px 10px', marginLeft: 4 }}>{cat.items.length} items</span>
                </div>
                <div>
                  {cat.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '12px 20px', borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: item.is_available ? '#1C1C1C' : '#aaa', textDecoration: item.is_available ? 'none' : 'line-through' }}>{item.name}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#E85D04' }}>₹{item.price}</span>
                        {item.is_popular && <span style={{ fontSize: 10, background: '#F5C800', color: '#1C1C1C', padding: '2px 8px', fontWeight: 700 }}>POPULAR</span>}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => toggleAvailability(item.id, item.is_available)}
                          style={{ padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `2px solid ${item.is_available ? '#16a34a' : '#ef4444'}`, background: 'transparent', color: item.is_available ? '#16a34a' : '#ef4444' }}>
                          {item.is_available ? '✓ Available' : '✗ Unavailable'}
                        </button>
                        <button onClick={() => { if (window.confirm(`Delete "${item.name}"?`)) deleteMenuItem(item.id) }}
                          style={{ padding: '6px 10px', background: 'none', border: '2px solid #fee2e2', color: '#ef4444', cursor: 'pointer' }}>
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
