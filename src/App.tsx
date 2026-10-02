import { Component, useState, useEffect, type ReactNode } from 'react'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import Problem     from './components/Problem'
import Services    from './components/Services'
import Showcase    from './components/Showcase'
import WhyOasis    from './components/WhyOasis'
import ProfileAudit from './components/ProfileAudit'
import ServiceFinder from './components/ServiceFinder'
import Process     from './components/Process'
import Reviews     from './components/Reviews'
import Teach       from './components/Teach'
import Pricing     from './components/Pricing'
import Team        from './components/Team'
import FAQ         from './components/FAQ'
import FinalCTA    from './components/FinalCTA'
import Footer      from './components/Footer'
import AdminLogin  from './components/admin/AdminLogin'
import AdminReviews from './components/admin/AdminReviews'
import { isAdmin } from './lib/reviews'
import { ArrowRight } from 'lucide-react'

// Error boundary for any section-level failures — fails silently
class SectionErrorBoundary extends Component<{ children: ReactNode; name?: string }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; name?: string }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

// ── Hash-based admin route: #/admin/reviews ──
function useHashRoute(): string {
  const [hash, setHash] = useState<string>(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function AdminRoute() {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    isAdmin().then(v => { if (active) setAuthed(v) })
    return () => { active = false }
  }, [])

  if (authed === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--forest)', color: 'var(--on-dark-muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        Loading…
      </div>
    )
  }
  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />
  return <AdminReviews onLogout={() => setAuthed(false)} />
}

function App() {
  const hash = useHashRoute()

  // Admin dashboard route — isolated from the marketing page
  if (hash.startsWith('#/admin/reviews')) {
    return <AdminRoute />
  }

  return (
    <>
      <Navbar />

      <main id="main-content" style={{ position: 'relative', zIndex: 10 }}>
        {/* 01 — Hero */}
        <SectionErrorBoundary name="Hero">
          <Hero />
        </SectionErrorBoundary>

        {/* 02 — Why we exist / problem */}
        <SectionErrorBoundary name="Problem">
          <Problem />
        </SectionErrorBoundary>

        {/* 03 — Services */}
        <SectionErrorBoundary name="Services">
          <Services />
        </SectionErrorBoundary>

        {/* 04 — Work / showcase */}
        <SectionErrorBoundary name="Showcase">
          <Showcase />
        </SectionErrorBoundary>

        {/* 05 — Why OASIS (skill → build → prove → present) */}
        <SectionErrorBoundary name="WhyOasis">
          <WhyOasis />
        </SectionErrorBoundary>

        {/* 06 — Profile audit (interactive readiness tool) */}
        <SectionErrorBoundary name="ProfileAudit">
          <ProfileAudit />
        </SectionErrorBoundary>

        {/* 07 — Service finder (interactive recommendation) */}
        <SectionErrorBoundary name="ServiceFinder">
          <ServiceFinder />
        </SectionErrorBoundary>

        {/* 08 — Process */}
        <SectionErrorBoundary name="Process">
          <Process />
        </SectionErrorBoundary>

        {/* 09 — Client reviews (real submission + approval) */}
        <SectionErrorBoundary name="Reviews">
          <Reviews />
        </SectionErrorBoundary>

        {/* 08 — Learn / mentoring */}
        <SectionErrorBoundary name="Teach">
          <Teach />
        </SectionErrorBoundary>

        {/* 09 — Pricing */}
        <SectionErrorBoundary name="Pricing">
          <Pricing />
        </SectionErrorBoundary>

        {/* 10 — Team */}
        <SectionErrorBoundary name="Team">
          <Team />
        </SectionErrorBoundary>

        {/* 11 — FAQ */}
        <SectionErrorBoundary name="FAQ">
          <FAQ />
        </SectionErrorBoundary>

        {/* 12 — Contact / Final CTA */}
        <SectionErrorBoundary name="FinalCTA">
          <FinalCTA />
        </SectionErrorBoundary>
      </main>

      <Footer />

      {/* Sticky mobile CTA */}
      <a href="#contact" className="show-mobile" style={{
        position: 'fixed', bottom: 16, right: 16, left: 16, zIndex: 999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: 'var(--ivory)', color: 'var(--forest)',
        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13,
        padding: '16px 24px', borderRadius: 4,
        textDecoration: 'none',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        border: '1px solid var(--ivory)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        minHeight: 56,
      }}>
        Get Started <ArrowRight size={15} />
      </a>
    </>
  )
}

export default App
