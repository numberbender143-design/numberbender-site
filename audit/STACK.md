# STACK.md — Numberbender.com v3.0 (Phase 0 discovery)

**Date:** 2026-06-10 · **Branch:** `seo/crawlability-audit-2026-06`

## Stack
- **Framework:** none — hand-authored static HTML (no build step, no SSG). All primary content is server-delivered static HTML; JS (`nb-animations.js`, `nb-search.js`, `nb-analytics.js`) is progressive enhancement only.
- **Hosting:** Netlify. `netlify.toml` → `publish = "."` (repo root is the site).
- **Deploys:** git-based — anything git-tracked is live; `.gitignore` doubles as the deploy-exclusion list (`*.md`, `_archive/`, `numberbender v3.0/`, `BLOG_VIDEO_POST/`, `School_logo/` additions, `.claude/`, etc.).
- **Routing:** file-based. Clean URLs come from redirect rules, not pretty-URL config:
  - `_redirects` — legacy v1/v2 (Wix-era) URL patterns, www/http→https host canonicalization, trailing-slash rules. Processed **before** `netlify.toml` rules.
  - `netlify.toml` — `.html → clean-URL` 301s (one rule per page), `/math-ccc` rewrite (200) of `ccc-atlas.html`, 404 catch-all (`/* → /404.html` status 404), cache/security headers, `X-Robots-Tag: noindex` on PDFs.
- **Sitemap:** `sitemap.xml` — **manually maintained** (no generation step exists; flagged in report). 123 URLs, all verified 200 live.
- **robots.txt:** hand-maintained; disallows ~40 `.html` redirect sources + thank-you pages; sitemap directive present and correct.
- **404 handling:** `404.html` + catch-all rule returning a true HTTP 404 with nav links — verified live.
- **Canonical host:** `https://numberbender.com` (non-www), forced via `_redirects` 301! rules + HSTS preload header.

## Key route groups (live = git-tracked)
| Group | Pattern | Notes |
|---|---|---|
| Core/landing | `/<page>` (clean URL → `<page>.html`) | ~60 pages |
| Course pages | `/math110-course` … `/math250-course`, algebra courses | |
| Subject libraries | `/subjects/<subject>/` | `index.html` per dir |
| Worksheet hubs | `/courses/<subject>/<track-english\|filipino>/worksheets/` | bilingual pairs |
| DepEd (PH) | `/deped/...`, `/deped/teachers/...`, `/deped/shs/...` | `index.html` per dir |
| Full courses | `/learn/<course>/` | |
| Assets | `/worksheets/**/*.pdf` (noindexed), `/images/`, `/content/`, `/exports/` | |

## Legacy URL map (v1 Wix / v2 → v3)
Already covered by `_redirects`: `/lessons/view/*`, `/lessons/*`, `/topics/*`, `/subjects/view/*` → `/courses`; `/worksheets/<subject>/` → `/subjects/<subject>/`; `/uploads/*`, `/attachments/*`, `/user(s)/*`, `/profile/*`, `/posts/*`, `/news/*`, `/contact-us`, `/about-us`, `/courses-v2*`.

## Untracked local dirs (never deployed — not crawlable)
`numberbender v3.0/` (dev copies), `v3 atlas/`, `V3.0 courses/`, `DepEd 2026/`, `_archive/`, `.claude/backup_calc/`. These contain duplicate page copies but are excluded from deploys by `.gitignore`, so they pose no live duplicate-content risk.
