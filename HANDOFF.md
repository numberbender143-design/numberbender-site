# Numberbender v2.0 — Project Handoff Document
*Safe-button file for cross-computer continuity. All critical project knowledge in one place.*  
*Last updated: 2026-05-22 — after Geometry page was completed (5 of 10 subjects built).*

---

## 📍 Quick Start on a New Computer

```bash
# 1. Open the project
cd "/Users/numberbender/Desktop/Numberbender Website 2026/numberbender-site"

# 2. Make sure you're on the right branch
git branch          # should show * v2-dev
git checkout v2-dev # if not already on it

# 3. Start the local dev server (ALWAYS use this — don't use preview_start, it breaks on spaces in the path)
python3 -m http.server 3000
# Then open: http://localhost:3000

# 4. The live site is on 'main' — NEVER push v2-dev to main until Dr. E approves the full v2 launch
```

---

## 🗂 Repository

| Key | Value |
|-----|-------|
| **Repo path** | `/Users/numberbender/Desktop/Numberbender Website 2026/numberbender-site/` |
| **Active branch** | `v2-dev` (local only — never pushed) |
| **Live site branch** | `main` (Netlify auto-deploys from main) |
| **Rule** | v2-dev stays fully local. No changes hit the live site during development. |
| **Inventory CSV** | `numberbender_inventory_with_format.csv` (in project root) |
| **Worksheet tracker** | `missing-worksheets.md` (in project root) |
| **This file** | `HANDOFF.md` (in project root) |

---

## ✅ What's Been Built (5 of 10 subjects)

| Subject | File | Theme | Units | Lessons | Worksheets |
|---------|------|-------|------:|--------:|-----------|
| **Algebra** | `subjects/algebra/index.html` | 🟠 Orange | 11 | 67 | 57 of 67 (10 missing) |
| **Calculus** | `subjects/calculus/index.html` | 🟣 Purple | 8 | 92 | 46 of 92 (Unit 8 FRQ has none) |
| **Precalculus** | `subjects/precalculus/index.html` | 🔵 Blue | 11 | 65 | 65 of 65 (complete) |
| **Statistics** | `subjects/statistics/index.html` | 🟢 Green | 9 | 70 | 42 of 70 (28 missing) |
| **Geometry** | `subjects/geometry/index.html` | 🟡 Yellow | 7 | 22 | 17 of 22 (5 missing) |

**Important: Calculus has 8 units, not 7.** Unit 8 is "AP Calculus AB/BC Exam Prep — FRQ Practice" with a nested topic-accordion structure (8 topic groups, 46 lessons). See the Calculus Special Structure section below.

---

## 🔜 What's Next (6 subjects remaining)

Build in this order. Pause after each for Dr. E to review before starting the next.

| # | Subject | Theme | Hero Artwork | Playlist Icon |
|---|---------|-------|-------------|---------------|
| 1 | **Trigonometry** | 🔴 Red `#dc2626` | `10_trigonometry.png` | `8_trigonometry.png` |
| 3 | **Linear Algebra** | 🔷 Dark Blue `#1d4ed8` | `1_linear_algebra.png` | `6_linear_algebra.png` |
| 4 | **Discrete Math** | 🩵 Cyan `#0891b2` | `8_discrete_math.png` | `5_discrete_math.png` |
| 5 | **Pre-Algebra** | 🟤 Indigo `#4f46e5` | `14_elementary_algebra.png` | `13_elementary_algebra.png` |
| 6 | **Test Prep** | ⬛ Slate `#475569` | *(none — use 🎯 emoji div)* | *(none — use 🎯 emoji div)* |

---

## 🎨 Design System

### CSS Color Tokens (`:root`)
```css
--navy:#0F172A;
--blue:#2563EB; --blue-dark:#1d4ed8; --blue-light:#EFF6FF; --blue-mid:#93C5FD; --blue-xlight:#DBEAFE;
--red:#DC2626; --red-dark:#b91c1c; --red-light:#FEF2F2; --red-mid:#FCA5A5;
--teal:#1F6F6B; --teal-dark:#085041;
--bg:#F8FAFC; --surface:#FFFFFF;
--muted:#64748B; --border:#E2E8F0;
--green:#16a34a; --green-light:#f0fdf4; --green-mid:#86efac;
--amber:#92400e; --amber-light:#fef3c7; --amber-mid:#fde68a;
```

### Subject Accent Colors (`--active` tokens + hero gradient)
Each subject overrides `--active`, `--active-dark`, `--active-light`, `--active-mid` in `:root`.  
FIL mode always overrides to red (`body[data-lang="fil"]`).

| Subject | `--active` | `--active-dark` | `--active-light` | `--active-mid` | Hero gradient |
|---------|-----------|-----------------|-----------------|----------------|--------------|
| Algebra | `#ea580c` | `#c2410c` | `#fff7ed` | `#fdba74` | `#c2410c→#ea580c→#f97316` |
| Precalculus | `#2563EB` | `#1d4ed8` | `#EFF6FF` | `#93C5FD` | `#1d4ed8→#2563EB→#3b82f6` |
| Calculus | `#7c3aed` | `#6d28d9` | `#f5f3ff` | `#c4b5fd` | `#6d28d9→#7c3aed→#8b5cf6` |
| Statistics | `#16a34a` | `#166534` | `#f0fdf4` | `#86efac` | `#166534→#16a34a→#22c55e` |
| Trigonometry | `#dc2626` | `#b91c1c` | `#fef2f2` | `#fca5a5` | `#b91c1c→#dc2626→#ef4444` |
| Geometry | `#d97706` | `#b45309` | `#fffbeb` | `#fcd34d` | `#b45309→#d97706→#f59e0b` |
| Linear Algebra | `#1d4ed8` | `#1e3a8a` | `#dbeafe` | `#93c5fd` | `#1e3a8a→#1d4ed8→#2563eb` |
| Discrete Math | `#0891b2` | `#0e7490` | `#ecfeff` | `#67e8f9` | `#0e7490→#0891b2→#22d3ee` |
| Pre-Algebra | `#4f46e5` | `#4338ca` | `#eef2ff` | `#a5b4fc` | `#4338ca→#4f46e5→#6366f1` |
| Test Prep | `#475569` | `#334155` | `#f8fafc` | `#94a3b8` | `#334155→#475569→#64748b` |

**When building a new subject:** update `:root --active` tokens, hero gradient CSS, and both box-shadow `rgba()` values (unit-block.open + lang-btn.active). Also update the lang-btn.active box-shadow rgba to match the subject color.

---

## 📐 Subject Page Architecture

### Page Rules
- All pages are single-file HTML (CSS + JS inline, no external stylesheets except system fonts)
- Subject pages live at `subjects/[name]/index.html`
- All paths to root use `../../` (e.g., `../../images/`, `../../worksheets/`)
- Sticky nav sits at `top:0` (z-index 50), sticky lang bar sits at `top:71px` (z-index 40)
- Lang bar border color switches to red in FIL mode via `body[data-lang="fil"] .lang-bar`

### Hero Images
```html
<!-- Playlist icon (small square, 80×80) -->
<div class="hero-icon">
  <img src="../../images/playlist_icons/FILE.png" alt="SUBJECT" style="width:100%;height:100%;object-fit:cover;display:block;">
</div>

<!-- Artwork (large character, flush to hero bottom) -->
<div class="hero-artwork-wrap">
  <img class="hero-artwork" src="../../images/worksheet_page_artworks/FILE.png" alt="" aria-hidden="true">
</div>
```
Artwork CSS creates a white card that sits flush to the hero bottom (align-self:flex-end, border-radius 20px 20px 0 0).

### Lesson Card HTML Pattern
```html
<a class="lesson-item"
   data-en-id="YOUTUBE_ID_EN"
   data-fil-id="YOUTUBE_ID_FIL"
   data-worksheet="filename.pdf"
   href="https://www.youtube.com/watch?v=YOUTUBE_ID_EN"
   target="_blank" rel="noopener">
  <div class="lesson-play">▶</div>
  <div class="lesson-meta">
    <div class="lesson-title">Lesson Title</div>
    <div class="lesson-sub">Unit X · Lesson Y</div>
  </div>
  <span class="lesson-badge both">EN + FIL</span>   <!-- or class="en" or class="fil" -->
</a>
```
- Badge classes: `both` (green), `en` (blue), `fil` (amber)
- If no FIL video: `data-fil-id=""` + badge class `en`
- If no EN video: `data-en-id=""` + badge class `fil` + change href to FIL video URL
- If no worksheet: omit `data-worksheet` attribute entirely (no worksheet buttons injected)

### Worksheet JS (in every page — UPDATE the path for each subject)
```js
// In "inject worksheet buttons" section:
var href = ws.startsWith('../../') ? ws : '../../worksheets/SUBJECT/' + ws;

// In openModal() function:
var wsBase = '../../worksheets/SUBJECT/';
```
Replace `SUBJECT` with the subject folder name (algebra, calculus, statistics, etc.).

### Worksheet Path Rules
- **Same-subject worksheets:** store bare filename in `data-worksheet` → JS prepends the base path
- **Cross-folder worksheets:** store full path `../../worksheets/OTHER_SUBJECT/filename.pdf` → JS detects `../../` prefix and uses path as-is
- Calculus worksheets live in 3 subdirs: `limits/`, `derivatives/`, `integrals/` — all paths stored as full `../../worksheets/calculus/[subdir]/filename.pdf`

---

## 📋 Subject Page Build Playbook

**Always follow these steps in order. Never skip steps.**

### STEP 0 — Pre-flight inventory check
```bash
cd "/Users/numberbender/Desktop/Numberbender Website 2026/numberbender-site"

# Count videos for the subject
python3 -c "
import csv
rows = []
with open('numberbender_inventory_with_format.csv') as f:
    for r in csv.DictReader(f):
        if 'SUBJECT' in r['Category'].lower():
            rows.append(r)
en = [r for r in rows if 'english' in r['Language'].lower()]
fil = [r for r in rows if 'filipino' in r['Language'].lower()]
print(f'EN: {len(en)}, FIL: {len(fil)}, Total: {len(rows)}')
"
```

### STEP 0b — Filter short-form videos (CRITICAL RULE — never skip)
**Primary lesson slots must use full-length videos only.** Exclude any video matching EITHER:
1. `Format` column == `vertical` in the CSV
2. Title contains any of: `math in a minute`, `in a minute`, `#shorts`, `math in a min`

Short-form videos go to the supplemental pool — NOT primary lesson slots.

```python
# Detection function
def is_short(r):
    if r.get('Format','').lower() == 'vertical': return True
    short_kw = ['math in a minute','in a minute','#shorts','math in a min']
    if any(k in r['Title'].lower() for k in short_kw): return True
    return False
```

### STEP 1 — Copy algebra as the template
```bash
cp subjects/algebra/index.html subjects/[subject]/index.html
```
Then update: title, meta, breadcrumb, h1, tagline, hero stats (units/lessons), hero icon, hero artwork, gradient colors, worksheet JS base path, unit/lesson content.

### STEP 2 — Video ID mapping
- Search inventory by keyword (grep or python filter)
- Always search for BOTH EN and FIL — never assume FIL-only without a deep search
- EN videos with Filipino titles in the CSV are common misclassifications — treat them as FIL
- One video can cover multiple lessons — sharing is fine
- Check the Status column — skip rows marked private/deleted
- Use `data-en-id=""` if no EN exists; use `data-fil-id=""` if no FIL exists

```bash
# Quick keyword search
grep -i "KEYWORD" numberbender_inventory_with_format.csv
```

### STEP 3 — Worksheet mapping
```bash
# Search ALL worksheet folders (worksheets sometimes live in wrong subject's folder)
python3 -c "
import os
kw = 'KEYWORD'
for root, dirs, files in os.walk('worksheets'):
    for f in files:
        if kw.lower() in f.lower(): print(os.path.join(root, f))
"
```

### STEP 4 — QA checklist
```bash
# Run the QA checker
python3 qa_check.py subjects/[subject]/index.html
```
Manual checks:
- [ ] No short-form videos in primary lesson slots (run short-form audit)
- [ ] All `data-worksheet` filenames exist on disk
- [ ] Hero stats (units/lessons) match actual HTML card count
- [ ] Unit labels say "Unit 1" not "U1"
- [ ] Hero has WATCH → WORKSHEET → DOWNLOAD trio strip
- [ ] Playlist icon image used (not text/emoji) — except Test Prep
- [ ] Hero artwork floated right (`mix-blend-mode:multiply`) — except Test Prep uses 🎯
- [ ] `missing-worksheets.md` updated for this subject
- [ ] Repurposable content tracker updated (run the python script in missing-worksheets.md)

---

## 📦 Worksheet Inventory

### On-disk PDF Counts (as of 2026-05-22)

| Folder | PDFs | Notes |
|--------|-----:|-------|
| `worksheets/algebra/` | 68 | Includes extra revisions |
| `worksheets/calculus/limits/` | 8 | |
| `worksheets/calculus/derivatives/` | 55 | |
| `worksheets/calculus/integrals/` | 28 | |
| `worksheets/precalculus/` | 65 | Flat folder — no subdirs |
| `worksheets/statistics/` | 47 | Units 01–05 only; Units 6–9 missing |
| `worksheets/geometry/` | 39 | Unused on site yet |
| `worksheets/trigonometry/` | 42 | Unused on site yet |
| `worksheets/linear-algebra/` | 8 | Unused on site yet |
| `worksheets/discrete-math/` | 9 | Unused on site yet |
| `worksheets/inferential-statistics/` | 34 | Unused on site yet |
| `worksheets/analytic-geometry/` | 13 | Unused on site yet |
| **TOTAL** | **~418** | |

### Missing Worksheets by Subject

| Subject | Missing | Details |
|---------|--------:|---------|
| Algebra | 10 | See `missing-worksheets.md` — mostly Unit 3 (linear equations) |
| Calculus | 0 | Complete (Unit 8 FRQ has no worksheets by design) |
| Precalculus | 0 | Complete |
| Statistics | 28 | Units 6–9 have no worksheets yet |
| All others | TBD | Not yet built |

### Statistics Worksheet Notes
- Units 1–5 worksheet filenames follow `XX-YY-statistics-topic-name.pdf` format
- **Cross-filed worksheets** (filed under wrong unit number but used correctly on site):
  - `02-01-statistics-type-1-and-type-2-errors.pdf` → used in Unit 8 L2
  - `02-02-statistics-chi-square-test-independence.pdf` → used in Unit 8 L9
  - `01-01-statistics-probability.pdf`, `01-03-statistics-conditional-probability.pdf`, `01-04-statistics-conditional-probability-dependent-events.pdf` → exist but not linked (Unit 5 uses the proper `05-xx` worksheets instead)

---

## 🎬 Calculus Special Structure (Unit 8)

The Calculus page has a **two-level accordion** for Unit 8 only:
- Level 1: `.unit-block` (existing pattern)
- Level 2: `.topic-block` (nested inside `.unit-lessons` — added specifically for Unit 8)

Unit 8 contains 8 topic groups × 46 AP Calculus AB/BC FRQ lessons.
The topic groups are: TI-84 Strategy, Riemann Sums, Rates of Change & Accumulation, Motion (Particle on a Line), Area & Volume, Tangent Lines & Linearization, Related Rates & Implicit Differentiation, Differential Equations & Slope Fields.

The FIL videos in Unit 8 are **not FRQ walkthroughs** — they are full-length instructional videos on the same calculus topic (e.g., FRQ about Riemann sums → FIL video is the Dr. E lesson on Riemann sums in Filipino). Badge still shows "EN + FIL" since both modes have playable content.

The `unit-block.open .unit-lessons` max-height for the Calculus page is `9999px` (not 3000px) to accommodate the deeply nested Unit 8 content.

The CSS for topic blocks is defined inside `subjects/calculus/index.html` — it is NOT in the shared algebra template.

---

## 🎬 Statistics Page Structure (9 Units, 70 Lessons)

| Unit | Title | Lessons | Worksheets |
|------|-------|--------:|-----------|
| 1 | Exploring Data & Study Design | 8 | All 8 ✓ |
| 2 | Representing & Summarizing Data | 9 | All 9 ✓ |
| 3 | The Normal Distribution | 5 | All 5 ✓ |
| 4 | Linear Regression & Correlation | 8 | 6 of 8 (L7, L8 = EN-only; all 8 have worksheets) |
| 5 | Probability | 10 | All 10 ✓ |
| 6 | Random Variables & Distributions | 7 | 0 (to be created) |
| 7 | Confidence Intervals | 8 | 0 (to be created) |
| 8 | Hypothesis Testing | 9 | 2 (cross-filed; 7 to be created) |
| 9 | AP Statistics FRQ | 6 | 0 (to be created) |

Unit 9 (AP Stats FRQ) uses the same FIL-pairing approach as Calculus Unit 8 — EN videos are FRQ walkthroughs, FIL videos are related concept lessons. **No nested accordion** (just a flat list of 6 lessons).

---

## 📹 Video Inventory — Repurposable Content Tracker

*5 of 10 subjects built. Last updated: 2026-05-22.*

| Category | Total | EN | FIL | Used on site | **Unused** |
|----------|------:|---:|----:|-------------:|----------:|
| Algebra | 475 | 252 | 223 | 125 | **350** |
| Calculus | 466 | 283 | 183 | 201 | **265** |
| Statistics | 326 | 198 | 128 | 139 | **187** |
| Trigonometry | 45 | 25 | 20 | 12 | **33** |
| Geometry | 42 | 30 | 12 | 36 | **6** |
| Precalculus | 18 | 10 | 8 | 3 | **15** |
| Linear Algebra | 2 | 2 | 0 | 0 | **2** |
| Discrete Math | 16 | 10 | 6 | 0 | **16** |
| General / Other | 231 | 199 | 32 | 5 | **226** |
| **TOTAL** | **1,621** | **1,009** | **612** | **521** | **1,100** |

### General / Other — Repurposable Pool (226 unused videos)
| Content Type | Count | EN | FIL | Repurpose Idea |
|---|:---:|:---:|:---:|---|
| Misc / Unlabeled Math Content | 158 | 143 | 15 | Review individually |
| Livestream Recordings | 21 | 18 | 3 | Clip into lesson supplements |
| Teaching Podcast (TILYSI series) | 12 | 12 | 0 | Standalone series page |
| Test Broadcasts / Rehearsals | 20 | 19 | 1 | ❌ Discard — internal only |
| Motivational / Study Tips (FIL) | 8 | 0 | 8 | "Paano Gumaling sa Math" playlist |
| LET / UPCAT Review Shorts | 4 | 2 | 2 | Future Test Prep page |
| Livestream Events / Ceremonies | 21 | 18 | 3 | Community / About page |
| Celebrity / Pop Culture | 2 | 1 | 1 | Social media content |
| Teach Abroad Vlog | 1 | 1 | 0 | Dr. E's story / About page |

### How to Update the Tracker After Each New Subject Page
```bash
cd "/Users/numberbender/Desktop/Numberbender Website 2026/numberbender-site"
python3 << 'PYEOF'
import csv, re, pathlib
from urllib.parse import parse_qs, urlparse

def vid_id(url):
    if 'youtu.be/' in url: return url.split('youtu.be/')[-1].split('?')[0].strip()
    try: return parse_qs(urlparse(url).query).get('v',[''])[0].strip()
    except: return ''

used = set()
for html in pathlib.Path('subjects').rglob('*/index.html'):
    c = html.read_text()
    for pat in [r'data-en-id="([^"]+)"', r'data-fil-id="([^"]+)"']:
        used.update(i for i in re.findall(pat, c) if i.strip())

with open('numberbender_inventory_with_format.csv') as f:
    rows = list(csv.DictReader(f))

total = sum(1 for r in rows if vid_id(r['URL']))
used_count = sum(1 for r in rows if vid_id(r['URL']) in used)
print(f"Total: {total} | Used: {used_count} | Unused: {total - used_count}")
PYEOF
```
Then update the Inventory snapshot table above and in `missing-worksheets.md`.

---

## ⚠️ Critical Rules — Do Not Break These

### 1. Short-Form Video Exclusion (applied to Calculus in this session)
Primary lesson slots = full-length videos only. Never use:
- Videos tagged `format = vertical` in the CSV
- Videos with titles containing `math in a minute`, `in a minute`, `#shorts`, `math in a min`

These go to the supplemental pool. During the Calculus audit, 7 short videos were replaced:

| Lesson | Fix | Old ID | New ID |
|--------|-----|--------|--------|
| U1·L1 Introduction to Limits | EN replaced | `H5EK5iilYu4` | `LBewgSAfvsI` |
| U1·L2 Direct Substitution & Factoring | EN replaced | `k-wUK29Ct_o` | `zEgMBKtxDaE` |
| U3·L4 Inverse Trig Derivatives | EN replaced | `imTwrpIny50` | `71zSmpmglUM` |
| U3·L5 Transcendental Functions | FIL replaced | `RWAQx8ZYfzA` | `QRY4HIjnqgY` |
| U4·L2 Implicit Diff (Trig & 2nd Deriv) | EN replaced | `T3tMTYQcBj4` | `OWmjfuTPBQE` |
| U4·L3 Higher-Order Derivatives | EN replaced | `gaoZBttxNB8` | `W-9WzZEZYnc` |
| U6·L8 U-Substitution | FIL replaced | `4_D116LUS38` | `qVf2XVGpLfc` |

⚠️ **One known unfixed short:** U1·L6 L'Hôpital's Rule EN (`jmNzLMeMQcs`) — no full-length EN replacement exists in the inventory. Dr. E approved keeping it as-is until a full-length version is recorded.

### 2. Never Assume FIL-Only Without a Deep Search
EN versions often exist under different video titles. Always search the full inventory before declaring a lesson EN-only.

### 3. Search ALL Worksheet Folders
Worksheets sometimes live in unexpected folders:
- Unit 11 Sequences worksheets for Algebra → found in `worksheets/precalculus/`
- Unit 8 Type I/II Errors + Chi-Square worksheets for Statistics → found in `worksheets/statistics/` under Unit 02 filenames

### 4. CSS Box-Shadow Colors Are Subject-Specific (Not Auto-Inherited)
Two rgba values must be manually updated for each subject (they're not CSS variables):
- `.unit-block.open { box-shadow: 0 4px 16px rgba(R,G,B,0.08) }` — use subject accent color
- `.lang-btn.active { box-shadow: 0 2px 6px rgba(R,G,B,0.3) }` — same color

### 5. Unit Label Format
Always write "Unit 1" through "Unit 9" — **never** "U1", "U2", etc. "U1" feels intimidating to students.

### 6. FIL Mode = Red, Always
`body[data-lang="fil"]` overrides `--active` to red (`#DC2626`) regardless of subject color. Play buttons, lang button, unit number pills, unit borders all switch to red in FIL mode.

### 7. The Worksheet Button Is JS-Injected
Do NOT add worksheet buttons in HTML. The JS reads `data-worksheet` attribute and injects the View + Download buttons automatically. Just add `data-worksheet="filename.pdf"` to the lesson `<a>` tag.

### 8. Git Safety
- Never push `v2-dev` to `origin/main`
- Never use `--no-verify` to skip hooks
- Commit messages should include `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

---

## 🔑 Key Files & Locations

```
numberbender-site/
├── HANDOFF.md                          ← THIS FILE
├── missing-worksheets.md               ← Worksheet gap tracker + repurposable content tracker
├── numberbender_inventory_with_format.csv  ← Full video inventory (1,621 videos)
├── qa_check.py                         ← QA automation script
├── subjects/
│   ├── algebra/index.html              ← ✅ TEMPLATE — copy this for new subjects
│   ├── calculus/index.html             ← ✅ Has Unit 8 nested topic-accordion (special structure)
│   ├── precalculus/index.html          ← ✅ 
│   └── statistics/index.html           ← ✅ Newest — 9 units, 70 lessons
├── worksheets/
│   ├── algebra/                        ← 68 PDFs (flat)
│   ├── calculus/limits/                ← 8 PDFs
│   ├── calculus/derivatives/           ← 55 PDFs
│   ├── calculus/integrals/             ← 28 PDFs
│   ├── precalculus/                    ← 65 PDFs (flat)
│   ├── statistics/                     ← 47 PDFs (flat, Units 1–5 only)
│   ├── geometry/                       ← 39 PDFs (ready to use)
│   ├── trigonometry/                   ← 42 PDFs (ready to use)
│   ├── linear-algebra/                 ← 8 PDFs (ready to use)
│   └── discrete-math/                  ← 9 PDFs (ready to use)
└── images/
    ├── playlist_icons/                 ← Subject icon images (80×80 hero icons)
    └── worksheet_page_artworks/        ← Character artwork for hero (mix-blend-mode:multiply)
```

---

## 🔁 Session Memory Files (Claude's memory — on this machine only)

These files live outside the repo and will NOT transfer to a different computer:
```
/Users/numberbender/.claude/projects/-Users-numberbender/memory/
├── MEMORY.md                           ← Index of memory files
├── project_numberbender_v2.md          ← Same info as this HANDOFF.md but in Claude's memory format
├── user_dr_e.md                        ← Dr. E's profile (community college prof, YouTube creator)
└── feedback_preview_tool_spaces.md     ← Note: don't use preview_start (path-spaces bug)
```

**On a new computer:** Claude won't have these memory files. That's okay — this HANDOFF.md is the complete substitute. Feed Claude this file at the start of a new session and all context is restored.

---

## 📖 How to Resume on a New Computer

1. Clone or copy the repo to the new machine at the same path if possible, OR update paths accordingly
2. `git checkout v2-dev`
3. Start dev server: `python3 -m http.server 3000` from the project root
4. Give Claude (or any AI assistant) this `HANDOFF.md` file at the start of the conversation
5. Tell Claude: *"We're continuing the Numberbender v2.0 build. The next subject to build is Geometry (yellow theme). Read the handoff doc and follow the Subject Page Build Playbook."*
6. Claude should:
   - Run the pre-flight inventory check for Geometry
   - Apply the short-form video filter
   - Map Geometry worksheets (39 PDFs in `worksheets/geometry/`)
   - Copy `subjects/algebra/index.html` as the template
   - Build the page unit by unit

---

## 📞 Project Context (Who is Dr. E)

- Dr. Peter Esperanza — community college math professor in the US
- Bilingual YouTube creator (English + Filipino/Tagalog)
- Channel: Numberbender
- Teaching style: patient, approachable, bilingual — students in both the US and Philippines
- Goal: Every lesson free, every lesson paired with a worksheet, bilingual
- v2.0 is a complete site rebuild — modernized design, better organization, worksheet-first
- Live site: numberbender.com (on `main` branch, Netlify-deployed)
- v2 stays local on `v2-dev` until Dr. E approves full launch

---

*This document was auto-generated from the working session on 2026-05-22.*  
*If you're on a new computer: this file + the repo is everything you need.*
