/*!
 * nb-search.js — Numberbender Global Nav Search
 * Self-installs into any page that has #navlinks.
 * Searches worksheet-index.json (480 worksheets) + a hardcoded course list.
 * Keyboard: ArrowUp/Down navigate results, Enter selects, Escape closes.
 */
(function () {
  'use strict';

  var NAV_ID = 'navlinks';
  var INDEX_URL = '/worksheet-index.json';
  var SEARCH_PAGE = '/math-worksheets';

  // ── Hardcoded course list ────────────────────────────────────────────────────
  var COURSES = [
    { name: 'Introduction to Statistics', code: 'C-ID MATH 110', url: '/math110-course', keywords: 'statistics stat' },
    { name: 'Survey of Calculus (Non-STEM)', code: 'C-ID MATH 120', url: '/math120-course', keywords: 'business calculus survey' },
    { name: 'College Algebra / Liberal Arts', code: 'C-ID MATH 130', url: '/math130-course', keywords: 'liberal arts college algebra' },
    { name: 'Business Calculus', code: 'C-ID MATH 140', url: '/math140-course', keywords: 'business applied calculus' },
    { name: 'College Algebra for STEM', code: 'C-ID MATH 150', url: '/math150-course', keywords: 'college algebra stem' },
    { name: 'College Algebra for STEM (alt)', code: 'C-ID MATH 151', url: '/math151-course', keywords: 'college algebra stem' },
    { name: 'Precalculus', code: 'C-ID MATH 155', url: '/math155-course', keywords: 'precalc trig' },
    { name: 'Discrete Mathematics', code: 'C-ID MATH 160', url: '/math160-course', keywords: 'discrete logic sets' },
    { name: 'Calculus I', code: 'C-ID MATH 210', url: '/math210-course', keywords: 'calc1 limits derivatives integrals' },
    { name: 'Calculus II', code: 'C-ID MATH 220', url: '/math220-course', keywords: 'calc2 integration series' },
    { name: 'Multivariable Calculus', code: 'C-ID MATH 230', url: '/math230-course', keywords: 'calc3 multivariable partial' },
    { name: 'Differential Equations', code: 'C-ID MATH 240', url: '/math240-course', keywords: 'ode differential equations' },
    { name: 'Linear Algebra', code: 'C-ID MATH 250', url: '/math250-course', keywords: 'matrices vectors linear' },
    { name: 'Math for Elementary Teachers', code: 'MATHTEACH', url: '/mathteach-course', keywords: 'elementary teachers k8' },
    { name: 'Pre-Algebra', code: 'Developmental', url: '/prealgebra-course', keywords: 'prealgebra arithmetic' },
    { name: 'Elementary Algebra', code: 'Developmental', url: '/elementary-algebra-course', keywords: 'elementary algebra basic' },
    { name: 'Intermediate Algebra', code: 'Developmental', url: '/intermediate-algebra-course', keywords: 'intermediate algebra' },
    { name: 'AB 1705 / AB 705 Corequisite Support', code: 'CCC', url: '/ab1705-corequisite-math', keywords: 'ab705 ab1705 corequisite just-in-time' },
    { name: 'CCC Math Atlas', code: 'CCC', url: '/ccc-atlas', keywords: 'california community college atlas cid' },
  ];

  // ── CSS (injected once) ───────────────────────────────────────────────────────
  var CSS = [
    '.nb-sw{position:relative;display:flex;align-items:center;}',
    '.nb-si{display:flex;align-items:center;background:rgba(15,23,42,.06);border:1.5px solid transparent;',
    '  border-radius:10px;padding:6px 10px;gap:7px;transition:border-color .2s,background .2s;cursor:text;}',
    '.nb-si:focus-within{background:#fff;border-color:var(--blue,#2563eb);',
    '  box-shadow:0 0 0 3px rgba(37,99,235,.12);}',
    '.nb-si svg{flex:none;color:#64748b;transition:color .2s;}',
    '.nb-si:focus-within svg{color:var(--blue,#2563eb);}',
    '.nb-sin{border:none;background:transparent;font:inherit;font-size:.88rem;',
    '  color:#0f172a;width:140px;outline:none;padding:0;}',
    '.nb-sin::placeholder{color:#94a3b8;}',
    '.nb-sx{display:none;background:none;border:none;cursor:pointer;',
    '  font-size:.75rem;color:#94a3b8;padding:2px;line-height:1;}',
    '.nb-sx:hover{color:#0f172a;}',
    '.nb-sx.vis{display:block;}',
    '.nb-drop{position:absolute;top:calc(100% + 10px);right:0;min-width:340px;max-width:420px;',
    '  background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;',
    '  box-shadow:0 16px 48px rgba(15,23,42,.13);z-index:9999;',
    '  overflow:hidden;display:none;}',
    '.nb-drop.open{display:block;}',
    '.nb-drp{padding:6px;}',
    '.nb-dh{font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;',
    '  color:#94a3b8;padding:8px 10px 4px;}',
    '.nb-dr{display:flex;flex-direction:column;padding:8px 10px;border-radius:8px;',
    '  text-decoration:none;color:#0f172a;gap:1px;cursor:pointer;transition:background .12s;}',
    '.nb-dr:hover,.nb-dr.sel{background:#eff6ff;text-decoration:none;}',
    '.nb-drt{font-size:.88rem;font-weight:600;color:#0f172a;}',
    '.nb-drs{font-size:.78rem;color:#64748b;}',
    '.nb-df{border-top:1px solid #e2e8f0;padding:10px 14px;display:flex;align-items:center;',
    '  justify-content:space-between;}',
    '.nb-dfa{font-size:.82rem;color:var(--blue,#2563eb);font-weight:600;',
    '  text-decoration:none;display:flex;align-items:center;gap:4px;}',
    '.nb-dfa:hover{text-decoration:underline;}',
    '.nb-dfe{font-size:.78rem;color:#94a3b8;}',
    '.nb-dem{padding:20px 14px;text-align:center;color:#94a3b8;font-size:.85rem;}',
    '@media(max-width:700px){',
    '  .nb-sw{display:none;}',
    '  .nb-sw.mob-open{display:flex;position:fixed;top:0;left:0;right:0;z-index:200;',
    '    background:#fff;padding:12px 16px;border-bottom:1px solid #e2e8f0;}',
    '  .nb-sw.mob-open .nb-si{flex:1;}',
    '  .nb-sw.mob-open .nb-sin{width:100%;}',
    '  .nb-mob-btn{display:flex!important;background:none;border:none;cursor:pointer;',
    '    color:#0f172a;padding:4px;}',
    '}',
    '@media(min-width:701px){.nb-mob-btn{display:none!important;}}',
  ].join('');

  // ── State ─────────────────────────────────────────────────────────────────────
  var wsData = null;
  var fetchPending = false;
  var selIdx = -1;

  // ── Boot ──────────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById(NAV_ID);
    if (!nav) return;

    // Inject CSS
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Build search widget HTML
    var wrap = document.createElement('div');
    wrap.className = 'nb-sw';
    wrap.setAttribute('role', 'search');
    wrap.innerHTML =
      '<div class="nb-si">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '<input class="nb-sin" type="search" placeholder="Try &quot;chain rule&quot; or &quot;algebra&quot;…" autocomplete="off" spellcheck="false" aria-label="Search worksheets and courses" aria-autocomplete="list" aria-controls="nb-drop">' +
        '<button class="nb-sx" aria-label="Clear search">✕</button>' +
      '</div>' +
      '<div class="nb-drop" id="nb-drop" role="listbox" aria-label="Search results"></div>';

    // Insert before the .nav-cta (Contact) button
    var cta = nav.querySelector('.nav-cta');
    if (cta) {
      nav.insertBefore(wrap, cta);
    } else {
      nav.appendChild(wrap);
    }

    // Mobile search button (injected into nav before the wrap)
    var mobBtn = document.createElement('button');
    mobBtn.className = 'nb-mob-btn';
    mobBtn.setAttribute('aria-label', 'Open search');
    mobBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
    nav.insertBefore(mobBtn, wrap);

    var input = wrap.querySelector('.nb-sin');
    var clearBtn = wrap.querySelector('.nb-sx');
    var drop = wrap.querySelector('.nb-drop');

    mobBtn.addEventListener('click', function () {
      wrap.classList.toggle('mob-open');
      if (wrap.classList.contains('mob-open')) input.focus();
    });

    // ── Input handling ───────────────────────────────────────────────────────
    input.addEventListener('input', function () {
      var q = input.value.trim();
      clearBtn.classList.toggle('vis', q.length > 0);
      if (!q) { close(); return; }
      if (!wsData && !fetchPending) loadIndex();
      render(q);
    });

    input.addEventListener('focus', function () {
      if (input.value.trim()) render(input.value.trim());
    });

    clearBtn.addEventListener('click', function () {
      input.value = '';
      clearBtn.classList.remove('vis');
      close();
      input.focus();
    });

    // ── Keyboard navigation ──────────────────────────────────────────────────
    input.addEventListener('keydown', function (e) {
      var items = drop.querySelectorAll('.nb-dr');
      if (e.key === 'Escape') { close(); input.blur(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selIdx = Math.min(selIdx + 1, items.length - 1);
        highlight(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selIdx = Math.max(selIdx - 1, -1);
        highlight(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selIdx >= 0 && items[selIdx]) {
          items[selIdx].click();
        } else {
          var q = input.value.trim();
          if (q) window.location.href = SEARCH_PAGE + '?q=' + encodeURIComponent(q);
        }
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target) && !mobBtn.contains(e.target)) close();
    });

    // ── Helpers ──────────────────────────────────────────────────────────────
    function close() {
      drop.classList.remove('open');
      selIdx = -1;
    }

    function highlight(items) {
      items.forEach(function (el, i) {
        el.classList.toggle('sel', i === selIdx);
      });
    }

    function loadIndex() {
      fetchPending = true;
      fetch(INDEX_URL)
        .then(function (r) { return r.json(); })
        .then(function (data) { wsData = data; fetchPending = false; render(input.value.trim()); })
        .catch(function () { fetchPending = false; });
    }

    function search(q) {
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);

      // Worksheets
      var wsHits = [];
      if (wsData) {
        wsHits = wsData.filter(function (w) {
          var hay = (w.title + ' ' + w.topic + ' ' + w.subject + ' ' + (w.lesson || '')).toLowerCase();
          return terms.every(function (t) { return hay.indexOf(t) !== -1; });
        }).slice(0, 5);
      }

      // Courses
      var cHits = COURSES.filter(function (c) {
        var hay = (c.name + ' ' + c.code + ' ' + c.keywords).toLowerCase();
        return terms.every(function (t) { return hay.indexOf(t) !== -1; });
      }).slice(0, 3);

      return { ws: wsHits, courses: cHits };
    }

    function render(q) {
      var res = search(q);
      selIdx = -1;

      if (res.ws.length === 0 && res.courses.length === 0) {
        if (!wsData && fetchPending) {
          drop.innerHTML = '<div class="nb-drp"><div class="nb-dem">Loading…</div></div>';
        } else {
          drop.innerHTML =
            '<div class="nb-drp"><div class="nb-dem">No results for "<strong>' + esc(q) + '</strong>"</div></div>' +
            '<div class="nb-df"><a class="nb-dfa" href="' + SEARCH_PAGE + '?q=' + encodeURIComponent(q) + '">Browse all worksheets →</a></div>';
        }
        drop.classList.add('open');
        return;
      }

      var html = '<div class="nb-drp">';

      if (res.courses.length) {
        html += '<div class="nb-dh">Courses</div>';
        res.courses.forEach(function (c) {
          html += '<a class="nb-dr" href="' + c.url + '">' +
            '<span class="nb-drt">' + esc(c.name) + '</span>' +
            '<span class="nb-drs">' + esc(c.code) + '</span>' +
            '</a>';
        });
      }

      if (res.ws.length) {
        html += '<div class="nb-dh">Worksheets</div>';
        res.ws.forEach(function (w) {
          var url = w.pageUrl || SEARCH_PAGE;
          html += '<a class="nb-dr" href="' + url + '">' +
            '<span class="nb-drt">' + esc(w.title) + '</span>' +
            '<span class="nb-drs">' + esc(w.subject) + (w.topic ? ' · ' + esc(w.topic) : '') + '</span>' +
            '</a>';
        });
      }

      html += '</div>';
      html += '<div class="nb-df">' +
        '<a class="nb-dfa" href="' + SEARCH_PAGE + '?q=' + encodeURIComponent(q) + '">See all worksheet results →</a>' +
        '<span class="nb-dfe">' + (res.ws.length + res.courses.length) + ' shown</span>' +
        '</div>';

      drop.innerHTML = html;
      drop.classList.add('open');
    }

    function esc(s) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
  });
})();
