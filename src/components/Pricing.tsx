import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: '₹999',
    desc: 'The essentials. LinkedIn, GitHub, and resume — covered and ready in days.',
    features: [
      'LinkedIn rewrite (headline, about, skills)',
      'GitHub README setup',
      'Resume formatting review',
      'Fast delivery',
      '1 revision round',
    ],
    featured: false,
  },
  {
    name: 'Standard',
    price: '₹1,499',
    desc: 'The complete package. Portfolio, profiles, and resume — all interview-ready.',
    features: [
      'Everything in Basic',
      'Portfolio website (deployed + domain)',
      'SEO meta tags + Open Graph',
      '2 revision rounds',
      'Priority delivery',
    ],
    featured: true,
  },
  {
    name: 'Custom',
    price: '₹2,999',
    desc: 'Full-scope projects, software builds, hardware, college projects, or teams. Tell us what you need.',
    features: [
      'Project scoped to your needs',
      'Software, hardware, or identity work',
      'Architecture + documentation',
      'Deployment + handover',
      'Flexible revisions',
    ],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section on-dark" style={{ background: 'var(--forest)' }}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 72 }}
        >
          <span className="section-label">Pricing</span>
          <h2 className="display-lg" style={{ marginTop: 8, maxWidth: 480 }}>
            Transparent pricing.<br />No subscriptions.
          </h2>
          <p className="body-lg" style={{ maxWidth: 400, marginTop: 16 }}>
            One-time payment. Results in days, not weeks.
          </p>
        </motion.div>

        {/* Editorial pricing — bordered menu style */}
        <div style={{ borderTop: '2px solid var(--green)', borderBottom: '1px solid var(--line)' }}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 180px 240px auto',
                gap: 40,
                padding: '48px 0',
                borderBottom: '1px solid var(--line)',
                alignItems: 'start',
                background: plan.featured ? 'var(--surface)' : 'transparent',
                borderLeft: plan.featured ? '2px solid var(--green)' : '2px solid transparent',
                padding: plan.featured ? '48px 30px' : '48px 0',
                marginLeft: plan.featured ? -32 : 0,
                marginRight: plan.featured ? -32 : 0,
                transition: 'background 0.2s',
              }}
              className="price-row"
            >
              {/* Plan name + desc */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
                    fontWeight: 700, color: 'var(--ink)', lineHeight: 1,
                  }}>
                    {plan.name}
                  </h3>
                  {plan.featured && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.14em',
                      textTransform: 'uppercase', color: 'var(--accent-mint)',
                      border: '1px solid var(--accent-mint)', padding: '2px 8px',
                      borderRadius: '100px',
                    }}>
                      Popular
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.75, maxWidth: 300 }}>
                  {plan.desc}
                </p>
              </div>

              {/* Price */}
              <div>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 800, color: plan.featured ? 'var(--green)' : 'var(--fg)', lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>
                  {plan.price}
                </span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6 }}>
                  one-time
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--ink-muted)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-mint)', flexShrink: 0, marginTop: 1 }}>→</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div style={{ paddingTop: 4 }}>
                <a href="#contact"
                  className={plan.featured ? 'btn-primary' : 'btn-ghost'}
                  style={{ whiteSpace: 'nowrap' }}>
                  Get {plan.name} <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value note */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em', maxWidth: 540 }}>
            Not sure which fits? Describe what you need in the contact form and we'll figure it out together.
          </p>
          <a href="#contact" className="btn-ghost" style={{ flexShrink: 0 }}>
            Discuss custom scope <ArrowRight size={13} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media(max-width: 1024px) and (min-width: 769px) {
          .price-row { grid-template-columns: 1fr 140px 1fr !important; }
          .price-row > div:last-child { display: none !important; }
        }
        @media(max-width: 768px) {
          .price-row { grid-template-columns: 1fr !important; gap: 18px !important; padding: 32px 0 !important; margin-left: 0 !important; margin-right: 0 !important; }
          .price-row > div:last-child { display: block !important; padding-top: 4px !important; }
          .price-row > div:last-child a { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  )
}
