/**
 * OASIS Worker
 * --------------------------------------------------------------
 * Static-assets-first Worker. Runs ONLY for /api/* (per wrangler
 * `run_worker_first`); every other path is served from ./dist by
 * the ASSETS binding, so the existing Vite frontend is unchanged.
 *
 * Endpoints:
 *   GET  /api/reviews          — public: approved reviews only
 *   POST /api/reviews          — public: submit a pending review
 *   GET  /api/reviews/admin    — admin: list by ?status= (token required)
 *   POST /api/reviews/admin    — admin: approve/reject/delete (token required)
 *
 * Contact: handled client-side by EmailJS (NOT this Worker).
 * Cloudflare Email Sending is intentionally not used (requires Workers Paid),
 * so there is no email binding and /api/contact is disabled.
 *
 * Bindings: ASSETS (static), DB (D1)
 * Secret:   ADMIN_TOKEN  (set via `wrangler secret put ADMIN_TOKEN`)
 */

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' }

// ── tiny in-memory rate limiter (per isolate; best-effort, not global) ──
const HITS = new Map()
function rateLimited(key, limit, windowMs) {
  const now = Date.now()
  const rec = HITS.get(key)
  if (!rec || now > rec.reset) {
    HITS.set(key, { count: 1, reset: now + windowMs })
    return false
  }
  rec.count += 1
  return rec.count > limit
}

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...extra } })
}
function clientIp(request) {
  return request.headers.get('CF-Connecting-IP') || 'unknown'
}
function clean(v, max) {
  return String(v ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, max)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const { pathname } = url

    // Only /api/* reaches the Worker; anything else is served statically.
    if (!pathname.startsWith('/api/')) {
      return env.ASSETS ? env.ASSETS.fetch(request) : new Response('Not found', { status: 404 })
    }

    try {
      // Contact is handled by EmailJS on the client — not by this Worker.
      if (pathname === '/api/contact') {
        return json({ ok: false, error: 'Contact is handled client-side via EmailJS.' }, 405)
      }
      if (pathname === '/api/reviews' && request.method === 'GET')  return handleGetReviews(env)
      if (pathname === '/api/reviews' && request.method === 'POST') return handlePostReview(request, env)
      if (pathname === '/api/reviews/admin') return handleAdmin(request, env)
      return json({ ok: false, error: 'Not found' }, 404)
    } catch (err) {
      console.error('[worker] unhandled error:', err && err.message)
      return json({ ok: false, error: 'Server error' }, 500)
    }
  },
}

// ── GET /api/reviews  (public: approved only) ──────────────────
async function handleGetReviews(env) {
  if (!env.DB) return json({ ok: true, reviews: [] })
  const { results } = await env.DB
    .prepare(
      `SELECT id, name, college, service, rating, review, project_link, created_at
       FROM reviews WHERE status = 'approved' ORDER BY created_at DESC LIMIT 200`
    )
    .all()
  return json({ ok: true, reviews: results ?? [] })
}

// ── POST /api/reviews (public: insert pending) ─────────────────
async function handlePostReview(request, env) {
  if (rateLimited('review:' + clientIp(request), 3, 60_000)) {
    return json({ ok: false, error: 'Too many submissions. Please try again later.' }, 429)
  }

  let body
  try { body = await request.json() } catch { return json({ ok: false, error: 'Invalid JSON' }, 400) }

  const name        = clean(body.name, 80)
  const college     = clean(body.college, 100)
  const service     = clean(body.service, 60)
  const review      = clean(body.review, 800)
  const projectLink = clean(body.projectLink ?? body.project_link, 200)
  const rating      = Math.round(Number(body.rating))

  if (name.length < 2)                      return json({ ok: false, error: 'Please enter your full name.' }, 400)
  if (!(rating >= 1 && rating <= 5))        return json({ ok: false, error: 'Rating must be 1–5.' }, 400)
  if (review.length < 10)                   return json({ ok: false, error: 'Please write at least 10 characters.' }, 400)
  if (projectLink && !/^https?:\/\//.test(projectLink)) return json({ ok: false, error: 'Project link must be a valid URL.' }, 400)

  if (!env.DB) return json({ ok: false, error: 'Reviews are not configured yet.' }, 503)

  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()

  // Persist as pending. New reviews are never auto-published.
  await env.DB
    .prepare(
      `INSERT INTO reviews (id, name, college, service, rating, review, project_link, created_at, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`
    )
    .bind(id, name, college || null, service || null, rating, review, projectLink || null, createdAt)
    .run()

  return json({ ok: true, message: 'Review submitted and awaiting approval.' })
}

// ── /api/reviews/admin (token-gated) ───────────────────────────
async function handleAdmin(request, env) {
  const token = request.headers.get('x-admin-token') || ''
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
    return json({ ok: false, error: 'Unauthorized' }, 401)
  }
  if (!env.DB) return json({ ok: false, error: 'DB not configured' }, 503)

  if (request.method === 'GET') {
    const url = new URL(request.url)
    const status = clean(url.searchParams.get('status') || 'pending', 20)
    const { results } = await env.DB
      .prepare(`SELECT * FROM reviews WHERE status = ? ORDER BY created_at DESC LIMIT 500`)
      .bind(status)
      .all()
    return json({ ok: true, reviews: results ?? [] })
  }

  if (request.method === 'POST') {
    let body
    try { body = await request.json() } catch { return json({ ok: false, error: 'Invalid JSON' }, 400) }
    const id = clean(body.id, 64)
    const action = clean(body.action, 20)
    if (!id) return json({ ok: false, error: 'Missing id' }, 400)

    if (action === 'approve' || action === 'reject') {
      await env.DB.prepare(`UPDATE reviews SET status = ? WHERE id = ?`)
        .bind(action === 'approve' ? 'approved' : 'rejected', id).run()
      return json({ ok: true })
    }
    if (action === 'delete') {
      await env.DB.prepare(`DELETE FROM reviews WHERE id = ?`).bind(id).run()
      return json({ ok: true })
    }
    return json({ ok: false, error: 'Unknown action' }, 400)
  }

  return json({ ok: false, error: 'Method not allowed' }, 405)
}
