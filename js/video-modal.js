(function () {
  'use strict';

  /* ── Inject modal HTML + CSS once ─────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '#nb-modal-overlay{',
      'display:none;position:fixed;inset:0;z-index:9999;',
      'background:rgba(10,15,28,.88);',
      'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);',
      'align-items:center;justify-content:center;padding:20px;',
    '}',
    '#nb-modal-overlay.open{display:flex;}',
    '#nb-modal-box{',
      'position:relative;width:100%;max-width:880px;',
      'background:#000;border-radius:16px;overflow:hidden;',
      'box-shadow:0 32px 80px rgba(0,0,0,.7);',
      'animation:nb-pop .18s cubic-bezier(.22,1,.36,1);',
    '}',
    '@keyframes nb-pop{from{transform:scale(.94);opacity:0}to{transform:scale(1);opacity:1}}',
    '#nb-modal-box .nb-ratio{position:relative;padding-top:56.25%;}',
    '#nb-modal-box iframe{',
      'position:absolute;top:0;left:0;width:100%;height:100%;border:0;display:block;',
    '}',
    '#nb-modal-bar{',
      'display:flex;align-items:center;justify-content:space-between;',
      'padding:12px 16px;background:#0f172a;gap:12px;',
    '}',
    '#nb-modal-title{',
      'color:#e2e8f0;font-size:.9rem;font-weight:600;',
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;',
    '}',
    '#nb-modal-yt{',
      'display:inline-flex;align-items:center;gap:6px;',
      'font-size:.8rem;font-weight:700;color:#fff;',
      'background:#ff0000;border:none;border-radius:6px;',
      'padding:5px 11px;cursor:pointer;text-decoration:none;white-space:nowrap;flex-shrink:0;',
      'transition:background .15s;',
    '}',
    '#nb-modal-yt:hover{background:#cc0000;}',
    '#nb-modal-yt svg{flex-shrink:0;}',
    '#nb-modal-close{',
      'background:rgba(255,255,255,.1);border:none;border-radius:8px;',
      'color:#94a3b8;cursor:pointer;',
      'width:34px;height:34px;display:grid;place-items:center;flex-shrink:0;',
      'transition:background .15s,color .15s;font-size:1.1rem;line-height:1;',
    '}',
    '#nb-modal-close:hover{background:rgba(255,255,255,.2);color:#fff;}',
    '@media(max-width:600px){',
      '#nb-modal-title{font-size:.78rem;}',
      '#nb-modal-bar{padding:10px 12px;}',
    '}'
  ].join('');
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'nb-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Video player');
  overlay.innerHTML = [
    '<div id="nb-modal-box">',
      '<div class="nb-ratio"><iframe id="nb-modal-iframe" allowfullscreen',
        ' allow="autoplay; encrypted-media; picture-in-picture"',
        ' title="Video lesson"></iframe></div>',
      '<div id="nb-modal-bar">',
        '<span id="nb-modal-title"></span>',
        '<a id="nb-modal-yt" href="#" target="_blank" rel="noopener" aria-label="Watch on YouTube">',
          '<svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">',
            '<path d="M15.67.91A2 2 0 0 0 14.26.5C12.97.14 8 .14 8 .14s-4.97',
            ' 0-6.26.36A2 2 0 0 0 .33.91C0 2.19 0 4.86 0 4.86s0 2.67.33 3.95a2',
            ' 2 0 0 0 1.41 1.41C2.97 10.5 8 10.5 8 10.5s4.97 0 6.26-.28a2 2 0 0',
            ' 0 1.41-1.41C16 7.53 16 4.86 16 4.86S16 2.19 15.67.91zM6.4 7.07V2.64l4.18 2.22L6.4 7.07z"/>',
          '</svg>',
          'YouTube',
        '</a>',
        '<button id="nb-modal-close" aria-label="Close video">✕</button>',
      '</div>',
    '</div>'
  ].join('');
  document.body.appendChild(overlay);

  var iframe   = document.getElementById('nb-modal-iframe');
  var titleEl  = document.getElementById('nb-modal-title');
  var ytLink   = document.getElementById('nb-modal-yt');
  var closeBtn = document.getElementById('nb-modal-close');

  /* ── Helpers ───────────────────────────────────────────────────── */
  function getVideoId(url) {
    try {
      var u = new URL(url);
      /* watch?v=ID */
      if (u.searchParams.get('v')) return u.searchParams.get('v');
      /* youtu.be/ID */
      if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
    } catch (e) {}
    return null;
  }

  function cleanTitle(ariaLabel) {
    /* "Watch Algebra Intro video lesson on YouTube" → "Algebra Intro" */
    return (ariaLabel || '')
      .replace(/^Watch\s+/i, '')
      .replace(/\s+video\s+lesson\s+on\s+YouTube\s*$/i, '')
      .replace(/\s+on\s+YouTube\s*$/i, '')
      .trim();
  }

  function openModal(videoId, label, originalHref) {
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
    titleEl.textContent = label || 'Video Lesson';
    ytLink.href = originalHref;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    iframe.src = '';          /* stop video immediately */
    document.body.style.overflow = '';
  }

  /* ── Event listeners ───────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action="watch"]');
    if (!btn) return;

    var href = btn.getAttribute('href') || '';
    var videoId = getVideoId(href);

    /* Playlist links or missing video IDs fall through to YouTube normally */
    if (!videoId) return;

    e.preventDefault();
    var label = cleanTitle(btn.getAttribute('aria-label') || btn.textContent);
    openModal(videoId, label, href);
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

})();
