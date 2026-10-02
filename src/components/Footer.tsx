import { GitFork, Link, Globe, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Services',  href: '#services' },
  { label: 'Work',      href: '#work' },
  { label: 'Process',   href: '#process' },
  { label: 'Reviews',   href: '#reviews' },
  { label: 'Pricing',   href: '#pricing' },
  { label: 'Learn',     href: '#learn' },
  { label: 'Team',      href: '#team' },
  { label: 'Contact',   href: '#contact' },
]

const socials = [
  { icon: Globe,   href: 'https://naveen-patil.vercel.app',           label: 'Naveen\'s website' },
  { icon: GitFork, href: 'https://github.com/InfoNaveen',             label: 'GitHub' },
  { icon: Link,    href: 'https://linkedin.com/in/naveen-patil-builder', label: 'LinkedIn' },
  { icon: Mail,    href: 'mailto:naveen.a.patil7@gmail.com',          label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="on-dark" style={{
      borderTop: '1px solid var(--sage)',
      background: 'var(--forest-2)',
      padding: '72px 0 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 64, marginBottom: 64 }} className="footer-grid">

          {/* Brand block */}
          <div>
            <a href="#" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }} aria-label="OASIS — home">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                OASIS
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                studio
              </span>
            </a>

            <p style={{ fontSize: 13, color: 'var(--ink-muted)', maxWidth: 360, lineHeight: 1.82, marginBottom: 28 }}>
              A student-focused technology studio building digital identities, software, college
              projects, hardware systems, and the technical work that helps ideas move from
              concept to reality.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 8 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  title={s.label} aria-label={s.label}
                  style={{
                    width: 40, height: 40, border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--ink-muted)', textDecoration: 'none', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-muted)'; e.currentTarget.style.borderColor = 'var(--line)' }}>
                  <s.icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink)', letterSpacing: '0.16em', marginBottom: 20, textTransform: 'uppercase' }}>
                Navigation
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {navLinks.slice(0, 4).map(link => (
                  <a key={link.label} href={link.href}
                    style={{ color: 'var(--ink-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink)', letterSpacing: '0.16em', marginBottom: 20, textTransform: 'uppercase' }}>
                &nbsp;
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {navLinks.slice(4).map(link => (
                  <a key={link.label} href={link.href}
                    style={{ color: 'var(--ink-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24, borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 14,
        }}>
          <div style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            © 2026 OASIS · Built with purpose, shipped with care.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)' }}>
            Naveen Patil &amp; Chinmay Muddapur
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </footer>
  )
}
