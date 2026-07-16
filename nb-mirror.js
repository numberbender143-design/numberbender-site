/* ── Numberbender Subscriber Mirror ──────────────────────────────────────────
   Copies every newsletter signup to the "Numberbender Subscribers (Mirror)"
   Google Form, which feeds the linked Google Sheet. Mailchimp remains the
   primary list — this is a passive backup copy for analysis. Added 2026-07-16.
   Covers: (1) footer/newsletter forms and per-worksheet "updates" forms that
   POST directly to Mailchimp (list-manage.com), and (2) the sticky-bar signup
   that subscribes via a JSONP script tag. */
(function () {
  var GF = 'https://docs.google.com/forms/d/e/1FAIpQLSevWoE-eOyzGoFHbcoLES-ZRtDfpMk-kf1do-MYEP0c4UBx1g/formResponse';

  function mirror(email, fname, source) {
    try {
      if (!email || email.indexOf('@') === -1) return;
      var p = new URLSearchParams();
      p.append('emailAddress', email.trim());
      if (fname) p.append('entry.1335804475', fname.trim()); // First Name
      p.append('entry.446818990', source || 'unknown');      // Signup Source
      p.append('entry.1769552890', location.pathname);       // Page
      p.append('fvv', '1');
      p.append('pageHistory', '0');
      fetch(GF, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: p.toString()
      });
    } catch (e) { /* mirroring must never break a signup */ }
  }

  // 1) Direct form posts to Mailchimp (footer forms, worksheet-updates forms)
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.action || String(f.action).indexOf('list-manage.com') === -1) return;
    var emailEl = f.querySelector('input[name="EMAIL"], input[type="email"]');
    var fnameEl = f.querySelector('input[name="FNAME"]');
    mirror(emailEl && emailEl.value, fnameEl && fnameEl.value, f.getAttribute('name') || 'mailchimp-form');
  }, true);

  // 2) Sticky-bar signups (JSONP script tag pointing at list-manage post-json)
  var mo = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var nodes = muts[i].addedNodes;
      for (var j = 0; j < nodes.length; j++) {
        var n = nodes[j];
        if (n.tagName === 'SCRIPT' && n.src && n.src.indexOf('list-manage.com/subscribe/post-json') !== -1) {
          try {
            var u = new URL(n.src);
            mirror(u.searchParams.get('EMAIL'), u.searchParams.get('FNAME'), 'sticky-bar');
          } catch (e) {}
        }
      }
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
