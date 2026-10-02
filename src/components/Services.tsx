import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const services = [
  { num: '01', tag: 'Career & Digital Identity', title: 'Digital Identity',
    desc: 'Portfolio websites, LinkedIn optimization, GitHub enhancement, resume refinement, and SEO — everything a recruiter or collaborator needs to see your work at its best.',
    items: ['Portfolio websites', 'LinkedIn rewrite', 'GitHub & READMEs', 'Resume / CV', 'SEO'] },
  { num: '02', tag: 'Software & Web', title: 'Software',
    desc: 'Websites, web applications, custom software, and technical improvements. Built clean, deployed properly, handed over with documentation you can use.',
    items: ['Websites', 'Web applications', 'Custom software', 'Deployment', 'Improvements'] },
  { num: '03', tag: 'College Projects', title: 'Projects',
    desc: 'Mini and major projects, architecture, documentation, deployment, and viva preparation. Real work that survives the interview room.',
    items: ['Mini & major projects', 'Architecture', 'Documentation', 'Viva prep', 'Deployment'] },
  { num: '04', tag: 'Hardware & IoT', title: 'Hardware',
    desc: 'Embedded systems, microcontroller projects, IoT prototypes, and hardware–software integration. From sensor to server, built to work.',
    items: ['Embedded systems', 'Microcontrollers', 'IoT prototypes', 'HW–SW integration', 'Circuit + code'] },
  { num: '05', tag: 'Robotics', title: 'Robotics',
    desc: 'Robotics guidance, project builds, and embedded/control integration. Ready-to-use solutions built with the precision the field demands.',
    items: ['Robotics guidance', 'Project builds', 'Control integration', 'Embedded robotics', 'Competition prep'] },
  { num: '06', tag: 'Mentoring & Learning', title: 'Learn',
    desc: 'Web development, React, Git and GitHub, hackathon readiness, and career clarity. Sessions that go beyond tutorials into real skill-building.',
    items: ['Web dev fundamentals', 'React', 'Git & GitHub', 'Hackathon readiness', 'Career guidance'] },
]

function Row({ s, i }: { s: typeof services[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
    >
      <div
        className="service-row"
        style={{
          display: 'grid', gridTemplateColumns: '96px 1fr 1fr auto', gap: 40,
          padding: '46px 0', borderBottom: '1px solid var(--line)',
          alignItems: 'start', cursor: 'default', position: 'relative',
          transition: 'transform 0.25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateX(8px)'
          const n = e.currentTarget.querySelector('[data-num]') as HTMLElement | null
          if (n) n.style.color = 'var(--green)'
          const a = e.currentTarget.querySelector('[data-arrow]') as HTMLElement | null
          if (a) { a.style.color = 'var(--green)'; a.style.transform = 'translateX(4px)' }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateX(0)'
          const n = e.currentTarget.querySelector('[data-num]') as HTMLElement | null
          if (n) n.style.color = 'var(--surface-3)'
          const a = e.currentTarget.querySelector('[data-arrow]') as HTMLElement | null
          if (a) { a.style.color = 'var(--fg-muted)'; a.style.transform = 'translateX(0)' }
        }}
      >
        <span data-num style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--surface-3)',
          lineHeight: 1, transition: 'color 0.25s',
        }}>{s.num}</span>

        <div>
          <span className="tag tag-green" style={{ marginBottom: 14 }}>{s.tag}</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.1, margin: '14px 0 16px' }}>
            {s.title}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--fg-soft)', lineHeight: 1.75, maxWidth: 380 }}>{s.desc}</p>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 38 }}>
          {s.items.map((item, j) => (
            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--fg-soft)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', flexShrink: 0, marginTop: 1 }}>→</span>{item}
            </li>
          ))}
        </ul>

        <div style={{ paddingTop: 40 }}>
          <a href="#contact" data-arrow aria-label={`Enquire about ${s.title}`}
            style={{ display: 'inline-flex', color: 'var(--fg-muted)', textDecoration: 'none', transition: 'color 0.2s, transform 0.2s' }}>
            <ArrowRight size={22} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section on-light" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 72 }}
        >
          <span className="section-label">Services</span>
          <h2 className="display-lg" style={{ maxWidth: 560, marginTop: 8 }}>
            Six areas.<br />One studio.
          </h2>
          <p className="body-lg" style={{ maxWidth: 440, marginTop: 16 }}>
            From digital identity to hardware systems — we go wherever student work needs to go.
          </p>
        </motion.div>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {services.map((s, i) => <Row key={i} s={s} i={i} />)}
        </div>
      </div>

      <style>{`
        @media(max-width: 1024px) {
          .service-row { grid-template-columns: 64px 1fr 1fr !important; }
          .service-row > div:last-child { display: none !important; }
        }
        @media(max-width: 768px) {
          .service-row { grid-template-columns: 1fr !important; gap: 16px !important; padding: 34px 0 !important; }
          .service-row:hover { transform: none !important; }
          .service-row > span[data-num] { color: var(--green) !important; }
          .service-row > ul { padding-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}
