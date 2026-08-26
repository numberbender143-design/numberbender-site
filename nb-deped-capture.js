/* ─────────────────────────────────────────────────────────────
   nb-deped-capture.js
   Handles every .nbdc block in the DepEd section.

   Progressive enhancement: the markup is a real Mailchimp <form>
   with a POST action, so it still subscribes people with JS off.
   This file upgrades it to an inline, no-redirect submit.

   Fields sent (all already exist in the audience except GRADE):
     EMAIL, FNAME, ROLE, COUNTRY, GRADE
   GRADE is read from the block's data-grade attribute. If you have
   not created that audience field yet, Mailchimp ignores it — the
   signup still works. Add it under
     Audience → Settings → Audience fields and *|MERGE|* tags
   with the merge tag GRADE to start segmenting by grade level.
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var MC_BASE = 'https://numberbender.us17.list-manage.com/subscribe/post-json';
  var MC_U    = '65e30fe527dde6fb604f6760a';
  var MC_ID   = 'ad0977e0cc';
  var MC_FID  = '003758e0f0';
  var HONEY   = 'b_' + MC_U + '_' + MC_ID;
  var LS_KEY  = 'nb_deped_subscribed';
  var cbSeq   = 0;

  function t(el, en, fil) {
    // Respect the page's i18n contract: .i18n elements carry both languages
    // and applyLang() swaps textContent. Mirror that here.
    // If the element wraps a .i18n span (buttons do), write to the span —
    // writing to the parent would delete it.
    var target = el.querySelector ? (el.querySelector('.i18n') || el) : el;
    if (target.classList) target.classList.add('i18n');
    target.setAttribute('data-en', en);
    target.setAttribute('data-fil', fil);
    target.textContent =
      document.documentElement.getAttribute('data-lang') === 'fil' ? fil : en;
  }

  function valid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function track(action, grade) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: 'deped_capture',
        event_label: grade || 'unknown'
      });
    }
  }

  function jsonp(params, done) {
    var name = 'nbdcCb' + (++cbSeq) + '_' + Date.now();
    var s = document.createElement('script');
    var timer = setTimeout(function () { cleanup(); done(); }, 8000);

    function cleanup() {
      clearTimeout(timer);
      try { delete window[name]; } catch (e) { window[name] = undefined; }
      if (s.parentNode) s.parentNode.removeChild(s);
    }

    window[name] = function (res) { cleanup(); done(res); };

    var qs = [];
    for (var k in params) {
      if (Object.prototype.hasOwnProperty.call(params, k) && params[k] !== '') {
        qs.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
      }
    }
    qs.push('u=' + MC_U, 'id=' + MC_ID, 'f_id=' + MC_FID, HONEY + '=', 'c=' + name);

    s.src = MC_BASE + '?' + qs.join('&');
    s.onerror = function () { cleanup(); done(); };
    document.body.appendChild(s);
  }

  function init(block) {
    if (block.getAttribute('data-nbdc-ready') === '1') return;
    block.setAttribute('data-nbdc-ready', '1');

    var grade  = block.getAttribute('data-grade') || '';
    var state  = block.getAttribute('data-state') || 'SOON';
    var form   = block.querySelector('.nbdc-form');
    var email  = block.querySelector('.nbdc-email');
    var fname  = block.querySelector('.nbdc-fname');
    var roleIn = block.querySelector('.nbdc-role-value');
    var btn    = block.querySelector('.nbdc-btn');
    var err    = block.querySelector('.nbdc-err');
    var roles  = block.querySelectorAll('.nbdc-role');

    if (!form || !email || !btn) return;

    // The markup keeps type="email" + required so the no-JS POST fallback still
    // gets browser validation. Now that JS is here, take validation over so the
    // message is ours — inline, bilingual — instead of a native English bubble.
    form.noValidate = true;

    // Someone who already signed up should not be nagged on every page.
    try {
      if (window.localStorage && localStorage.getItem(LS_KEY)) {
        block.classList.add('is-done');
        var h = block.querySelector('.nbdc-done-h');
        var p = block.querySelector('.nbdc-done-p');
        if (h) t(h, 'You are already on the list.', 'Nasa listahan ka na.');
        if (p) {
          if (state === 'READY') {
            t(p, 'Grab the files below any time — they stay free. Need the answer key again? Email dr.e@numberbender.com.',
                 'Kunin ang mga file sa ibaba anumang oras — libre pa rin. Kailangan ng answer key muli? I-email si dr.e@numberbender.com.');
          } else {
            t(p, 'Your kit lands in your inbox the day it is done. Nothing else to do here.',
                 'Darating ang kit mo sa inbox sa araw na matapos ito. Wala nang kailangang gawin.');
          }
        }
        return;
      }
    } catch (e) { /* private mode — just show the form */ }

    for (var i = 0; i < roles.length; i++) {
      roles[i].addEventListener('click', function () {
        for (var j = 0; j < roles.length; j++) {
          roles[j].setAttribute('aria-pressed', 'false');
        }
        this.setAttribute('aria-pressed', 'true');
        if (roleIn) roleIn.value = this.getAttribute('data-role') || '';
      });
    }

    email.addEventListener('input', function () {
      email.removeAttribute('aria-invalid');
      if (err) err.textContent = '';
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var addr = (email.value || '').trim();
      if (!valid(addr)) {
        email.setAttribute('aria-invalid', 'true');
        if (err) t(err, 'That email does not look right — check it and try again.',
                        'Mukhang mali ang email — tingnan muli at subukan ulit.');
        email.focus();
        return;
      }

      var label = btn.querySelector('.i18n') || btn;
      var origEn  = label.getAttribute('data-en')  || label.textContent;
      var origFil = label.getAttribute('data-fil') || label.textContent;
      btn.disabled = true;
      t(btn, 'Sending…', 'Ipinapadala…');
      if (err) err.textContent = '';

      track('capture_submit', grade);

      jsonp({
        EMAIL:   addr,
        FNAME:   fname ? (fname.value || '').trim() : '',
        ROLE:    roleIn ? roleIn.value : '',
        COUNTRY: 'Philippines',
        GRADE:   grade
      }, function (res) {
        // Mailchimp returns result:'error' for an already-subscribed address.
        // For the teacher on the other end that is still a success, so we
        // never show them a failure they cannot act on.
        var already = res && res.msg && /already subscribed/i.test(res.msg);
        var hardFail = res && res.result === 'error' && !already;

        if (hardFail) {
          btn.disabled = false;
          t(btn, origEn, origFil);
          if (err) t(err, 'That did not go through. Try again, or email dr.e@numberbender.com and I will add you myself.',
                          'Hindi natuloy. Subukan ulit, o i-email si dr.e@numberbender.com at ako na ang magdadagdag sa iyo.');
          track('capture_error', grade);
          return;
        }

        try {
          if (window.localStorage) localStorage.setItem(LS_KEY, String(Date.now()));
        } catch (e) { /* ignore */ }

        block.classList.add('is-done');
        track(already ? 'capture_duplicate' : 'capture_success', grade);

        // Mailchimp sends nothing for an address that is already subscribed, so
        // do not let the copy imply a fresh email is on the way.
        if (already) {
          var dp = block.querySelector('.nbdc-done-p');
          if (dp) {
            if (state === 'READY') {
              t(dp, 'You were already on the list, so no new email went out. The files are below — and email dr.e@numberbender.com if you need the answer key again.',
                    'Nasa listahan ka na, kaya walang bagong email na ipinadala. Nasa ibaba ang mga file — i-email si dr.e@numberbender.com kung kailangan mo muli ang answer key.');
            } else {
              t(dp, 'You were already on the list, so no new email went out. Your kit still lands in your inbox the day it is done.',
                    'Nasa listahan ka na, kaya walang bagong email na ipinadala. Darating pa rin ang kit mo sa araw na matapos ito.');
            }
          }
        }

        var liveH = block.querySelector('.nbdc-done-h');
        if (liveH) liveH.focus();
      });
    });
  }

  function boot() {
    var blocks = document.querySelectorAll('.nbdc');
    for (var i = 0; i < blocks.length; i++) init(blocks[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
