import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, CheckCircle, Quote } from 'lucide-react'
import {
  submitReview, getApprovedReviews, isOnCooldown,
  type PublicReview, type ReviewInput,
} from '../lib/reviews'

const services = [
  'Profile / Digital Identity',
  'Portfolio Website',
  'Website / Web App',
  'College Project',
  'Hardware / IoT',
  'Robotics',
  'Mentoring / Learning',
  'Custom Project',
]

const lbl: React.CSSProperties = {
  display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)',
  letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'var(--ink-muted)', marginBottom: 7,
}

function Stars({ value, onChange, size = 22 }: { value: number; onChange?: (v: number) => void; size?: number }) {
  const interactive = Boolean(onChange)
  return (
    <div style={{ display: 'flex', gap: 4 }} role={interactive ? 'radiogroup' : undefined} aria-label="Rating">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          aria-checked={interactive ? value === n : undefined}
          role={interactive ? 'radio' : undefined}
          style={{
            background: 'none', border: 'none', padding: 0,
            cursor: interactive ? 'pointer' : 'default',
            lineHeight: 0, display: 'inline-flex',
          }}
        >
          <Star
            size={size}
            strokeWidth={1.5}
            style={{ color: n <= value ? 'var(--accent-warm, var(--accent-amber))' : 'var(--line-strong)' }}
            fill={n <= value ? 'var(--accent-warm, var(--accent-amber))' : 'none'}
          />
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ r }: { r: PublicReview }) {
  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '28px 26px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <Quote size={22} style={{ color: 'var(--line-strong)' }} />
        <Stars value={r.rating} size={14} />
      </div>
      <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic', flex: 1 }}>
        {r.review}
      </p>
      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{r.name}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 3 }}>
          {[r.college, r.service].filter(Boolean).join(' · ') || 'OASIS client'}
        </div>
        {r.projectLink && (
          <a href={r.projectLink} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--line)', display: 'inline-block', marginTop: 8, paddingBottom: 1 }}>
            View project ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default function Reviews() {
  const [approved, setApproved] = useState<PublicReview[]>([])
  const [showForm, setShowForm] = useState(false)
  const [cooldown, setCooldown] = useState(false)

  const [form, setForm] = useState<ReviewInput>({
    name: '', email: '', college: '', service: '', rating: 0, review: '', projectLink: '',
  })
  const [consent, setConsent] = useState(false)
  const [error, setError]     = useState('')
  const [sent, setSent]       = useState(false)

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true
    getApprovedReviews().then(rows => { if (active) setApproved(rows) })
    setCooldown(isOnCooldown())
    return () => { active = false }
  }, [])

  const set = <K extends keyof ReviewInput>(k: K, v: ReviewInput[K]) => {
    setForm(p => ({ ...p, [k]: v }))
    setError('')
  }

  const handleSubmit = async () => {
    if (!consent) { setError('Please confirm consent to publish your review.'); return }
    if (submitting) return
    setSubmitting(true)
    const result = await submitReview(form)
    setSubmitting(false)
    if (!result.ok) { setError(result.error ?? 'Something went wrong.'); return }
    setSent(true)
    setCooldown(true)
  }

  return (
    <section id="reviews" className="section on-light" style={{ background: 'var(--ivory)' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <span className="section-label">Reviews</span>
          <h2 className="display-lg" style={{ marginTop: 8, maxWidth: 520 }}>
            Worked with OASIS?<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent-mint)' }}>Tell us how it went.</em>
          </h2>
          <p className="body-lg" style={{ maxWidth: 460, marginTop: 16 }}>
            Every review is read and approved before it appears here. Honest feedback only.
          </p>
        </motion.div>

        {/* Approved reviews or empty state */}
        {approved.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 48 }}>
            {approved.map(r => <ReviewCard key={r.id} r={r} />)}
          </div>
        ) : (
          <div style={{ border: '1px dashed var(--line-strong)', padding: '48px 32px', textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: 'var(--ink)', marginBottom: 8 }}>
              Be one of our first reviewers.
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
              No approved reviews yet — your feedback could be the first shown here.
            </p>
          </div>
        )}

        {/* CTA / Form toggle */}
        {!showForm && !sent && (
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            Leave a Review
          </button>
        )}

        {/* Success message */}
        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderTop: '2px solid var(--accent-mint)', padding: '36px 32px', maxWidth: 560 }}
            >
              <CheckCircle size={32} color="var(--accent-mint)" style={{ marginBottom: 16 }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)', marginBottom: 10 }}>
                Thanks for sharing your experience.
              </h3>
              <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                Your review has been submitted and is awaiting approval. Once approved, it'll appear on this page.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submission form */}
        <AnimatePresence>
          {showForm && !sent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderTop: '2px solid var(--ink)', padding: '32px 28px', maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 18, marginTop: 4 }}>

                {cooldown && (
                  <p style={{ fontSize: 13, color: 'var(--ink-muted)', background: 'var(--paper-dark)', padding: '12px 16px', lineHeight: 1.6 }}>
                    You recently submitted a review. You can submit another after a short cooldown — thanks for keeping it genuine.
                  </p>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="rev-row">
                  <div>
                    <label style={lbl} htmlFor="rev-name">Full Name *</label>
                    <input id="rev-name" className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" autoComplete="name" />
                  </div>
                  <div>
                    <label style={lbl} htmlFor="rev-email">Email *</label>
                    <input id="rev-email" className="input-field" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" autoComplete="email" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="rev-row">
                  <div>
                    <label style={lbl} htmlFor="rev-college">College / University</label>
                    <input id="rev-college" className="input-field" value={form.college} onChange={e => set('college', e.target.value)} placeholder="e.g. BMSCE" />
                  </div>
                  <div>
                    <label style={lbl} htmlFor="rev-service">Service Received</label>
                    <select id="rev-service" className="input-field" value={form.service} onChange={e => set('service', e.target.value)} style={{ appearance: 'none', cursor: 'pointer', minHeight: 46 }}>
                      <option value="">Select…</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={lbl}>Rating *</label>
                  <Stars value={form.rating} onChange={v => set('rating', v)} />
                </div>

                <div>
                  <label style={lbl} htmlFor="rev-text">Your Review *</label>
                  <textarea id="rev-text" className="input-field" rows={4} value={form.review} onChange={e => set('review', e.target.value)} placeholder="What did we build for you, and how was the experience?" style={{ resize: 'vertical', minHeight: 100 }} maxLength={800} />
                </div>

                <div>
                  <label style={lbl} htmlFor="rev-link">Project / Work Link</label>
                  <input id="rev-link" className="input-field" value={form.projectLink} onChange={e => set('projectLink', e.target.value)} placeholder="https://…" inputMode="url" />
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, cursor: 'pointer' }}>
                  <input type="checkbox" checked={consent} onChange={e => { setConsent(e.target.checked); setError('') }} style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, accentColor: 'var(--ink)' }} />
                  <span>I consent to OASIS publishing my name, college, and review publicly. My email will not be shown. *</span>
                </label>

                {error && <p style={{ fontSize: 13, color: 'var(--error)' }}>{error}</p>}

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Review'}
                  </button>
                  <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`@media(max-width:600px){.rev-row{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
