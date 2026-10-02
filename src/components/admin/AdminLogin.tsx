import { useState } from 'react'
import { Lock } from 'lucide-react'
import { adminLogin, usingSupabase } from '../../lib/reviews'

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [passcode, setPasscode] = useState('')
  const [error, setError]       = useState('')
  const [busy, setBusy]         = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    const result = usingSupabase
      ? await adminLogin(email, password)
      : await adminLogin(passcode)
    setBusy(false)
    if (result.ok) onSuccess()
    else setError(result.error ?? 'Login failed.')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--forest)', padding: 24 }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: 380, background: 'var(--forest-2)', border: '1px solid var(--line-dark)', borderTop: '2px solid var(--sage)', borderRadius: 'var(--r-lg)', padding: '40px 32px' }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--ivory)', letterSpacing: '0.02em' }}>OASIS</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', color: 'var(--sage)', textTransform: 'uppercase' }}>admin</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--on-dark-soft)', marginBottom: 28, lineHeight: 1.6 }}>
          {usingSupabase ? 'Sign in with your admin account to manage reviews.' : 'Enter the admin passcode to manage reviews.'}
        </p>

        {usingSupabase ? (
          <>
            <label htmlFor="admin-email" style={labelStyle}>Email</label>
            <input id="admin-email" type="email" className="input-field" value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              placeholder="you@oasis.studio" autoComplete="username" style={{ marginBottom: 16 }} autoFocus />
            <label htmlFor="admin-pw" style={labelStyle}>Password</label>
            <div style={{ position: 'relative', marginBottom: error ? 8 : 24 }}>
              <Lock size={14} style={iconStyle} />
              <input id="admin-pw" type="password" className="input-field" value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••" autoComplete="current-password" style={{ paddingLeft: 34 }} />
            </div>
          </>
        ) : (
          <>
            <label htmlFor="admin-pass" style={labelStyle}>Passcode</label>
            <div style={{ position: 'relative', marginBottom: error ? 8 : 24 }}>
              <Lock size={14} style={iconStyle} />
              <input id="admin-pass" type="password" className="input-field" value={passcode}
                onChange={e => { setPasscode(e.target.value); setError('') }}
                placeholder="••••••••" autoComplete="current-password" style={{ paddingLeft: 34 }} autoFocus />
            </div>
          </>
        )}

        {error && <p style={{ fontSize: 12, color: 'var(--error)', marginBottom: 24 }}>{error}</p>}

        <button type="submit" className="btn-primary" disabled={busy} style={{ width: '100%', justifyContent: 'center' }}>
          {busy ? 'Signing in…' : 'Sign In'}
        </button>

        {!usingSupabase && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--on-dark-muted)', marginTop: 20, lineHeight: 1.6 }}>
            Note: this is a frontend-only gate for a local review store. Add Supabase keys to enable real accounts.
          </p>
        )}
      </form>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)',
  letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 7,
}
const iconStyle: React.CSSProperties = {
  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--on-dark-muted)',
}
