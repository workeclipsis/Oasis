-- ═══════════════════════════════════════════════════════════════
-- OASIS — D1 reviews schema
-- Database: oasis-reviews   Binding: DB
--
-- Apply with (after creating the DB and pasting its id into wrangler.jsonc):
--   npx wrangler d1 execute oasis-reviews --remote --file=./schema.sql
-- For local dev:
--   npx wrangler d1 execute oasis-reviews --local  --file=./schema.sql
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS reviews (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  college      TEXT,
  service      TEXT,
  rating       INTEGER NOT NULL,
  review       TEXT NOT NULL,
  project_link TEXT,
  created_at   TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'pending'
);

-- Fast public reads: approved reviews, newest first.
CREATE INDEX IF NOT EXISTS idx_reviews_status_created
  ON reviews (status, created_at DESC);

-- Admin listing by status.
CREATE INDEX IF NOT EXISTS idx_reviews_status
  ON reviews (status);
