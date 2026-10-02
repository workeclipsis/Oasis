import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RotateCcw, Info } from 'lucide-react'

// Self-reported questions. Each answer carries points toward a dimension.
// This is a READINESS self-assessment — not a scrape, not an outcome predictor.
interface Q {
  id: string
  dimension: 'identity' | 'github' | 'portfolio' | 'presentation' | 'positioning'
  text: string
  options: { label: string; points: number }[]
}

const questions: Q[] = [
  {
    id: 'linkedin', dimension: 'identity',
    text: 'How complete is your LinkedIn?',
    options: [
      { label: 'No LinkedIn / barely filled', points: 0 },
      { label: 'Basic — name + college only', points: 4 },
      { label: 'Decent — headline + some detail', points: 7 },
      { label: 'Strong — keyword-tuned & active', points: 10 },
    ],
  },
  {
    id: 'github', dimension: 'github',
    text: 'What does your GitHub look like?',
    options: [
      { label: 'Empty or just assignments', points: 0 },
      { label: 'A few repos, no READMEs', points: 4 },
      { label: 'Some repos with descriptions', points: 7 },
      { label: 'Pinned projects, clean READMEs, active', points: 10 },
    ],
  },
  {
    id: 'portfolio', dimension: 'portfolio',
    text: 'Do you have a portfolio site?',
    options: [
      { label: 'No portfolio', points: 0 },
      { label: 'A template / unfinished one', points: 4 },
      { label: 'A custom site, not deployed well', points: 7 },
      { label: 'Custom, deployed, on my own domain', points: 10 },
    ],
  },
  {
    id: 'projects', dimension: 'presentation',
    text: 'How are your projects presented?',
    options: [
      { label: 'Not shown anywhere', points: 0 },
      { label: 'Listed but no detail', points: 4 },
      { label: 'Described with some context', points: 7 },
      { label: 'Case-study style: problem, build, result', points: 10 },
    ],
  },
  {
    id: 'positioning', dimension: 'positioning',
    text: 'How clearly do you communicate what you do?',
    options: [
      { label: 'Just "student"', points: 0 },
      { label: 'A vague role', points: 4 },
      { label: 'A clear role + a couple of skills', points: 7 },
      { label: 'Sharp positioning tied to a target role', points: 10 },
    ],
  },
]

const dimensionMeta: Record<Q['dimension'], string> = {
  identity:     'Digital Identity',
  github:       'GitHub',
  portfolio:    'Portfolio',
  presentation: 'Project Presentation',
  positioning:  'Professional Positioning',
}

function serviceFor(scores: Record<string, number>): string {
  const lowest = Object.entries(scores).sort((a, b) => a[1] - b[1])[0]?.[0]
  switch (lowest) {
    case 'github':       return 'GitHub Enhancement (Basic / Standard)'
    case 'portfolio':    return 'Portfolio Website (Standard)'
    case 'presentation': return 'Project Build + Documentation (Custom)'
    case 'positioning':  return 'LinkedIn + Positioning (Basic)'
    default:             return 'Full Digital Identity (Standard)'
  }
}

export default function ProfileAudit() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === questions.length

  const scores: Record<string, number> = {}
  for (const q of questions) {
    if (answers[q.id] !== undefined) scores[q.dimension] = answers[q.id]
  }
  const overall = allAnswered
    ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / questions.length * 10) / 10
    : 0

  const reset = () => { setAnswers({}); setDone(false) }

  return (
    <section id="audit" className="section on-light" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', marginBottom: 44 }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>Free Profile Audit</span>
          <h2 className="display-lg">How ready is your profile?</h2>
          <p className="body-lg" style={{ marginTop: 14 }}>
            A quick self-assessment of how your work is presented online. Answer honestly — we'll
            show where you stand and what to improve.
          </p>
          <p style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 8, marginTop: 16, fontSize: 12, color: 'var(--fg-muted)', maxWidth: 520, textAlign: 'left', lineHeight: 1.6 }}>
            <Info size={14} style={{ flexShrink: 0, marginTop: 2, color: 'var(--green)' }} />
            This is a self-reported readiness check based on your answers. It does not access your
            accounts and does not predict internship or job outcomes.
          </p>
        </div>

        <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(28px, 5vw, 44px)', background: 'var(--surface)' }}>
          {!done ? (
            <>
              {/* Progress */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
                  {answeredCount} / {questions.length} answered
                </span>
                <div style={{ display: 'flex', gap: 5 }}>
                  {questions.map(q => (
                    <div key={q.id} style={{ width: 22, height: 3, borderRadius: 2, background: answers[q.id] !== undefined ? 'var(--green)' : 'var(--line-strong)' }} />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {questions.map((q, qi) => (
                  <div key={q.id}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', marginBottom: 12 }}>
                      <span style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 12, marginRight: 8 }}>0{qi + 1}</span>
                      {q.text}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {q.options.map((o, oi) => {
                        const active = answers[q.id] === o.points
                        return (
                          <button key={oi} onClick={() => setAnswers(a => ({ ...a, [q.id]: o.points }))}
                            style={{
                              padding: '9px 15px', fontSize: 13,
                              background: active ? 'var(--forest)' : 'transparent',
                              color: active ? 'var(--ivory)' : 'var(--fg-soft)',
                              border: `1px solid ${active ? 'var(--forest)' : 'var(--line-light)'}`,
                              borderRadius: 6, cursor: 'pointer', fontFamily: 'var(--font-body)',
                              transition: 'all 0.25s', fontWeight: active ? 600 : 400,
                            }}>
                            {o.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="btn-primary"
                disabled={!allAnswered}
                onClick={() => setDone(true)}
                style={{ marginTop: 32, width: '100%', justifyContent: 'center' }}
              >
                See my readiness <ArrowRight size={14} />
              </button>
            </>
          ) : (
            <AnimatePresence>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {/* Overall */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 8 }}>
                    Your readiness
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>
                    {overall}<span style={{ fontSize: '0.4em', color: 'var(--fg-muted)' }}>/10</span>
                  </div>
                </div>

                {/* Dimension bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                  {questions.map(q => {
                    const val = scores[q.dimension] ?? 0
                    return (
                      <div key={q.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13, color: 'var(--fg-soft)' }}>{dimensionMeta[q.dimension]}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)' }}>{val}/10</span>
                        </div>
                        <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }} animate={{ width: `${val * 10}%` }} transition={{ duration: 0.6 }}
                            style={{ height: '100%', background: 'var(--green-grad)', borderRadius: 3 }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Recommendation */}
                <div className="green-panel" style={{ padding: '24px 26px', marginBottom: 24 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>
                    Where OASIS can help most
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--ivory)' }}>
                    {serviceFor(scores)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="#contact" className="btn-primary">Get this fixed <ArrowRight size={14} /></a>
                  <button onClick={reset} className="btn-ghost"><RotateCcw size={13} /> Retake</button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}
