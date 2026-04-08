import { useState } from 'react'
import { useReviews } from '../hooks/useData'

function Stars({ rating, interactive = false, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          onClick={() => interactive && onChange?.(i + 1)}
          onMouseEnter={() => interactive && setHovered(i + 1)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{
            fontSize: interactive ? 28 : 16,
            color: i < (hovered || rating) ? '#F5C800' : '#ddd',
            cursor: interactive ? 'pointer' : 'default',
            transition: 'color 0.1s',
            lineHeight: 1,
          }}
        >★</span>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  const date = new Date(review.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
  return (
    <div className="review-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, background: '#F5C800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: 22, color: '#1C1C1C', flexShrink: 0 }}>
            {review.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#1C1C1C' }}>{review.name}</div>
            <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>{date}</div>
          </div>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: '#555', fontStyle: 'italic' }}>"{review.comment}"</p>
    </div>
  )
}

export default function Reviews() {
  const { reviews, loading, submitReview } = useReviews()
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  function change(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  async function submit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.rating || !form.comment.trim()) { setErr('Please fill all fields and select a rating.'); return }
    setErr(''); setSubmitting(true)
    const { error } = await submitReview(form)
    setSubmitting(false)
    if (error) { setErr('Something went wrong. Try again.') } else {
      setDone(true); setForm({ name: '', rating: 0, comment: '' })
      setTimeout(() => setDone(false), 4000)
    }
  }

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '5.0'

  return (
    <section id="reviews" style={{ background: '#FFF8EE' }}>

      {/* Header */}
      <div style={{ background: '#F5C800', padding: '64px clamp(24px,6vw,80px)', borderBottom: '3px solid #1C1C1C' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="sec-label" style={{ color: '#1C1C1C', opacity: 0.6, marginBottom: 12 }}>Customer Love</div>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, color: '#1C1C1C', lineHeight: 1 }}>
              What People Say
            </h2>
          </div>
          {/* Rating summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#1C1C1C', padding: '20px 32px' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 64, color: '#F5C800', lineHeight: 1 }}>{avg}</div>
            <div>
              <Stars rating={5} />
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 2, marginTop: 6 }}>{reviews.length} Reviews</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px clamp(24px,4vw,48px)', gap: 48, alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-2">

        {/* Reviews list */}
        <div>
          <div style={{ marginBottom: 24, fontFamily: 'Bebas Neue', fontSize: 20, color: '#888', letterSpacing: 3 }}>RECENT REVIEWS</div>
          {loading ? (
            <div style={{ display: 'grid', gap: 12 }}>
              {[1, 2, 3].map(i => <div key={i} style={{ height: 120, background: '#eee', animation: 'pulse 1.5s infinite' }} />)}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 12, maxHeight: 560, overflowY: 'auto' }} className="scrollbar-hide">
              {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          )}
        </div>

        {/* Submit form */}
        <div style={{ background: '#1C1C1C', padding: '40px 36px', border: '3px solid #1C1C1C', position: 'sticky', top: 100 }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: '#F5C800', letterSpacing: 3, marginBottom: 8 }}>LEAVE A REVIEW</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Visited Chill Point? Tell us your experience!</div>

          {done ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🙏</div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: '#F5C800', letterSpacing: 2 }}>Thank You!</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 8 }}>Your review means a lot to us.</div>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'grid', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Your Name</label>
                <input
                  name="name" value={form.name} onChange={change} placeholder="e.g. Priya Shah"
                  style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.12)', color: 'white', fontSize: 15, outline: 'none', transition: 'border 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#F5C800'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Rating</label>
                <Stars rating={form.rating} interactive onChange={r => setForm(p => ({ ...p, rating: r }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Your Review</label>
                <textarea
                  name="comment" value={form.comment} onChange={change}
                  placeholder="What did you love about Chill Point?"
                  rows={4}
                  style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.12)', color: 'white', fontSize: 15, outline: 'none', resize: 'none', transition: 'border 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#F5C800'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>
              {err && <div style={{ color: '#ef4444', fontSize: 13 }}>{err}</div>}
              <button type="submit" disabled={submitting} className="btn-yellow" style={{ justifyContent: 'center', opacity: submitting ? 0.6 : 1 }}>
                {submitting ? 'Submitting...' : '★ Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
