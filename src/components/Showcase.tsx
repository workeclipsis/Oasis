import { motion } from 'framer-motion'

const projects = [
  {
    num: '001',
    name: 'Student Portfolio',
    category: 'Career & Digital Identity',
    categoryColor: 'var(--accent-mint)',
    desc: 'A custom-built portfolio site deployed on a personal domain with SEO, project showcase, and a contact form — built from scratch in under a week.',
    contribution: 'Design, development, deployment, domain setup',
    stack: 'React · TypeScript · Vite · Tailwind',
  },
  {
    num: '002',
    name: 'College IoT Project',
    category: 'Hardware & IoT',
    categoryColor: 'var(--accent-pink)',
    desc: 'An end-to-end IoT project for a final-year submission — sensor integration, microcontroller firmware, a live dashboard, and complete documentation for the viva.',
    contribution: 'Architecture, firmware, dashboard, documentation',
    stack: 'Arduino · ESP32 · React · Node.js',
  },
  {
    num: '003',
    name: 'GitHub Profile Overhaul',
    category: 'Career & Digital Identity',
    categoryColor: 'var(--accent-mint)',
    desc: 'Transformed a blank GitHub into an actively maintained presence — profile README, three pinned projects with proper descriptions, and a contribution graph worth showing.',
    contribution: 'Profile README, project READMEs, pinning strategy',
    stack: 'GitHub · Markdown · Shields.io',
  },
  {
    num: '004',
    name: 'Web Application',
    category: 'Software & Web',
    categoryColor: 'var(--accent-blue)',
    desc: 'A full-stack web application for a student team — authentication, database, API, and frontend — deployed to production with documentation handed to the client.',
    contribution: 'Full-stack build, deployment, handover docs',
    stack: 'Next.js · PostgreSQL · Vercel',
  },
]

export default function Showcase() {
  return (
    <section id="work" className="section on-dark" style={{ background: 'var(--forest)', borderTop: '1px solid var(--line-dark)', borderBottom: '1px solid var(--line-dark)' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', marginBottom: 72, gap: 32 }}
          className="work-header"
        >
          <div>
            <span className="section-label">Work</span>
            <h2 className="display-lg" style={{ marginTop: 8, maxWidth: 480 }}>
              Things we've built.
            </h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', maxWidth: 280, lineHeight: 1.75, textAlign: 'right' }} className="work-desc">
            A sample of what we deliver. Every project below is real work with a real client.
          </p>
        </motion.div>

        {/* Project list — editorial case-study layout */}
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1fr',
                gap: 40,
                padding: '52px 0',
                borderBottom: '1px solid var(--line)',
                alignItems: 'start',
              }}
              className="project-row"
            >
              {/* Number */}
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--ink-muted)', letterSpacing: '0.1em',
                }}>
                  {p.num}
                </span>
              </div>

              {/* Left — name + desc */}
              <div>
                <span style={{
                  display: 'inline-block', marginBottom: 14,
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: p.categoryColor,
                }}>
                  {p.category}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.5vw, 1.8rem)',
                  fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 16,
                }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.78 }}>
                  {p.desc}
                </p>
              </div>

              {/* Right — meta */}
              <div style={{ paddingTop: 30, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                    What we delivered
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.65 }}>{p.contribution}</p>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                    Stack
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{p.stack}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
            Have a project in mind? We'd like to hear it.
          </p>
          <a href="#contact" className="btn-primary">
            Start a project
          </a>
        </motion.div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .project-row { grid-template-columns: 1fr !important; gap: 16px !important; padding: 40px 0 !important; }
          .project-row > div:first-child { display: none !important; }
          .work-header { grid-template-columns: 1fr !important; }
          .work-desc { text-align: left !important; }
        }
      `}</style>
    </section>
  )
}
