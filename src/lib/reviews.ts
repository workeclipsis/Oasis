// ─────────────────────────────────────────────────────────────
// OASIS — Review store
//
// Uses Supabase when VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are set.
// Falls back to a localStorage store otherwise (per-browser, not shared).
//
// Public flow (both backends):
//   submit → pending → admin approves → appears publicly (approved only).
//   Public reads never expose email/status.
// ─────────────────────────────────────────────────────────────

import { supabase, supabaseEnabled } from './supabase'

export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface Review {
  id: string
  name: string
  email: string
  college: string
  service: string
  rating: number
  review: string
  projectLink: string
  status: ReviewStatus
  createdAt: number
  decidedAt?: number
}

export interface PublicReview {
  id: string
  name: string
  college: string
  service: string
  rating: number
  review: string
  projectLink: string
  createdAt: number
}

export const usingSupabase = supabaseEnabled

// ── localStorage keys (fallback backend) ──
const DB_KEY        = 'oasis_reviews_db'
const ADMIN_KEY     = 'oasis_admin_session'
const SUBMITTED_KEY = 'oasis_review_submitted'
const SUBMIT_COOLDOWN_MS = 1000 * 60 * 60 * 12
const ADMIN_PASSCODE = 'oasis-admin' // fallback-only gate (not real security)

export const LIMITS = {
  name:        { min: 2,  max: 80 },
  email:       { min: 5,  max: 120 },
  college:     { min: 0,  max: 100 },
  service:     { min: 0,  max: 60 },
  review:      { min: 10, max: 800 },
  projectLink: { min: 0,  max: 200 },
}

// ── Validation helpers (shared) ──
export function sanitize(input: string, max: number): string {
  return input.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, max)
}
export function isValidEmail(email: string): boolean {
  return /^[^\s@<>"']{1,64}@[^\s@<>"']{1,253}\.[a-zA-Z]{2,}$/.test(email)
}
export function isValidUrl(url: string): boolean {
  if (!url) return true
  try { const u = new URL(url); return u.protocol === 'http:' || u.protocol === 'https:' }
  catch { return false }
}

export interface ReviewInput {
  name: string; email: string; college: string; service: string
  rating: number; review: string; projectLink: string
}
export interface SubmitResult { ok: boolean; error?: string }

function validateInput(input: ReviewInput) {
  const name        = sanitize(input.name, LIMITS.name.max)
  const email       = sanitize(input.email, LIMITS.email.max).toLowerCase()
  const college     = sanitize(input.college, LIMITS.college.max)
  const service     = sanitize(input.service, LIMITS.service.max)
  const review      = sanitize(input.review, LIMITS.review.max)
  const projectLink = sanitize(input.projectLink, LIMITS.projectLink.max)
  const rating      = Math.round(input.rating)

  if (name.length < LIMITS.name.min)        return { error: 'Please enter your full name.' }
  if (!isValidEmail(email))                 return { error: 'Please enter a valid email address.' }
  if (rating < 1 || rating > 5)             return { error: 'Please select a rating from 1 to 5.' }
  if (review.length < LIMITS.review.min)    return { error: 'Please write a review of at least 10 characters.' }
  if (!isValidUrl(projectLink))             return { error: 'Project link must be a valid URL.' }

  return { clean: { name, email, college, service, rating, review, projectLink } }
}

// ═══════════════════════════════════════════════════════════════
// PUBLIC: submit a review
// ═══════════════════════════════════════════════════════════════
export async function submitReview(input: ReviewInput): Promise<SubmitResult> {
  const v = validateInput(input)
  if ('error' in v && v.error) return { ok: false, error: v.error }
  const c = v.clean!

  if (usingSupabase && supabase) {
    const { error } = await supabase.from('reviews').insert({
      name: c.name, email: c.email, college: c.college, service: c.service,
      rating: c.rating, review: c.review, project_link: c.projectLink,
      status: 'pending',
    })
    if (error) {
      console.error('[OASIS] review submit failed:', error.message)
      return { ok: false, error: 'Could not submit right now. Please try again.' }
    }
    localStorage.setItem(SUBMITTED_KEY, String(Date.now()))
    return { ok: true }
  }

  // localStorage fallback
  const all = readLocal()
  all.unshift({
    id: `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    ...c, status: 'pending', createdAt: Date.now(),
  })
  writeLocal(all)
  localStorage.setItem(SUBMITTED_KEY, String(Date.now()))
  return { ok: true }
}

export function isOnCooldown(): boolean {
  const last = Number(localStorage.getItem(SUBMITTED_KEY) || 0)
  return last ? Date.now() - last < SUBMIT_COOLDOWN_MS : false
}

// ═══════════════════════════════════════════════════════════════
// PUBLIC: read approved reviews (safe fields only)
// ═══════════════════════════════════════════════════════════════
export async function getApprovedReviews(): Promise<PublicReview[]> {
  if (usingSupabase && supabase) {
    const { data, error } = await supabase
      .from('public_reviews')
      .select('id,name,college,service,rating,review,project_link,created_at')
    if (error || !data) { if (error) console.error('[OASIS] load reviews failed:', error.message); return [] }
    return data.map(r => ({
      id: r.id, name: r.name, college: r.college ?? '', service: r.service ?? '',
      rating: r.rating, review: r.review, projectLink: r.project_link ?? '',
      createdAt: new Date(r.created_at).getTime(),
    }))
  }

  return readLocal()
    .filter(r => r.status === 'approved')
    .sort((a, b) => (b.decidedAt ?? b.createdAt) - (a.decidedAt ?? a.createdAt))
    .map(r => ({
      id: r.id, name: r.name, college: r.college, service: r.service,
      rating: r.rating, review: r.review, projectLink: r.projectLink, createdAt: r.createdAt,
    }))
}

// ═══════════════════════════════════════════════════════════════
// ADMIN: auth
// ═══════════════════════════════════════════════════════════════
export interface AdminLoginResult { ok: boolean; error?: string }

/** Supabase mode: email+password sign-in. Fallback: passcode in the email field. */
export async function adminLogin(emailOrPasscode: string, password?: string): Promise<AdminLoginResult> {
  if (usingSupabase && supabase) {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailOrPasscode.trim(), password: password ?? '',
    })
    if (error) return { ok: false, error: error.message }
    // Confirm the signed-in user is actually an admin.
    const admin = await checkIsAdmin()
    if (!admin) {
      await supabase.auth.signOut()
      return { ok: false, error: 'This account is not an OASIS admin.' }
    }
    return { ok: true }
  }

  // fallback passcode gate
  if (emailOrPasscode === ADMIN_PASSCODE) {
    localStorage.setItem(ADMIN_KEY, String(Date.now()))
    return { ok: true }
  }
  return { ok: false, error: 'Incorrect passcode.' }
}

export async function adminLogout(): Promise<void> {
  if (usingSupabase && supabase) { await supabase.auth.signOut(); return }
  localStorage.removeItem(ADMIN_KEY)
}

async function checkIsAdmin(): Promise<boolean> {
  if (!supabase) return false
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return false
  const { data, error } = await supabase
    .from('admin_users').select('user_id').eq('user_id', userData.user.id).maybeSingle()
  return !error && Boolean(data)
}

export async function isAdmin(): Promise<boolean> {
  if (usingSupabase) return checkIsAdmin()
  return Boolean(localStorage.getItem(ADMIN_KEY))
}

// ═══════════════════════════════════════════════════════════════
// ADMIN: manage reviews
// ═══════════════════════════════════════════════════════════════
export async function getReviewsByStatus(status: ReviewStatus): Promise<Review[]> {
  if (usingSupabase && supabase) {
    const { data, error } = await supabase
      .from('reviews').select('*').eq('status', status).order('created_at', { ascending: false })
    if (error || !data) { if (error) console.error('[OASIS] admin load failed:', error.message); return [] }
    return data.map(mapRow)
  }
  return readLocal().filter(r => r.status === status).sort((a, b) => b.createdAt - a.createdAt)
}

export async function approveReview(id: string) { await setStatus(id, 'approved') }
export async function rejectReview(id: string)  { await setStatus(id, 'rejected') }

export async function deleteReview(id: string) {
  if (usingSupabase && supabase) {
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) console.error('[OASIS] delete failed:', error.message)
    return
  }
  writeLocal(readLocal().filter(r => r.id !== id))
}

async function setStatus(id: string, status: ReviewStatus) {
  if (usingSupabase && supabase) {
    const { error } = await supabase.from('reviews')
      .update({ status, decided_at: new Date().toISOString() }).eq('id', id)
    if (error) console.error('[OASIS] status update failed:', error.message)
    return
  }
  const all = readLocal()
  const idx = all.findIndex(r => r.id === id)
  if (idx === -1) return
  all[idx].status = status
  all[idx].decidedAt = Date.now()
  writeLocal(all)
}

// ── local helpers ──
type Row = {
  id: string; name: string; email: string; college: string | null; service: string | null
  rating: number; review: string; project_link: string | null; status: ReviewStatus
  created_at: string; decided_at: string | null
}
function mapRow(r: Row): Review {
  return {
    id: r.id, name: r.name, email: r.email, college: r.college ?? '', service: r.service ?? '',
    rating: r.rating, review: r.review, projectLink: r.project_link ?? '', status: r.status,
    createdAt: new Date(r.created_at).getTime(),
    decidedAt: r.decided_at ? new Date(r.decided_at).getTime() : undefined,
  }
}
function readLocal(): Review[] {
  try { return JSON.parse(localStorage.getItem(DB_KEY) || '[]') as Review[] } catch { return [] }
}
function writeLocal(rows: Review[]) { localStorage.setItem(DB_KEY, JSON.stringify(rows)) }
