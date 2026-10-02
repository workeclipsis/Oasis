import { useState, useEffect, useCallback } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { label: 'Services',  href: '#services' },
  { label: 'Work',      href: '#work' },
  { label: 'Why',       href: '#why' },
  { label: 'Reviews',   href: '#reviews' },
  { label: 'Pricing',   href: '#pricing' },
  { label: 'Learn',     href: '#learn' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || open ? 'rgba(11,23,19,0.85)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background 0.25s, border-color 0.25s',
      }}
    >
      <div style={{
        maxWidth: 1240, margin: '0 auto', padding: '0 40px',
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }} className="nav-inner">
        {/* Wordmark */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9 }} aria-label="OASIS — home">
          <span style={{
            width: 22, height: 22, borderRadius: '50%',
            border: '1.5px solid var(--sage)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)' }} />
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 700, color: 'var(--fg)', letterSpacing: '0.02em' }}>
            OASIS
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hide-mobile">
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{
                color: 'var(--fg-soft)', fontSize: 12, fontWeight: 500,
                padding: '8px 14px', textDecoration: 'none',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-soft)')}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary" style={{ marginLeft: 14, padding: '11px 22px', fontSize: 11, minHeight: 42 }}>
            Get Started <ArrowRight size={13} />
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="show-mobile"
          style={{
            background: 'none', border: 'none', color: 'var(--fg)',
            cursor: 'pointer', width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}>
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
          background: 'rgba(11,23,19,0.98)', backdropFilter: 'blur(16px)', zIndex: 999,
          overflowY: 'auto', WebkitOverflowScrolling: 'touch',
          borderTop: '1px solid var(--line)',
        }}>
          <div style={{ padding: '16px 20px 40px', display: 'flex', flexDirection: 'column' }}>
            {links.map((l, i) => (
              <a key={l.label} href={l.href} onClick={close}
                style={{
                  color: 'var(--fg)', fontSize: 20,
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  padding: '18px 0', textDecoration: 'none',
                  borderBottom: '1px solid var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  minHeight: 58,
                  opacity: 0, animation: `fadeUp 0.25s ease ${i * 0.04}s forwards`,
                }}>
                {l.label}
                <ArrowRight size={16} style={{ color: 'var(--green)' }} />
              </a>
            ))}
            <a href="#contact" className="btn-primary" onClick={close}
              style={{ marginTop: 28, justifyContent: 'center', padding: '16px 24px', fontSize: 13 }}>
              Get Started <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}

      <style>{`@media(max-width:768px){.nav-inner{padding:0 20px!important;height:64px!important;}}`}</style>
    </header>
  )
}
