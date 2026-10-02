import { motion } from 'framer-motion'
import { ExternalLink, GitFork, Link, Globe } from 'lucide-react'

const team = [
  {
    name: 'Naveen Patil',
    role: 'Founder',
    initial: 'N',
    bio: 'Full-stack developer, AI practitioner, and cybersecurity engineer. Leads product development, client strategy, and technical execution at OASIS. Background spans hackathons, open source, and real-world client projects — from web applications to AI tooling.',
    skills: ['Full-Stack Development', 'React & Next.js', 'Node.js & TypeScript', 'AI & Automation', 'Cybersecurity', 'Product Building'],
    links: {
      portfolio: 'https://naveen-patil.vercel.app/',
      linkedin:  'https://linkedin.com/in/naveen-patil-builder',
      github:    'https://github.com/InfoNaveen',
    },
  },
  {
    name: 'Chinmay Muddapur',
    role: 'Co-Founder',
    initial: 'C',
    bio: 'UI/UX designer and web developer with strong hardware instincts. Leads the visual and interaction design side of every build. Bridges design thinking and frontend engineering — turning rough briefs into interfaces people actually want to use. Also works across embedded systems and hardware projects.',
    skills: ['UI/UX Design', 'Web Development', 'Embedded Systems', 'Microcontrollers', 'Design Systems', 'Hardware Integration'],
    links: {
      portfolio: 'https://chinmay-ivory.vercel.app',
      linkedin:  'https://linkedin.com/in/chinmay-muddapur-441a3a320',
      github:    'https://github.com/chinmaymuddapur',
    },
  },
]

export default function Team() {
  return (
    <section id="team" className="section on-light" style={{ background: 'var(--ivory)' }}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 72 }}
        >
          <span className="section-label">The people behind OASIS</span>
          <h2 className="display-lg" style={{ marginTop: 8, maxWidth: 520 }}>
            A small studio.<br />Technically serious.
          </h2>
          <p className="body-lg" style={{ maxWidth: 480, marginTop: 16 }}>
            Two builders who understand students — because we are students who build.
            Every project is handled directly by the people below.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, background: 'var(--line)' }} className="team-grid">
          {team.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                background: 'var(--paper)', padding: '48px 40px',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Initial block */}
              <div style={{
                width: 64, height: 64, background: 'var(--paper-dark)',
                border: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24,
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 900, color: 'var(--ink)' }}>
                  {m.initial}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                {m.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                {m.role}
              </p>
              <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.82, marginBottom: 24, flex: 1 }}>
                {m.bio}
              </p>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                {m.skills.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 10px',
                    border: '1px solid var(--line)', color: 'var(--ink-muted)',
                    letterSpacing: '0.06em',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {[
                  { href: m.links.portfolio, Icon: Globe, label: 'Portfolio' },
                  { href: m.links.linkedin,  Icon: Link,  label: 'LinkedIn' },
                  { href: m.links.github,    Icon: GitFork, label: 'GitHub' },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={`${m.name} ${label}`}
                    style={{
                      width: 36, height: 36, border: '1px solid var(--line)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--ink-muted)', textDecoration: 'none',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-muted)'; e.currentTarget.style.borderColor = 'var(--line)' }}>
                    <Icon size={14} strokeWidth={1.5} />
                  </a>
                ))}
                <a href={m.links.portfolio} target="_blank" rel="noopener noreferrer"
                  style={{
                    marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: 11, color: 'var(--ink)', textDecoration: 'none',
                    fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                    borderBottom: '1px solid var(--line)', paddingBottom: 1,
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}>
                  View work <ExternalLink size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media(max-width: 768px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
        @media(max-width: 480px) {
          .team-grid > div { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  )
}
