# v2.0 Launch Checklist
> Status: APPROVED — waiting on course completion before deploy.
> Decided: May 2026

---

## Design Principles

- **Topic-first, not audience-first.** Drop "For Students" / "For Educators" labels. Use action-based labels (Learn, Teach) so neither students nor teachers feel locked out of any section.
- **Redundancy is intentional.** Worksheets and course/lesson pages appear in both Learn and Teach menus. A student and a teacher should both feel like that content is for them.
- **Lesson sequencing is a teacher superpower.** Numberbender has a wealth of lesson ideas and sequencing built into the course structure. The Teach menu surfaces this explicitly — teachers spend hours looking for this and we have it.
- **SEO: keep math-worksheets.html alive.** It has built-up ranking authority. Do not delete or 404 it. Both the old page and new subject-specific worksheet pages can coexist. Link from the old page into the new subject pages over time.

---

## Final Nav Structure

### Learn ▾
| Link | Page |
|------|------|
| 🎁 Free Starter Lesson | start-here.html |
| 🧭 Find My Course | find-your-course.html |
| 📚 All Courses & Subjects | courses-v2.html |
| 📝 Free Worksheets | math-worksheets.html |
| 🇵🇭 Para sa Filipino Students | for-filipino-students.html |

### Teach ▾
| Link | Page |
|------|------|
| 🏫 For Teachers Hub | for-teachers.html |
| 🎬 Teach It Like You Stream It | teach-it-like-you-stream-it.html |
| 📦 Teacher Resources | teacher-resources.html |
| 📝 Printable Worksheets | math-worksheets.html |
| ─ divider ─ | |
| 📚 Lesson & Course Library | courses-v2.html |

### About ▾
| Link | Page |
|------|------|
| 👨‍🏫 About Dr. E | about.html |
| 🎤 Speaking | speaking.html |
| 📰 Press & Media | press.html |
| ✍️ Blog | blog.html |
| 📅 Past Engagements | speaking-archive.html |

### Contact (CTA button)
→ contact.html

---

## Pages This Nav Touches (v2.0 dev files only)

- courses-v2.html
- subjects/algebra/index.html
- subjects/calculus/index.html
- subjects/statistics/index.html
- subjects/geometry/index.html
- subjects/trigonometry/index.html
- subjects/precalculus/index.html
- subjects/linear-algebra/index.html
- subjects/discrete-math/index.html
- subjects/pre-algebra/index.html
- subjects/test-prep/index.html
- learn/elementary-algebra/index.html
- learn/intermediate-algebra/index.html

## Pages NOT touched (live site — do not modify)
- index.html (live homepage — has its own nav, leave it alone until full v2 launch)
- math-worksheets.html (keep live, keep its nav as-is)
- All other currently-live pages

---

## What Changed vs. Current Live Nav

| Current live | v2.0 |
|---|---|
| "For Students" dropdown | Renamed → Learn |
| "For Educators" dropdown | Renamed → Teach |
| "Blog" as its own dropdown | Merged into About |
| "Workshops & Keynotes" (never existed as a page) | Removed — Speaking covers this |
| Course/lesson pages not in nav | Added to Teach menu under a divider |

All 14 link destinations from the current live nav are preserved. Nothing was dropped.

---

## Deploy Day Checklist

Changes to make at launch — in order.

### 1. Nav update (all v2.0 pages)
Implement the Learn / Teach / About dropdown nav across all 13 v2.0 pages listed above.

### 2. Homepage hero image swap (index.html)
Replace the current hero image with the new teacher/worksheet photo.

**File:** `index.html` — line ~1051
**Change:** `images/hero-characters.png` → `images/hero_image_worksheet_teacher.png`

```html
<!-- BEFORE -->
<img src="images/hero-characters.png" alt="Numberbender students and educators" loading="eager">

<!-- AFTER -->
<img src="images/hero_image_worksheet_teacher.png" alt="Numberbender students and educators" loading="eager">
```

The floating "415 Free PDF Worksheets" badge (`.ws-float-badge`) sits above this image in the DOM and does NOT need to change — it will keep hovering over the new photo automatically.

### 3. courses-v2.html hero copy (already done)
- Title: "Courses & Subjects" → **"Find Your Math"** ✅
- Subtitle: updated to "Whatever math you're facing right now — it's in here." ✅

### 4. Google Search Console — validate structured data fix (already fixed, needs validation)
The `uploadDate` fields in `flipped-classroom-videos.html` and `flipped-classroom-math.html` were
updated from bare dates (e.g. `"2016-01-01"`) to ISO 8601 with timezone (e.g. `"2016-01-01T00:00:00+00:00"`).
Google flagged these as non-critical issues — but fixing them makes your videos eligible for
rich results (video preview cards) in Google Search.

**After deploy:** Go to Google Search Console → Enhancements → Video → click **"Validate Fix."**
Google will re-crawl and clear the warnings within a few days.
