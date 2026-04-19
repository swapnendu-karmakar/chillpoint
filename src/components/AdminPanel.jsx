import { useState } from 'react'
import { createPortal } from 'react-dom'
import { FiX, FiLock, FiTrash2, FiEdit2, FiCheck, FiXCircle, FiPlus, FiKey, FiTag, FiEye, FiEyeOff, FiDownload } from 'react-icons/fi'
import { useMenu, useAdmin, useCategories } from '../hooks/useData'

const inputStyle = {
  width: '100%', padding: '12px 14px', border: '2px solid #e5e5e5',
  fontSize: 15, outline: 'none', background: 'white', color: '#1C1C1C',
  fontFamily: 'inherit', borderRadius: 0,
}

const TABS = [
  { id: 'menu', label: 'Menu', icon: '🍽️' },
  { id: 'categories', label: 'Categories', icon: '🗂️' },
  { id: 'qrcodes', label: 'QR Codes', icon: '🔍' },
  { id: 'security', label: 'Security', icon: '🔐' },
]

const QR_CODES = [
  {
    id: 'chillpoint',
    label: 'Chill Point Website',
    description: 'Scan to visit the Chill Point website',
    icon: '🌐',
    file: '/assets/chillpoint-qr-code.png',
    filename: 'chillpoint-website-qr.png',
  },
  {
    id: 'reviews',
    label: 'Leave a Review',
    description: 'Scan to leave a Google review',
    icon: '⭐',
    file: '/assets/reviews-qr-code.png',
    filename: 'chillpoint-reviews-qr.png',
  },
  {
    id: 'menu',
    label: 'View Menu',
    description: 'Scan to open the digital menu',
    icon: '🍽️',
    file: '/assets/menu-qr-code.png',
    filename: 'chillpoint-menu-qr.png',
  },
]

// ── Reusable password input with show/hide toggle ─────────
function PasswordInput({ value, onChange, placeholder, name, autoComplete, autoFocus }) {
  const [show, setShow] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        style={{ ...inputStyle, paddingRight: 44 }}
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 4, display: 'flex', alignItems: 'center' }}
        tabIndex={-1}
      >
        {show ? <FiEyeOff size={17} /> : <FiEye size={17} />}
      </button>
    </div>
  )
}

// ── QR Code Card ──────────────────────────────────────────
function QRCard({ qr }) {
  const [downloading, setDownloading] = useState(false)

  async function handleDownload() {
    setDownloading(true)
    try {
      const response = await fetch(qr.file)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = qr.filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
    }
    setDownloading(false)
  }

  return (
    <div style={{ background: 'white', border: '2px solid #e5e5e5', overflow: 'hidden', marginBottom: 14 }}>
      <div style={{ background: '#1C1C1C', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>{qr.icon}</span>
        <span style={{ fontFamily: 'Bebas Neue', fontSize: 15, color: '#F5C800', letterSpacing: 2 }}>{qr.label}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px', gap: 12 }}>
        <div style={{ border: '3px solid #F5C800', padding: 8, background: 'white', display: 'inline-block' }}>
          <img src={qr.file} alt={qr.label} style={{ width: 200, height: 200, display: 'block', objectFit: 'contain' }} />
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#888', textAlign: 'center' }}>{qr.description}</p>
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: '#1C1C1C', color: '#F5C800', border: '2px solid #1C1C1C', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'inherit', opacity: downloading ? 0.7 : 1, transition: 'all 0.15s' }}
        >
          <FiDownload size={15} />
          {downloading ? 'Downloading…' : 'Download PNG'}
        </button>
      </div>
    </div>
  )
}

// ── Editable Item Row ─────────────────────────────────────
function EditableItemRow({ item, categories, onUpdate, onDelete, onToggleAvail }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ name: item.name, price: item.price, category: item.category, is_popular: item.is_popular })
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    await onUpdate(item.id, { ...draft, price: parseInt(draft.price) })
    setSaving(false)
    setEditing(false)
  }

  function cancel() {
    setDraft({ name: item.name, price: item.price, category: item.category, is_popular: item.is_popular })
    setEditing(false)
  }

  if (editing) return (
    <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', background: '#fffdf0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
        <input value={draft.name} onChange={e => setDraft(p => ({ ...p, name: e.target.value }))}
          placeholder="Item name" style={inputStyle} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input type="number" value={draft.price} onChange={e => setDraft(p => ({ ...p, price: e.target.value }))}
            placeholder="Price (₹)" style={inputStyle} />
          <select value={draft.category} onChange={e => setDraft(p => ({ ...p, category: e.target.value }))}
            style={{ ...inputStyle, background: 'white' }}>
            {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
          </select>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#555', cursor: 'pointer', padding: '8px 0' }}>
          <input type="checkbox" checked={draft.is_popular} onChange={e => setDraft(p => ({ ...p, is_popular: e.target.checked }))}
            style={{ accentColor: '#F5C800', width: 18, height: 18 }} />
          Mark as Popular ⭐
        </label>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={save} disabled={saving}
          style={{ flex: 1, padding: '10px', background: '#16a34a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <FiCheck size={14} />{saving ? 'Saving…' : 'Save'}
        </button>
        <button onClick={cancel}
          style={{ flex: 1, padding: '10px', background: 'none', border: '2px solid #e5e5e5', cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <FiXCircle size={14} /> Cancel
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: item.is_available ? '#1C1C1C' : '#aaa', textDecoration: item.is_available ? 'none' : 'line-through', flex: 1 }}>
          {item.name}
        </span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#E85D04', flexShrink: 0 }}>₹{item.price}</span>
        {item.is_popular && <span style={{ fontSize: 10, background: '#F5C800', color: '#1C1C1C', padding: '2px 8px', fontWeight: 700 }}>POPULAR</span>}
        {!item.is_available && <span style={{ fontSize: 10, background: '#fee2e2', color: '#ef4444', padding: '2px 8px', fontWeight: 700 }}>UNAVAILABLE</span>}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={() => onToggleAvail(item.id, item.is_available)}
          style={{ flex: 1, padding: '8px 6px', fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `2px solid ${item.is_available ? '#16a34a' : '#ef4444'}`, background: 'transparent', color: item.is_available ? '#16a34a' : '#ef4444', whiteSpace: 'nowrap' }}>
          {item.is_available ? '✓ Available' : '✗ Unavailable'}
        </button>
        <button onClick={() => setEditing(true)}
          style={{ padding: '8px 12px', background: 'none', border: '2px solid #e5e5e5', color: '#1C1C1C', cursor: 'pointer' }}>
          <FiEdit2 size={14} />
        </button>
        <button onClick={() => { if (window.confirm(`Delete "${item.name}"?`)) onDelete(item.id) }}
          style={{ padding: '8px 12px', background: 'none', border: '2px solid #fee2e2', color: '#ef4444', cursor: 'pointer' }}>
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  )
}

// ── Category Row ──────────────────────────────────────────
function CategoryRow({ cat, itemCount, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const [err, setErr] = useState('')

  async function handleDelete() {
    setErr('')
    const warning = itemCount > 0
      ? `"${cat.label}" has ${itemCount} menu item${itemCount > 1 ? 's' : ''} assigned to it.\n\nDeleting this category will NOT delete those items, but they will appear uncategorised.\n\nAre you sure you want to delete "${cat.label}"?`
      : `Delete category "${cat.label}"? This cannot be undone.`

    if (!window.confirm(warning)) return

    setDeleting(true)
    const { error } = await onDelete(cat.id)
    setDeleting(false)
    if (error) setErr('Failed to delete. Please try again.')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: '1px solid #f0f0f0' }}>
      <span style={{ fontSize: 28 }}>{cat.emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{cat.label}</div>
        <div style={{ fontSize: 12, color: '#888' }}>id: {cat.id}</div>
        {err && <div style={{ fontSize: 12, color: '#ef4444', marginTop: 2 }}>{err}</div>}
      </div>
      <div style={{ background: '#f5f5f5', padding: '4px 10px', fontSize: 12, color: '#555', fontWeight: 600, flexShrink: 0 }}>
        {itemCount} items
      </div>
      <button
        onClick={handleDelete}
        disabled={deleting}
        title="Delete category"
        style={{ padding: '8px 10px', background: 'none', border: '2px solid #fee2e2', color: '#ef4444', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', opacity: deleting ? 0.5 : 1 }}
      >
        <FiTrash2 size={14} />
      </button>
    </div>
  )
}

// ── Main AdminPanel ───────────────────────────────────────
export default function AdminPanel({ onClose }) {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState('')
  const [checking, setChecking] = useState(false)
  const [activeTab, setActiveTab] = useState('menu')

  const { verifyPassword, changePassword } = useAdmin()
  const { items, loading, toggleAvailability, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu()
  const { categories, addCategory, deleteCategory } = useCategories()

  const [newItem, setNewItem] = useState({ name: '', category: '', price: '', is_available: true, is_popular: false, is_veg: true })
  const [adding, setAdding] = useState(false)
  const [addErr, setAddErr] = useState('')

  const [newCat, setNewCat] = useState({ label: '', emoji: '' })
  const [addingCat, setAddingCat] = useState(false)
  const [catErr, setCatErr] = useState('')

  const [oldPw, setOldPw] = useState('')
  const [newPw1, setNewPw1] = useState('')
  const [newPw2, setNewPw2] = useState('')
  const [pwMsg, setPwMsg] = useState(null)
  const [pwChanging, setPwChanging] = useState(false)

  const defaultCat = categories[0]?.id || 'chaat'
  const grouped = categories.map(c => ({ ...c, items: items.filter(i => i.category === c.id) }))

  async function login(e) {
    e.preventDefault()
    setChecking(true); setPwErr('')
    const ok = await verifyPassword(pw)
    setChecking(false)
    if (ok) setAuthed(true)
    else setPwErr('Incorrect password. Please try again.')
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!newItem.name.trim() || !newItem.price) { setAddErr('Name and price are required.'); return }
    setAdding(true); setAddErr('')
    const cat = newItem.category || defaultCat
    const { error } = await addMenuItem({ ...newItem, category: cat, price: parseInt(newItem.price) })
    setAdding(false)
    if (error) { setAddErr('Failed to add item. Please try again.'); return }
    setNewItem({ name: '', category: cat, price: '', is_available: true, is_popular: false, is_veg: true })
  }

  async function handleAddCat(e) {
    e.preventDefault()
    if (!newCat.label.trim() || !newCat.emoji.trim()) { setCatErr('Label and emoji are required.'); return }
    const generatedId = newCat.label.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
    setAddingCat(true); setCatErr('')
    const { error } = await addCategory({ id: generatedId, label: newCat.label.trim(), emoji: newCat.emoji.trim(), color: 'from-yellow-400 to-orange-400' })
    setAddingCat(false)
    if (error) { setCatErr('Failed to add category. ID may already exist.'); return }
    setNewCat({ label: '', emoji: '' })
  }

  async function handleChangePw(e) {
    e.preventDefault()
    setPwMsg(null)
    if (newPw1 !== newPw2) { setPwMsg({ ok: false, text: 'New passwords do not match.' }); return }
    if (newPw1.length < 6) { setPwMsg({ ok: false, text: 'Password must be at least 6 characters.' }); return }
    setPwChanging(true)
    const validOld = await verifyPassword(oldPw)
    if (!validOld) { setPwMsg({ ok: false, text: 'Current password is incorrect.' }); setPwChanging(false); return }
    const { error } = await changePassword(newPw1)
    setPwChanging(false)
    if (error) setPwMsg({ ok: false, text: 'Failed to update password. Please try again.' })
    else { setPwMsg({ ok: true, text: 'Password changed successfully!' }); setOldPw(''); setNewPw1(''); setNewPw2('') }
  }

  // ── Login Screen ──
  if (!authed) return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'white', padding: 'clamp(28px,6vw,48px) clamp(24px,5vw,40px)', width: '100%', maxWidth: 400, position: 'relative', borderTop: '4px solid #F5C800' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><FiX size={20} /></button>
        <div style={{ width: 48, height: 48, background: '#1C1C1C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <FiLock size={20} color="#F5C800" />
        </div>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: '#1C1C1C', letterSpacing: 3, marginBottom: 6 }}>ADMIN ACCESS</div>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>Enter your admin password to continue</div>
        <form onSubmit={login} style={{ display: 'grid', gap: 12 }}>
          <PasswordInput value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" autoFocus />
          {pwErr && <div style={{ color: '#ef4444', fontSize: 13 }}>{pwErr}</div>}
          <button type="submit" disabled={checking} className="btn-dark" style={{ justifyContent: 'center', opacity: checking ? 0.7 : 1 }}>
            {checking ? 'Verifying…' : 'Login'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  )

  // ── Main Panel ──
  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#f9f9f9', width: '100%', maxWidth: 860, height: '92vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', borderTop: '4px solid #F5C800' }}>

        {/* Header */}
        <div style={{ background: '#1C1C1C', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: '#F5C800', letterSpacing: 3 }}>⚙ CHILL POINT ADMIN</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: 4 }}><FiX size={20} /></button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#111', flexShrink: 0, borderBottom: '1px solid #222' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, padding: '12px 4px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, color: activeTab === tab.id ? '#F5C800' : 'rgba(255,255,255,0.4)', borderBottom: activeTab === tab.id ? '3px solid #F5C800' : '3px solid transparent', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 18 }}>{tab.icon}</span>
              <span style={{ fontSize: 10 }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px' }}>

          {/* ── TAB: MENU ITEMS ── */}
          {activeTab === 'menu' && (
            <>
              <div style={{ background: 'white', border: '2px solid #e5e5e5', padding: '16px', marginBottom: 16, borderTop: '3px solid #F5C800' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <FiPlus size={15} />
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 17, color: '#1C1C1C', letterSpacing: 2 }}>ADD NEW ITEM</span>
                </div>
                <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} placeholder="Item name" style={inputStyle} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <input type="number" value={newItem.price} onChange={e => setNewItem(p => ({ ...p, price: e.target.value }))} placeholder="Price (₹)" style={inputStyle} />
                    <select value={newItem.category || defaultCat} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))} style={{ ...inputStyle, background: 'white' }}>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                    </select>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#555', cursor: 'pointer' }}>
                    <input type="checkbox" checked={newItem.is_popular} onChange={e => setNewItem(p => ({ ...p, is_popular: e.target.checked }))} style={{ accentColor: '#F5C800', width: 18, height: 18 }} />
                    Mark as Popular ⭐
                  </label>
                  {addErr && <div style={{ color: '#ef4444', fontSize: 13 }}>{addErr}</div>}
                  <button type="submit" disabled={adding} className="btn-dark" style={{ justifyContent: 'center', opacity: adding ? 0.7 : 1 }}>
                    {adding ? 'Adding…' : '+ Add Item'}
                  </button>
                </form>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>Loading menu…</div>
              ) : (
                grouped.map(cat => (
                  <div key={cat.id} style={{ background: 'white', border: '2px solid #e5e5e5', marginBottom: 10, overflow: 'hidden' }}>
                    <div style={{ background: '#1C1C1C', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span>{cat.emoji}</span>
                      <span style={{ fontFamily: 'Bebas Neue', fontSize: 15, color: '#F5C800', letterSpacing: 2 }}>{cat.label}</span>
                      <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '2px 8px', marginLeft: 4 }}>{cat.items.length} items</span>
                    </div>
                    {cat.items.length === 0 ? (
                      <div style={{ padding: '14px 16px', fontSize: 13, color: '#aaa' }}>No items yet.</div>
                    ) : (
                      cat.items.map(item => (
                        <EditableItemRow
                          key={item.id}
                          item={item}
                          categories={categories}
                          onUpdate={updateMenuItem}
                          onDelete={deleteMenuItem}
                          onToggleAvail={toggleAvailability}
                        />
                      ))
                    )}
                  </div>
                ))
              )}
            </>
          )}

          {/* ── TAB: CATEGORIES ── */}
          {activeTab === 'categories' && (
            <>
              <div style={{ background: 'white', border: '2px solid #e5e5e5', padding: '16px', marginBottom: 16, borderTop: '3px solid #F5C800' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <FiTag size={15} />
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 17, color: '#1C1C1C', letterSpacing: 2 }}>ADD NEW CATEGORY</span>
                </div>
                <form onSubmit={handleAddCat} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <input
                      value={newCat.label}
                      onChange={e => setNewCat(p => ({ ...p, label: e.target.value }))}
                      placeholder="Label (e.g. Burger)"
                      style={inputStyle}
                    />
                    {newCat.label.trim() && (
                      <div style={{ fontSize: 11, color: '#888', marginTop: 4, paddingLeft: 2 }}>
                        ID will be: <strong style={{ color: '#1C1C1C' }}>{newCat.label.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}</strong>
                      </div>
                    )}
                  </div>
                  <input value={newCat.emoji} onChange={e => setNewCat(p => ({ ...p, emoji: e.target.value }))} placeholder="Emoji (e.g. 🍔)" style={inputStyle} />
                  {catErr && <div style={{ color: '#ef4444', fontSize: 13 }}>{catErr}</div>}
                  <button type="submit" disabled={addingCat} className="btn-dark" style={{ justifyContent: 'center', opacity: addingCat ? 0.7 : 1 }}>
                    {addingCat ? 'Adding…' : '+ Add Category'}
                  </button>
                </form>
              </div>

              <div style={{ background: 'white', border: '2px solid #e5e5e5', overflow: 'hidden' }}>
                <div style={{ background: '#1C1C1C', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 15, color: '#F5C800', letterSpacing: 2 }}>CURRENT CATEGORIES</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{categories.length} total</span>
                </div>
                {categories.length === 0 && (
                  <div style={{ padding: '14px 16px', fontSize: 13, color: '#aaa' }}>No categories yet.</div>
                )}
                {categories.map(cat => (
                  <CategoryRow
                    key={cat.id}
                    cat={cat}
                    itemCount={items.filter(it => it.category === cat.id).length}
                    onDelete={deleteCategory}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── TAB: QR CODES ── */}
          {activeTab === 'qrcodes' && (
            <div>
              <div style={{ display: 'flex', gap: 10, background: '#fff8e1', border: '1px solid #F5C800', padding: '10px 14px', marginBottom: 16 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>🔍</span>
                <p style={{ margin: 0, fontSize: 13, color: '#7a5c00', lineHeight: 1.6 }}>
                  Download and print these QR codes for your tables, counter, or marketing materials.
                  Each code links directly to the respective destination.
                </p>
              </div>
              {QR_CODES.map(qr => (
                <QRCard key={qr.id} qr={qr} />
              ))}
            </div>
          )}

          {/* ── TAB: SECURITY ── */}
          {activeTab === 'security' && (
            <div>
              <div style={{ background: 'white', border: '2px solid #e5e5e5', padding: '16px', borderTop: '3px solid #F5C800' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <FiKey size={15} />
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: 17, color: '#1C1C1C', letterSpacing: 2 }}>CHANGE PASSWORD</span>
                </div>
                <div style={{ display: 'flex', gap: 10, background: '#fff8e1', border: '1px solid #f5c800', padding: '10px 14px', marginBottom: 14 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
                  <p style={{ margin: 0, fontSize: 13, color: '#7a5c00', lineHeight: 1.6 }}>
                    <strong>This password secures your entire admin panel.</strong> Use a strong password with a mix of uppercase, lowercase, numbers, and symbols. <strong>There is no "Forgot Password" option</strong> — for security reasons, passwords cannot be recovered or sent via email.
                  </p>
                </div>
                <form onSubmit={handleChangePw} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <PasswordInput name="current-password" autoComplete="current-password" value={oldPw} onChange={e => setOldPw(e.target.value)} placeholder="Current password" />
                  <PasswordInput name="new-password" autoComplete="new-password" value={newPw1} onChange={e => setNewPw1(e.target.value)} placeholder="New password" />
                  <PasswordInput name="confirm-password" autoComplete="new-password" value={newPw2} onChange={e => setNewPw2(e.target.value)} placeholder="Confirm new password" />
                  {pwMsg && (
                    <div style={{ fontSize: 13, fontWeight: 600, color: pwMsg.ok ? '#16a34a' : '#ef4444', padding: '10px 14px', background: pwMsg.ok ? '#f0fdf4' : '#fef2f2', border: `1px solid ${pwMsg.ok ? '#bbf7d0' : '#fecaca'}` }}>
                      {pwMsg.text}
                    </div>
                  )}
                  <button type="submit" disabled={pwChanging} className="btn-dark" style={{ justifyContent: 'center', opacity: pwChanging ? 0.7 : 1 }}>
                    {pwChanging ? 'Updating…' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  )
}