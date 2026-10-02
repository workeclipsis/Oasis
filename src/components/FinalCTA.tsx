import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import DOMPurify from 'dompurify'
import { Send, CheckCircle } from 'lucide-react'

// EmailJS credentials — public key is intentionally client-side per EmailJS architecture.
// Rotate via the EmailJS dashboard if needed; update these constants accordingly.
const EMAIL_SERVICE    = 'service_t1eh0d2'
const EMAIL_TEMPLATE   = 'template_p85yx0r'
const EMAIL_PUBLIC_KEY = 'rnUSdZeNbzBmDbPnW'

const services = [
  'Profile / Digital Identity',
  'Portfolio Website',
  'Website / Web App',
  'College Project',
  'Hardware / IoT',
  'Robotics',
  'Mentoring / Learning',
  'Custom Project',
  'Not Sure Yet',
]

const budgets = [
  'Basic — ₹999',
  'Standard — ₹1,499',
  'Custom — ₹2,999+',
  'Not sure yet',
]

const timelines = [
  'ASAP (under a week)',
  '1–2 weeks',
  'Flexible',
]

function sanitize(s: string, max: number): string {
  return DOMPurify.sanitize(s.trim(), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).slice(0, max)
}
function validEmail(e: string): boolean {
  return /^[^\s@<>"']{1,64}@[^\s@<>"']{1,253}\.[a-zA-Z]{2,}$/.test(e)
}

const lbl: React.CSSProperties = {
  display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)',
  letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'var(--ink-muted)', marginBottom: 7,
}

export default function FinalCTA() {
  const [form, setForm] = useState({
    name: '', email: '', college: '', service: '',
    budget: '', timeline: '', message: '',
  })
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  // Initialize EmailJS once on mount (v4 best practice).
  useEffect(() => {
    emailjs.init({ publicKey: EMAIL_PUBLIC_KEY })
  }, [])

  const set = (f: string, v: string) => {
    setForm(p => ({ ...p, [f]: v }))
    setErrors(e => ({ ...e, [f]: '' }))
  }

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name    = 'Enter your full name'
    if (!validEmail(form.email))                           e.email   = 'Enter a valid email address'
    if (!form.service)                                     e.service = 'Select a service'
    return e
  }

  const submit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setStatus('sending')
    try {
      await emailjs.send(
        EMAIL_SERVICE,
        EMAIL_TEMPLATE,
        {
          from_name:     sanitize(form.name,     80),
          from_email:    sanitize(form.email,    120),
          from_college:  sanitize(form.college,  100),
          service:       sanitize(form.service,   60),
          budget:        sanitize(form.budget,    50),
          timeline:      sanitize(form.timeline,  50),
          message:       sanitize(form.message,  800) || '(no additional details provided)',
          reply_to:      sanitize(form.email,    120),
        },
        EMAIL_PUBLIC_KEY,
      )
      setStatus('sent')
    } catch (err) {
      // Log the actual error for debugging rather than swallowing it.
      // (Helps diagnose invalid service/template IDs or mismatched vars.)
      console.error('[OASIS] EmailJS send failed:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section on-dark" style={{ background: 'var(--forest)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }} className="cta-grid">

          {/* Left — copy */}
          <div>
            <span className="section-label">Get Started</span>
            <h2 className="display-lg" style={{ marginTop: 8, marginBottom: 20 }}>
              Ready to build<br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent-mint)' }}>something better?</em>
            </h2>
            <p className="body-lg" style={{ marginBottom: 36, maxWidth: 420 }}>
              Fill in the form. We review every message personally and reply within 24 hours.
              No auto-responses, no waiting rooms.
            </p>

            {/* What to expect */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
              {[
                'Custom work — not templates',
                'Delivered in 3–7 working days',
                'Revisions until you\'re satisfied',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--ink-muted)' }}>
                  <CheckCircle size={14} color="var(--accent-mint)" strokeWidth={1.5} />
                  {item}
                </div>
              ))}
            </div>

            {/* Promise block */}
            <div style={{
              padding: '20px 24px',
              borderLeft: '2px solid var(--green)',
              background: 'var(--surface)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10 }}>
                Our promise
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.78 }}>
                If you're not satisfied with the first delivery, we keep revising until you are.
                No extra charges. No hidden fees.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--paper-dark)', border: '1px solid var(--line)',
                  borderTop: '2px solid var(--accent-mint)',
                  textAlign: 'center', padding: '56px 40px',
                }}
              >
                <CheckCircle size={36} color="var(--accent-mint)" style={{ margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)', marginBottom: 12 }}>
                  Message sent.
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                  We've received your message and will reply within 24 hours.
                  Check your inbox at <strong>{form.email}</strong>.
                </p>
              </motion.div>
            ) : (
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--line)',
                borderTop: '2px solid var(--green)',
                padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 18,
              }}>

                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                  <div>
                    <label style={lbl} htmlFor="cta-name">Full Name *</label>
                    <input
                      id="cta-name" className={`input-field${errors.name ? ' error' : ''}`}
                      placeholder="Your name" value={form.name} autoComplete="name"
                      onChange={e => set('name', e.target.value)}
                      inputMode="text" enterKeyHint="next"
                    />
                    {errors.name && <span style={{ fontSize: 11, color: 'var(--error)', marginTop: 4, display: 'block' }}>{errors.name}</span>}
                  </div>
                  <div>
                    <label style={lbl} htmlFor="cta-email">Email *</label>
                    <input
                      id="cta-email" className={`input-field${errors.email ? ' error' : ''}`}
                      placeholder="you@email.com" type="email" autoComplete="email"
                      value={form.email} onChange={e => set('email', e.target.value)}
                      inputMode="email" enterKeyHint="next"
                    />
                    {errors.email && <span style={{ fontSize: 11, color: 'var(--error)', marginTop: 4, display: 'block' }}>{errors.email}</span>}
                  </div>
                </div>

                {/* College */}
                <div>
                  <label style={lbl} htmlFor="cta-college">College / University</label>
                  <input
                    id="cta-college" className="input-field"
                    placeholder="e.g. BMSCE, Bangalore"
                    autoComplete="organization" value={form.college}
                    onChange={e => set('college', e.target.value)}
                    inputMode="text" enterKeyHint="next"
                  />
                </div>

                {/* Service */}
                <div>
                  <label style={lbl} htmlFor="cta-service">What do you need help with? *</label>
                  <select
                    id="cta-service"
                    className={`input-field${errors.service ? ' error' : ''}`}
                    value={form.service} onChange={e => set('service', e.target.value)}
                    style={{ appearance: 'none', cursor: 'pointer', minHeight: 46 }}
                  >
                    <option value="">Select a service…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <span style={{ fontSize: 11, color: 'var(--error)', marginTop: 4, display: 'block' }}>{errors.service}</span>}
                </div>

                {/* Budget + Timeline */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                  <div>
                    <label style={lbl} htmlFor="cta-budget">Budget</label>
                    <select
                      id="cta-budget" className="input-field"
                      value={form.budget} onChange={e => set('budget', e.target.value)}
                      style={{ appearance: 'none', cursor: 'pointer', minHeight: 46 }}
                    >
                      <option value="">Select…</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl} htmlFor="cta-timeline">Timeline</label>
                    <select
                      id="cta-timeline" className="input-field"
                      value={form.timeline} onChange={e => set('timeline', e.target.value)}
                      style={{ appearance: 'none', cursor: 'pointer', minHeight: 46 }}
                    >
                      <option value="">Select…</option>
                      {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={lbl} htmlFor="cta-message">Tell us about your project</label>
                  <textarea
                    id="cta-message" className="input-field"
                    placeholder="Year of study, tech stack, goals, deadline, anything useful…"
                    rows={4} value={form.message}
                    onChange={e => set('message', e.target.value)}
                    style={{ resize: 'vertical', minHeight: 100 }} maxLength={800}
                  />
                </div>

                {/* Error state */}
                {status === 'error' && (
                  <p style={{ fontSize: 13, color: 'var(--error)', lineHeight: 1.6 }}>
                    Something went wrong while sending your message. Please try again,
                    or reach us directly at{' '}
                    <a href="mailto:naveen.a.patil7@gmail.com" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>
                      naveen.a.patil7@gmail.com
                    </a>
                  </p>
                )}

                <button
                  className="btn-primary"
                  onClick={submit}
                  disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center', minHeight: 50, fontSize: 13 }}
                >
                  {status === 'sending'
                    ? 'Sending…'
                    : <><Send size={14} /> Send Message</>
                  }
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media(max-width: 500px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
