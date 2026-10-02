import { useState, useEffect, useCallback } from 'react'
import { Star, Check, X, Trash2, LogOut, ExternalLink } from 'lucide-react'
import {
  getReviewsByStatus, approveReview, rejectReview, deleteReview,
  adminLogout, type Review, type ReviewStatus,
} from '../../lib/reviews'

const tabs: { key: ReviewStatus; label: string }[] = [
  { key: 'pending',  label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
]

function RatingStars({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} size={13} strokeWidth={1.5}
          style={{ color: n <= value ? 'var(--accent-amber)' : 'var(--line-strong)' }}
          fill={n <= value ? 'var(--accent-amber)' : 'none'} />
      ))}
    </div>
  )
}

export default function AdminReviews({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab]         = useState<ReviewStatus>('pending')
  const [rows, setRows]       = useState<Review[]>([])
  const [counts, setCounts]   = useState({ pending: 0, approved: 0, rejected: 0 })

  const refresh = useCallback(async () => {
    const [cur, p, a, r] = await Promise.all([
      getReviewsByStatus(tab),
      getReviewsByStatus('pending'),
      getReviewsByStatus('approved'),
      getReviewsByStatus('rejected'),
    ])
    setRows(cur)
    setCounts({ pending: p.length, approved: a.length, rejected: r.length })
  }, [tab])

  useEffect(() => { void refresh() }, [refresh])

  const handleLogout = async () => { await adminLogout(); onLogout() }

  const act = async (fn: (id: string) => Promise<void>, id: string) => { await fn(id); await refresh() }

  const fmtDate = (ts: number) => new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', paddingBottom: 80 }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper-dark)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em' }}>OASIS</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>admin · reviews</span>
          </div>
          <button onClick={handleLogout} className="btn-ghost" style={{ padding: '9px 16px' }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid var(--line)' }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 16px', fontSize: 13, fontWeight: tab === t.key ? 600 : 400,
                color: tab === t.key ? 'var(--ink)' : 'var(--ink-muted)',
                borderBottom: tab === t.key ? '2px solid var(--ink)' : '2px solid transparent',
                marginBottom: -1, fontFamily: 'var(--font-body)',
              }}
            >
              {t.label} <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)' }}>({counts[t.key]})</span>
            </button>
          ))}
        </div>

        {/* Rows */}
        {rows.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', padding: '48px 0', textAlign: 'center' }}>
            No {tab} reviews.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rows.map(r => (
              <div key={r.id} style={{ border: '1px solid var(--line)', background: 'var(--paper-dark)', padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{r.name}</span>
                      <RatingStars value={r.rating} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
                      {[r.college, r.service].filter(Boolean).join(' · ') || '—'} · {fmtDate(r.createdAt)}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-muted)', marginTop: 2 }}>
                      {r.email}
                    </div>
                  </div>
                  {r.projectLink && (
                    <a href={r.projectLink} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, borderBottom: '1px solid var(--line)', paddingBottom: 1 }}>
                      Project <ExternalLink size={10} />
                    </a>
                  )}
                </div>

                <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.7, marginBottom: 16 }}>{r.review}</p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tab !== 'approved' && (
                    <button onClick={() => act(approveReview, r.id)}
                      style={btn('var(--success)')}>
                      <Check size={13} /> Approve
                    </button>
                  )}
                  {tab !== 'rejected' && (
                    <button onClick={() => act(rejectReview, r.id)}
                      style={btn('var(--ink-muted)')}>
                      <X size={13} /> Reject
                    </button>
                  )}
                  <button onClick={() => { if (confirm('Delete this review permanently?')) act(deleteReview, r.id) }}
                    style={btn('var(--error)')}>
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function btn(color: string): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '8px 14px', fontSize: 12, fontWeight: 500,
    background: 'transparent', color, cursor: 'pointer',
    border: `1px solid ${color}`, borderRadius: 2,
    fontFamily: 'var(--font-body)',
  }
}
