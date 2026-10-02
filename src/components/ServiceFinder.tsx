import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RotateCcw } from 'lucide-react'

type Goal = 'internship' | 'job' | 'portfolio' | 'project' | 'hackathon' | 'startup' | 'learning'
type Have = 'resume' | 'github' | 'projects' | 'portfolio' | 'nothing'

const goals: { key: Goal; label: string }[] = [
  { key: 'internship', label: 'Land an internship' },
  { key: 'job',        label: 'Land a job' },
  { key: 'portfolio',  label: 'Build a portfolio' },
  { key: 'project',    label: 'Finish a project' },
  { key: 'hackathon',  label: 'Win a hackathon' },
  { key: 'startup',    label: 'Build a startup idea' },
  { key: 'learning',   label: 'Learn / level up' },
]

const haves: { key: Have; label: string }[] = [
  { key: 'resume',    label: 'A resume' },
  { key: 'github',    label: 'A GitHub' },
  { key: 'projects',  label: 'Some projects' },
  { key: 'portfolio', label: 'A portfolio' },
  { key: 'nothing',   label: 'Nothing yet' },
]

// Deterministic path recommendation from goal + what they already have.
function recommend(goal: Goal, have: Have): { path: string[]; service: string; note: string } {
  const hasFoundation = have === 'portfolio' || have === 'projects'

  if (goal === 'internship' || goal === 'job') {
    return hasFoundation
      ? { path: ['PROFILE', 'PORTFOLIO', 'LAUNCH'], service: 'Standard — Digital Identity', note: 'You have a foundation. We sharpen the presentation so recruiters take you seriously.' }
      : { path: ['PROFILE', 'PROJECT', 'PORTFOLIO', 'LAUNCH'], service: 'Custom — Identity + Project', note: 'We build a real project first, then package it into a profile that stands out.' }
  }
  if (goal === 'portfolio') {
    return { path: ['PROFILE', 'PORTFOLIO', 'LAUNCH'], service: 'Standard — Portfolio', note: 'A custom, deployed portfolio built around your real work.' }
  }
  if (goal === 'project' || goal === 'hackathon') {
    return { path: ['PLAN', 'BUILD', 'DOCUMENT', 'DELIVER'], service: 'Custom — Project Build', note: 'End-to-end project support: architecture, build, docs, and deployment.' }
  }
  if (goal === 'startup') {
    return { path: ['PLAN', 'BUILD', 'SHIP'], service: 'Custom — Software', note: 'We help turn your idea into a working, deployed product.' }
  }
  // learning
  return { path: ['SESSION', 'BUILD', 'OWN IT'], service: 'Learn — Mentoring', note: 'Live 1:1 or group sessions so you understand what you ship.' }
}

export default function ServiceFinder() {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState<Goal | null>(null)
  const [have, setHave] = useState<Have | null>(null)

  const result = goal && have ? recommend(goal, have) : null

  const reset = () => { setStep(0); setGoal(null); setHave(null) }

  return (
    <section id="finder" className="section on-dark" style={{ background: 'var(--forest-2)', borderTop: '1px solid var(--line-dark)', borderBottom: '1px solid var(--line-dark)' }}>
      <div className="container">
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>Not sure what you need?</span>
          <h2 className="display-lg">Find your OASIS path.</h2>
          <p className="body-lg" style={{ marginTop: 14 }}>
            Two quick questions. We'll suggest where to start — no email required.
          </p>
        </div>

        <div className="card" style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(28px, 5vw, 44px)', background: 'var(--surface)' }}>
          {/* Progress */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= step ? 'var(--green)' : 'var(--line-strong)', transition: 'background 0.3s' }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="q1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 16 }}>Question 1 / 2</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: 'var(--fg)', marginBottom: 24 }}>What are you trying to achieve?</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {goals.map(g => (
                    <button key={g.key} onClick={() => { setGoal(g.key); setStep(1) }} style={chip(goal === g.key)}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="q2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 16 }}>Question 2 / 2</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: 'var(--fg)', marginBottom: 24 }}>What do you already have?</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {haves.map(h => (
                    <button key={h.key} onClick={() => { setHave(h.key); setStep(2) }} style={chip(have === h.key)}>
                      {h.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(0)} style={backBtn}>← Back</button>
              </motion.div>
            )}

            {step === 2 && result && (
              <motion.div key="r" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 20 }}>Your OASIS path</div>

                {/* Path chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                  {result.path.map((p, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.4vw, 1.5rem)', fontWeight: 700, color: i === result.path.length - 1 ? 'var(--green)' : 'var(--fg)' }}>{p}</span>
                      {i < result.path.length - 1 && <ArrowRight size={16} style={{ color: 'var(--fg-muted)' }} />}
                    </span>
                  ))}
                </div>

                <div className="green-panel" style={{ padding: '22px 24px', marginBottom: 24 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>Recommended</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--ivory)', marginBottom: 8 }}>{result.service}</div>
                  <p style={{ fontSize: 13.5, color: 'var(--on-dark-soft)', lineHeight: 1.65 }}>{result.note}</p>
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="#contact" className="btn-primary">Start with OASIS <ArrowRight size={14} /></a>
                  <button onClick={reset} className="btn-ghost"><RotateCcw size={13} /> Start over</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function chip(active: boolean): React.CSSProperties {
  return {
    padding: '12px 20px', fontSize: 14, fontWeight: 500,
    background: active ? 'var(--forest)' : 'transparent',
    color: active ? 'var(--ivory)' : 'var(--fg-soft)',
    border: `1px solid ${active ? 'var(--sage)' : 'var(--line-dark)'}`,
    borderRadius: 100, cursor: 'pointer', fontFamily: 'var(--font-body)',
    transition: 'all 0.25s', minHeight: 46,
  }
}

const backBtn: React.CSSProperties = {
  marginTop: 24, background: 'none', border: 'none', cursor: 'pointer',
  color: 'var(--fg-muted)', fontSize: 13, fontFamily: 'var(--font-body)', padding: 0,
}
