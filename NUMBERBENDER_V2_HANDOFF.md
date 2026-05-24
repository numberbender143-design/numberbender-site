# Numberbender v2.0 — Claude Code Handoff Prompt

**Project:** Numberbender.com v2.0 website rebuild  
**Owner:** Dr. Peter Esperanza (Dr. E), community college math professor  
**Site Repo:** `/Users/numberbender/Desktop/Numberbender Website 2026/numberbender-site/`  
**Date of handoff:** May 21, 2026  
**Deployment:** Static HTML site on Netlify, git version control already in place

---

## CONTEXT — WHO YOU ARE HELPING

Dr. E runs numberbender.com — a bilingual (English + Filipino) math education site backed by two YouTube channels with 1,621 videos. He is a community college professor who records real classroom lessons.

You are his AI coworker. Keep responses concise and practical. Avoid excessive bullet points. Deliver ready-to-use outputs.

---

## PROJECT OVERVIEW

We are building **Numberbender v2.0** — a major redesign and content expansion. The live site stays untouched during development. All work goes into a `v2-dev` git branch (Netlify auto-generates a preview URL).

### Two-Track Content Model

**Track 1 — Subject Library** (accent color: `--blue: #2563EB`)
- 8 math subjects, 61 units total
- Khan Academy-style lesson lists: subject → units → lesson rows
- Each lesson row has 3 buttons: **Watch / Download / View**
- Language toggle at subject level: EN / FIL (not per-lesson)
- No tile cards — just clean lesson title rows

**Track 2 — Full Courses** (accent color: `--teal: #1F6F6B / #085041`)
- Semester-length classroom recordings (real students, real classroom)
- Starting with: **Elementary Algebra** (14 weeks) + **Intermediate Algebra** (14 weeks)
- Videos uploading in ~2 weeks — pages are shells now
- Future: Statistics and Calculus courses (next year)
- Marketing angle: "Algebra for Future STEM Students — Real classroom, real students, real math"

---

## DESIGN SYSTEM

All pages inherit from `courses.html` (existing file, source of truth for CSS variables):

```css
:root {
  --navy:    #0F172A;
  --blue:    #2563EB;
  --yellow:  #FACC15;
  --cyan:    #06B6D4;
  --teal:    #1F6F6B;
  --teal-light: #E1F5EE;
  --teal-mid:   #5DCAA5;
  --teal-dark:  #085041;
  --bg:      #F8FAFC;
  --surface: #FFFFFF;
  --muted:   #64748B;
  --border:  #E2E8F0;
  --radius:  16px;
  --shadow:  0 10px 30px rgba(15,23,42,0.08);
  --shadow-lg: 0 20px 50px rgba(15,23,42,0.12);
}
```

**Key site-wide elements:**
- Logo image: `images/numberbender-mark-teal-transparent.svg`
- GA tag: `G-P1M2WZD840`
- Nav: sticky, `rgba(255,255,255,0.92)` with `backdrop-filter`
- Favicon paths: `images/exports/numberbender-favicon.svg`, `images/exports/png/favicon-32.png`, `images/exports/png/favicon-180.png`
- Footer: dark navy `#0F172A`, 4-column `.foot-grid` layout

**Course pages hero gradient (teal — for Full Courses track):**
```css
background: linear-gradient(135deg, #085041 0%, #0d5c4f 50%, #1F6F6B 100%);
```

**Path depth for pages under `/learn/[course]/`:**  
`../../` brings you back to site root (e.g., `../../courses.html`, `../../images/...`)

---

## SUBJECT LIBRARY — 8 SUBJECTS + 61 UNITS

```
1. Pre-Algebra (6 units, 30 lessons)
   - Integers & Number Line
   - Fractions & Decimals
   - Ratios, Rates & Proportions
   - Percents
   - Basic Geometry & Measurement
   - Introduction to Algebra

2. Algebra* (10 units, 55 lessons)
   - Linear Equations
   - Inequalities
   - Graphing Linear Equations
   - Systems of Equations
   - Exponents & Polynomials
   - Factoring
   - Rational Expressions
   - Radical Expressions
   - Quadratic Equations
   - Functions & Relations

3. Geometry (7 units, 38 lessons)
   - Points, Lines & Angles
   - Triangles
   - Quadrilaterals & Polygons
   - Circles
   - Area, Surface Area & Volume
   - Transformations
   - Coordinate Geometry

4. Trigonometry* (6 units, 32 lessons)
   - Right Triangle Trig
   - Unit Circle & Radians
   - Trig Functions & Graphs
   - Trig Identities
   - Solving Trig Equations
   - Law of Sines & Cosines

5. Precalculus* (8 units, 42 lessons)
   - Functions & Transformations
   - Polynomial Functions
   - Rational Functions
   - Exponential & Log Functions
   - Solving Exp & Log Equations
   - Sequences & Series
   - Vectors & Parametrics
   - Intro to Limits

6. Calculus (11 units, 60 lessons)
   - Limits & Continuity
   - Derivatives (Definition)
   - Derivative Rules
   - Applications of Derivatives
   - Curve Sketching
   - Optimization & Related Rates
   - Integrals (Antiderivatives)
   - Definite Integrals & FTC
   - Integration Techniques
   - Applications of Integrals
   - AP FRQ Review ← special unit for AP curriculum

7. Statistics (9 units, 48 lessons)
   - Descriptive Statistics
   - Probability
   - Random Variables
   - Sampling Distributions
   - Confidence Intervals
   - Hypothesis Testing
   - Chi-Square Tests
   - Regression & Correlation
   - AP FRQ Review ← special unit for AP curriculum

8. Linear Algebra (4 units, 20 lessons)
   - Vectors & Matrices
   - Systems with Matrices
   - Determinants & Inverses
   - Eigenvalues & Eigenvectors
```

*Subjects marked with * have natural content overlap with Algebra and Calculus. Solution: each lesson lives in ONE subject, with "See also →" cross-links.

---

## FILES ALREADY CREATED

### ✅ DONE — Elementary Algebra Course Page
**File:** `/learn/elementary-algebra/index.html`

Full 14-week course shell page. Complete HTML including:
- Teal-themed hero (distinguishes Courses track from Subject Library blue)
- 14 expandable accordion week blocks
- Each week has one "coming soon" lesson slot with `data-video-id` attribute for future YouTube IDs
- Sidebar: course details card + "Up Next: Intermediate Algebra" card (blue gradient)
- Instructor section (Dr. E bio)
- Full nav + footer (relative paths `../../`)
- `toggleWeek()` JS function; Week 1 opens by default

**Week curriculum:**
- Week 1: Real Numbers & The Number Line
- Week 2: Variables, Expressions & Equations
- Week 3: Solving Linear Equations
- Week 4: Linear Inequalities
- Week 5: Graphing Linear Equations
- Week 6: Slope & Equations of Lines
- Week 7: Systems of Linear Equations
- Week 8: Exponents & Polynomials
- Week 9: Multiplying Polynomials
- Week 10: Factoring: GCF & Trinomials
- Week 11: Factoring: Special Products
- Week 12: Introduction to Rational Expressions
- Week 13: Radical Expressions & Equations
- Week 14: Course Review & What Comes Next (teal highlight, bridge link to Intermediate Algebra)

**Key HTML patterns in this file:**

```html
<!-- Week block pattern -->
<div class="week-block" id="week-N">
  <div class="week-header" onclick="toggleWeek('week-N')">
    <div class="week-num-badge">Week N</div>
    <div class="week-info">
      <div class="week-title">Title Here</div>
      <div class="week-topics">Topics covered here</div>
    </div>
    <div class="week-toggle">▾</div>
  </div>
  <div class="week-lessons">
    <div class="lesson-slot" data-video-id="">
      <div class="slot-play no-video">▶</div>
      <div class="slot-info">
        <div class="slot-title">Week N — Classroom Lesson</div>
        <div class="slot-meta">Title Here · ~60–75 min</div>
      </div>
      <div class="slot-actions">
        <span class="slot-coming">Coming soon</span>
      </div>
    </div>
  </div>
</div>

<!-- JS at bottom of body -->
<script>
function toggleWeek(id) {
  const block = document.getElementById(id);
  block.classList.toggle('open');
}
document.getElementById('week-1').classList.add('open');
</script>
```

### ✅ DONE — Other supporting files
- `Numberbender_Gap_Analysis_May2026.docx` — curriculum gap analysis
- `Numberbender_Duplicate_Review.xlsx` — 45 unclear YouTube duplicates for Dr. E to manually tag
- `numberbender_inventory_with_format.csv` — 1,621 video inventory with format column added

---

## PENDING TASKS (in priority order)

### 🔲 Task 1 — Build Intermediate Algebra course page
**File to create:** `/learn/intermediate-algebra/index.html`

Use the **exact same HTML structure** as `learn/elementary-algebra/index.html` but change:

- `<title>`: "Intermediate Algebra — Full 14-Week Course | Numberbender"
- `<meta name="description">`: "A complete 14-week Intermediate Algebra course taught by Dr. E in an actual college classroom. The bridge to Precalculus and STEM."
- `<link rel="canonical">`: `https://numberbender.com/learn/intermediate-algebra/`
- Hero h1 sub: "The Bridge to Precalculus & STEM"
- Hero h1 main: "Intermediate Algebra"
- Hero lead: "Pick up where Elementary Algebra left off. Dr. E takes you through the topics every STEM student needs — from quadratics to exponential functions — in a real college classroom."
- Course badge: same emoji style
- Breadcrumb: Home › Courses › Intermediate Algebra
- "Up next" sidebar card should point toward Precalculus/subject library (not another course)
- Week 14 bridge text should say: "You've completed both Algebra courses. You're ready for Precalculus, Statistics, or Calculus."

**Week curriculum for Intermediate Algebra:**
- Week 1: Review of Elementary Algebra (linear equations, graphing, factoring recap)
- Week 2: Advanced Factoring (factoring by grouping, sum/difference of cubes)
- Week 3: Rational Expressions — Part 1 (simplifying, multiplying, dividing)
- Week 4: Rational Expressions — Part 2 (adding, subtracting, complex fractions)
- Week 5: Rational Equations & Applications (solving, work/rate problems)
- Week 6: Radical Expressions & Rational Exponents (simplifying, operations, nth roots)
- Week 7: Radical Equations & Complex Numbers (solving, intro to imaginary numbers)
- Week 8: Quadratic Equations — Part 1 (completing the square, quadratic formula)
- Week 9: Quadratic Equations — Part 2 (discriminant, applications, quadratic inequalities)
- Week 10: Functions & Function Notation (domain, range, function operations, composition)
- Week 11: Graphing Quadratic Functions (parabolas, vertex, axis of symmetry)
- Week 12: Exponential Functions (properties, graphing, growth and decay)
- Week 13: Logarithmic Functions (definition, properties, solving log equations)
- Week 14: Course Review & Bridge to STEM (cumulative review, what comes next)

---

### 🔲 Task 2 — Build the Courses Hub page (v2 version)
**File:** Consider creating `/courses-v2.html` or modifying `courses.html` on the v2-dev branch.

This is the **top-level page** that shows both content tracks side by side. It needs:

**Section 1 — Subject Library (blue accent)**
- Intro: "8 subjects, 61 units, 1,300+ lessons"
- 8 subject cards with unit count and lesson count
- Each card links to `/subjects/[subject]/` (pages not built yet)
- Language toggle prominent: EN / FIL

**Section 2 — Full Courses (teal accent)**
- Intro: "Semester-length classroom recordings — real students, real math"
- Card for Elementary Algebra → `/learn/elementary-algebra/`
- Card for Intermediate Algebra → `/learn/intermediate-algebra/`
- Placeholder cards for Statistics (coming 2027) and Calculus (coming 2027)
- Marketing tagline: "Algebra for Future STEM Students"

---

### 🔲 Task 3 — Build first Subject Library page (Algebra as template)
**File to create:** `/subjects/algebra/index.html`

Khan Academy-style layout:
- Left sidebar: subject nav (all 8 subjects as links)
- Main area: units listed with lesson count
- Click unit → expands to show lesson list
- Each lesson row: title + Watch / Download / View buttons
- Language toggle (EN / FIL) at top of page

This page becomes the **template** for all 7 remaining subjects.

---

### 🔲 Task 4 — Add YouTube video IDs (when videos upload in ~2 weeks)
When Dr. E uploads the classroom recordings:
1. Replace `data-video-id=""` with actual YouTube ID (e.g., `data-video-id="dQw4w9WgXcQ"`)
2. Change `class="slot-play no-video"` to `class="slot-play has-video"`
3. Replace `<span class="slot-coming">Coming soon</span>` with actual Watch/Download/View buttons:

```html
<a href="https://youtube.com/watch?v=VIDEO_ID" target="_blank" class="slot-btn primary">▶ Watch</a>
<a href="#" class="slot-btn">↓ Worksheet</a>
```

---

### 🔲 Task 5 — Manual work for Dr. E (not Claude)
- Review `Numberbender_Duplicate_Review.xlsx` and tag 45 unclear duplicates
- Upload 14+14 classroom recording videos to YouTube (ETA: ~2 weeks)
- Note YouTube IDs for Task 4 above

---

## IMPORTANT RULES FOR THIS PROJECT

1. **Do NOT touch the live site.** All changes go on the `v2-dev` git branch only.
2. **Relative paths:** Pages under `/learn/[course]/` use `../../` to reach root.
3. **Courses track = teal.** Subject Library = blue. Never mix them.
4. **No tiles for lessons.** Khan Academy-style flat list only — title + buttons.
5. **Language toggle is at subject level** (not per-lesson). One toggle switches the whole page.
6. **AP FRQ Review** is a dedicated unit in both Calculus (Unit 11) and Statistics (Unit 9).
7. **Content overlap** (Algebra/Precalc/Trig): each lesson lives in ONE subject. Use "See also →" cross-links, never duplicate.
8. **Video slots** use `data-video-id=""` as placeholder attribute. When YouTube IDs are available, populate them.
9. Week 14 of every course page gets special teal highlighting + bridge link to what comes next.
10. All HTML is single-file — CSS and JS inline, no external stylesheets (except fonts via system stack).

---

## SITE STRUCTURE (current + planned)

```
numberbender-site/
├── index.html                    (live homepage)
├── courses.html                  (live courses/subjects page — design system source)
├── math-worksheets.html          (live)
├── about.html                    (live)
├── blog.html                     (live)
├── contact.html                  (live)
├── for-teachers.html             (live)
│
├── learn/                        ← NEW in v2.0
│   ├── elementary-algebra/
│   │   └── index.html            ✅ DONE
│   └── intermediate-algebra/
│       └── index.html            🔲 BUILD NEXT
│
├── subjects/                     ← NEW in v2.0 (not started)
│   ├── algebra/
│   ├── pre-algebra/
│   ├── geometry/
│   ├── trigonometry/
│   ├── precalculus/
│   ├── calculus/
│   ├── statistics/
│   └── linear-algebra/
│
└── images/
    ├── numberbender-mark-teal-transparent.svg
    └── exports/
        ├── numberbender-favicon.svg
        └── png/
            ├── favicon-32.png
            └── favicon-180.png
```

---

## HOW TO START ON A NEW COMPUTER

1. Open terminal and navigate to the site folder:
   ```
   cd "/Users/numberbender/Desktop/Numberbender Website 2026/numberbender-site"
   ```

2. Confirm git status and branch:
   ```
   git status
   git branch
   ```
   You should be on (or switch to) `v2-dev`:
   ```
   git checkout v2-dev
   ```
   If the branch doesn't exist yet:
   ```
   git checkout -b v2-dev
   ```

3. Start with **Task 1** — build `/learn/intermediate-algebra/index.html` using the Elementary Algebra page as the exact template. The full source of that file is at `learn/elementary-algebra/index.html` — read it first before building.

4. After each file is built, commit:
   ```
   git add .
   git commit -m "Add intermediate algebra course shell"
   git push origin v2-dev
   ```
   Netlify will auto-deploy a preview URL for the v2-dev branch.

---

## QUICK REFERENCE — Dr. E's Info

- **Full name:** Dr. Peter Esperanza  
- **Title:** Community College Math Professor · Founder of Numberbender  
- **YouTube:** `https://www.youtube.com/@numberbender`  
- **Email:** barstow.statistics.teacher@gmail.com  
- **Tone for the site:** Confident, clear, STEM-forward, globally accessible  
- **Target audience:** College students, reluctant STEM students, international learners, teachers  

---

*Handoff created: May 21, 2026 — Numberbender v2.0 build session*
