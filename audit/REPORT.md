# Numberbender.com — Crawlability & 404 Audit Report

**Date:** June 10, 2026 · **Branch:** `seo/crawlability-audit-2026-06`
**Deliverables:** this report, [404-inventory.csv](404-inventory.csv), [STACK.md](STACK.md)

## Executive summary

The site's redirect and canonical infrastructure was already strong; the audit found and fixed one cluster of genuine user-facing 404s (all 28 worksheet PDF links on the Grade-7 DepEd page were broken), a sitewide pattern of internal links and JSON-LD pointing at `.html` URLs that 301-redirect (a wasted hop on every crawl), and a robots.txt that *blocked Google from following those same 301s*, preventing signal consolidation. Two URLs (`/index.html`, `/math-worksheets.html`) were serving 200 duplicate content because their redirect rules were shadowed by the physical files — now forced. On the Core Web Vitals side, the priority pages for the Philippine mobile audience (DepEd hub, press, speaking, homepage) were shipping multi-megabyte PNGs; they now serve WebP at 4–25× smaller with explicit dimensions and LCP preloads. One item needs an owner decision: a blog page embeds a video file that is gitignored and can never exist in production.

## 404 inventory — found → fixed → remaining

| Finding | Count | Resolution |
|---|---|---|
| Grade-7 DepEd page PDF links 404 (relative hrefs resolved to `/deped/grade-7/*.pdf`; files live in `/worksheets/<subject>/`) | 28 | **Fixed** — rewritten to real paths, every target verified 200 live. Grades 8/9/10 already linked correctly. |
| `find-your-course` referenced `slide-4.webp` which never existed | 1 | **Fixed** — WebP generated for all 6 carousel slides + width/height added |
| Internal links & JSON-LD pointing at `.html` URLs that 301 (e.g. `/ccc-atlas.html` from 36 pages, `/courses.html` from 33) | ~40 URLs, 75 files | **Fixed** — all rewritten to clean canonical URLs |
| `/index.html` and `/math-worksheets.html` served 200 duplicates (non-forced rules shadowed by files) | 2 | **Fixed** — `301!` forced in `_redirects` (takes effect on deploy) |
| 126 internal links to `/subjects/test-prep` (canonical is `…/test-prep/`); 1 stray `/deped/teachers/` | 127 | **Fixed** — normalized to canonical forms |
| `/uploads/attachments/*` redirected to `/` (more specific netlify.toml rule was shadowed) | pattern | **Fixed** — specific rule added in `_redirects` |
| `blog-become-edutuber` embeds `/BLOG_VIDEO_POST/esperanza_youtube_event.mp4` — file is **gitignored**, 404s live, player shows broken | 1 | **REMAINING — owner decision** (removing the visible block is out of authorized scope). Options: host the clip on YouTube and embed it, or delete the `<video>` block. |

Full row-by-row detail in [404-inventory.csv](404-inventory.csv).

## Crawl blockers found and fixed

1. **robots.txt blocked ~40 redirecting `.html` URLs.** Google cannot follow a 301 it is forbidden to crawl, so old indexed/backlinked `.html` URLs could never consolidate to the clean URLs. All Disallows removed; thank-you pages rely on their existing `meta noindex` (which also requires crawlability to be seen). The only remaining Disallow is `/courses?s=` (parameterized search results).
2. **404 page hygiene:** removed a self-canonical that contradicted its `noindex`; absolutized its favicon/banner paths, which broke when the 404 page rendered at nested URLs.

## Indexation status (Phases 2–3 checks)

| Check | Status | Notes |
|---|---|---|
| robots.txt sane, sitemap directive | **Pass** | Cleaned as above; no CSS/JS/landing pages blocked |
| XML sitemap valid, only 200/canonical URLs | **Pass** | All 123 URLs verified 200 live; coverage matches repo routes 1:1 both directions; `lastmod` refreshed for the 122 pages modified here |
| Sitemap auto-generation | **Warning** | Sitemap is manually maintained; no build step exists to wire into (and `.gitignore` excludes `*.py` from deploys). Recommend a small generator run pre-commit or a Netlify build plugin. |
| Meta robots — no accidental noindex | **Pass** | Only the five thank-you pages + 404 are noindexed; all intentional |
| Canonicals self-referential, absolute, no canonical→404/redirect | **Pass** | 100% of indexable pages; JSON-LD URLs now match canonicals |
| Server-rendered content (no JS-only content) | **Pass** | Static HTML; nav, lesson lists, landing copy all in source. JS is enhancement only. Exception noted: test-prep badge gallery is JS-injected (below the fold; acceptable) |
| Legacy v1/v2 redirects, single hop | **Pass** | `/lessons/view/*`, `/topics/*`, `/subjects/view/*`, `/worksheets/<subject>/`, `/uploads/*`, www/http hosts — all verified one-hop 301 live |
| Custom 404 returns real 404 + nav/hub links | **Pass** | Verified live |
| hreflang | **Pass (new)** | Reciprocal `en`/`fil`/`x-default` added to all 17 English↔Filipino worksheet-hub pairs; every target verified to resolve. Inline-bilingual pages (`/for-filipino-students`, `/deped`) intentionally have no hreflang (documented in-page). |
| HTTPS + single host | **Pass** | www/http → `https://numberbender.com` one-hop 301!; HSTS preload header set |
| Duplicate content | **Pass** | `/index.html` + `/math-worksheets.html` duplicates fixed; `/deped` vs `/deped/` both 200 but canonicals + sitemap + internal links all agree per section |
| Unique titles / one H1 / OG + Twitter cards | **Pass** | 0 duplicate titles, exactly one H1 per indexable page, OG image/title + twitter:card present sitewide |
| Meta descriptions 150–160 chars | **Pass (fixed)** | 27 pages ran 175–272 chars; trimmed to 140–160 preserving lead keywords (incl. all Filipino hub pages and DepEd pages) |
| Structured data parses | **Pass** | 0 JSON parse errors across 1,000+ entities (LearningResource ×676, BreadcrumbList ×78, Course ×44, FAQPage, Person, NGO, Event…). Added JSON-LD to 8 pages that had none: courses hub, both `/learn/` courses (`Course`), start-here, contact (`ContactPage`), speaking-archive, Luisiana speaking page (`Event`), flipped-classroom-quickstart. Homepage already carries `EducationalOrganization` + `WebSite`; nonprofit page carries `NGO`. |
| Image alt attributes on landing pages | **Pass** | Spot-checked heroes/carousels — alt text present |

## Core Web Vitals (mobile PH priority)

Lab Lighthouse runs require the deployed build (changes are redirect/header-dependent); run post-merge — see owner actions. What was shipped, with measured payload deltas (image bytes on the page, PNG/JPG before → WebP now served to all modern browsers):

| Page | Before | After | Notes |
|---|---|---|---|
| `/` (homepage) | 2,834 KB | 314 KB | hero already eager+fetchpriority; now WebP + preload |
| `/deped` and `/deped/teachers` | 685 KB | 279 KB | 2000px hero re-encoded at 1200px WebP + preload |
| `/press` | 2,036 KB | 150 KB | |
| `/speaking-archive` | 12,514 KB | 435 KB | |
| `/speaking` | 6,785 KB | 194 KB | |
| `/ap-calculus-frq-books` | 5,907 KB | 244 KB | also repaired a pre-existing 6-deep nested `<picture>` |
| `/for-filipino-students` | 682 KB | 53 KB | + LCP preload |
| `/deped/grade-7` … `grade-10`, SHS pages | ~330 KB each | 12–19 KB each | DepEd artwork |

Also: explicit `width`/`height` added on every newly wrapped image (CLS); carousel images dimensioned; scroll animations untouched (`nb-animations.js` already honors `prefers-reduced-motion`); scripts already load at end of body; no render-blocking web fonts exist; long-cache + HSTS headers already configured in `netlify.toml`.

## Deferred to human review

1. **Broken video embed** on `/blog-become-edutuber` (see above) — content decision.
2. **Test-prep badge images** (`images/badges_test_prep/*.png`, ~1.2 MB total) are injected via inline JS on `/subjects/test-prep/`; converting to WebP means editing JS string paths. Below the fold, so deferred.
3. **`/deped` vs `/deped/` both return 200** (Netlify serves directories both ways). Canonicals/sitemap/links are consistent, so this is cosmetic; a forced slash policy could be added if GSC ever reports duplicates.
4. **Sitemap generation** is manual — works today (verified 1:1 with routes) but will drift; recommend automating.
5. **`exports/` PDFs** (100 files) are deployed without `X-Robots-Tag: noindex` (the `/*.pdf` header rule covers them — verify in GSC that none are indexed as duplicates of course pages).

## Owner action items (need account access)

- **Netlify:** merge → confirm deploy, then spot-check `/index.html` and `/math-worksheets.html` now 301.
- **Google Search Console:** resubmit `sitemap.xml`; request indexing for `/deped/grade-7` (its 28 fixed PDF links), `/for-filipino-students`, `/deped`; monitor Coverage → "Page with redirect" entries should consolidate over the next weeks now that robots.txt allows the 301s to be crawled.
- **Lighthouse (mobile, throttled)** on `/`, `/deped`, `/for-filipino-students`, `/courses`, `/math-worksheets`, `/press` post-deploy; expect LCP improvements roughly proportional to the payload table above. Target: LCP ≤ 2.5 s.
- **Google Ad Grants:** the landing-page eligibility checks (200 status, crawlable, fast) are all strengthened by this PR — no known blockers from the site side.
