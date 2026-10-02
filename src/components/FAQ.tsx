import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What exactly does OASIS do?',
    a: 'We\'re a student-focused technology studio. We build digital identities (portfolio sites, LinkedIn, GitHub, resumes), websites, web apps, custom software, college projects, hardware and IoT prototypes, robotics projects, and offer 1:1 mentoring sessions. If it\'s technical and you\'re a student, we probably help with it.',
  },
  {
    q: 'Will my portfolio look like everyone else\'s?',
    a: 'No. Every portfolio is built from scratch based on your stack, goals, and personality. We don\'t use templates — if it looks generic, we haven\'t done our job.',
  },
  {
    q: 'I have nothing to put in a portfolio yet.',
    a: 'That\'s fine. We can help you build a real, deployable project from scratch — documented, clean, and 100% yours to explain in any interview.',
  },
  {
    q: 'Can you help with hardware and IoT projects?',
    a: 'Yes. Our team includes people with hands-on embedded systems and microcontroller experience. We handle sensor integration, firmware, dashboards, and full project documentation for viva prep.',
  },
  {
    q: 'What if I\'m not happy with the result?',
    a: 'We revise until you\'re satisfied. No "out of scope" surprises — if we agreed to build something, we build it right.',
  },
  {
    q: 'How do I pay?',
    a: 'After you submit the form and we confirm your project scope, we share a secure payment link. We accept UPI, cards, and net banking.',
  },
  {
    q: 'How quickly will the work be delivered?',
    a: 'Most projects are delivered within 3–7 working days from scope agreement, depending on complexity. We give you a clear timeline upfront.',
  },
  {
    q: 'How are mentoring sessions conducted?',
    a: 'All sessions are online via Google Meet or Zoom. 1:1 sessions are personalised to your level and goals. Group batches are capped so everyone gets real attention.',
  },
  {
    q: 'I\'m from a non-CS branch. Can you still help?',
    a: 'Absolutely. We work with ECE, Mechanical, and MBA students regularly. Your branch doesn\'t limit what you can build — and we can help you show that.',
  },
  {
    q: 'Do you work with teams or colleges?',
    a: 'Yes. If you\'re a club, college society, or startup team, we offer bulk pricing and can handle multiple profiles or a shared project. Contact us for scope.',
  },
  {
    q: 'Why is OASIS affordable?',
    a: 'Because we\'re a student-first studio. Our goal is helping students build serious technical work without paying enterprise agency rates. We work directly — no middlemen, no overhead.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="section on-light" style={{ background: 'var(--ivory)' }}>
      <div className="container" style={{ maxWidth: 800 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <span className="section-label">FAQ</span>
          <h2 className="display-lg" style={{ marginTop: 8, maxWidth: 480 }}>
            Questions worth answering.
          </h2>
        </motion.div>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '22px 0',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    textAlign: 'left', minHeight: 56,
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: 15,
                    fontWeight: isOpen ? 600 : 400, color: 'var(--ink)',
                    paddingRight: 24, lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 28, height: 28, border: '1px solid var(--line)',
                    background: isOpen ? 'var(--ink)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isOpen ? 'var(--paper)' : 'var(--ink-muted)',
                    flexShrink: 0, transition: 'all 0.2s',
                  }}>
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        fontSize: 14, color: 'var(--ink-muted)',
                        lineHeight: 1.82, padding: '0 0 24px 0',
                        maxWidth: 640,
                      }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
