/* ============================================================================
   nb-events.js  —  GA4 key events (Google Ad Grant conversions + funder reports)
   ----------------------------------------------------------------------------
   Loaded on every page right after the gtag.js snippet. One delegated click
   listener covers the whole site:
     worksheet_download  click on a worksheet file (.pdf / .docx / .xlsx),
                         whether it opens in the viewer or downloads
                         params: worksheet_name, subject, grade, method
     youtube_click       click on a link to youtube.com / youtu.be
                         params: video_id, page_path, link_url
   contact_submit is fired by contact.html's own submit handlers, only after
   the form POST succeeds, through window.nbEvent().

   GA4 Enhanced Measurement may also log file_download / click for the same
   clicks. Mark only these custom events as key events so nothing is counted
   twice.

   On any host other than numberbender.com (Netlify deploy previews, local
   preview) events carry debug_mode, so they show up in GA4 DebugView.
   ============================================================================ */
(function () {
  "use strict";

  var DEBUG = location.hostname !== "numberbender.com";
  var FILE_RE = /\.(pdf|docx|xlsx)$/i;
  var YT_RE = /(^|\.)(youtube\.com|youtu\.be|youtube-nocookie\.com)$/i;

  // Send a GA4 event. If `done` is given it runs once the hit is sent (or
  // after a short timeout), so callers can navigate away safely.
  function send(name, params, done) {
    var called = false;
    var finish = function () { if (!called) { called = true; if (done) done(); } };
    if (typeof window.gtag !== "function") { finish(); return; }
    for (var k in params) if (params[k] === undefined) delete params[k];
    if (DEBUG) params.debug_mode = true;
    if (done) {
      params.event_callback = finish;
      params.event_timeout = 1500;
      setTimeout(finish, 2000);
    }
    window.gtag("event", name, params);
  }
  window.nbEvent = send;

  function gradeOf(path) {
    var m = path.match(/grade-?(\d{1,2})(?!\d)/i);
    if (m) return m[1];
    if (/^\/deped\/(teachers\/)?shs\//.test(path)) return "SHS";
  }

  function subjectOf(path) {
    var m = path.match(/^\/(?:worksheets|subjects|courses|deped\/(?:teachers\/)?shs)\/([^\/]+)/);
    if (m) return m[1];
    if (/^\/deped\//.test(path)) return "deped";
  }

  function videoIdOf(u) {
    if (/youtu\.be$/i.test(u.hostname)) return u.pathname.split("/")[1] || undefined;
    var v = u.searchParams.get("v");
    if (v) return v;
    var m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{6,})/);
    if (m) return m[1];
  }

  function onClick(e) {
    if (e.type === "auxclick" && e.button !== 1) return;   // middle-click only
    var a = e.target && e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var u;
    try { u = new URL(a.getAttribute("href"), location.href); } catch (_) { return; }

    if (YT_RE.test(u.hostname)) {
      send("youtube_click", {
        video_id: videoIdOf(u) || "(none)",
        page_path: location.pathname,
        link_url: u.href
      });
      return;
    }

    // Same-site worksheet files only. Root-level PDFs (/flipped-classroom-
    // starter-kit.pdf, /tilysi-*.pdf) are teacher guides, not worksheets.
    if (u.origin !== location.origin || !FILE_RE.test(u.pathname)) return;
    if (u.pathname.lastIndexOf("/") === 0) return;
    var file = decodeURIComponent(u.pathname.split("/").pop());
    send("worksheet_download", {
      worksheet_name: file.replace(FILE_RE, ""),
      subject: subjectOf(u.pathname) || subjectOf(location.pathname),
      grade: gradeOf(u.pathname) || gradeOf(location.pathname),
      method: a.hasAttribute("download") ? "download" : "open"
    });
  }

  document.addEventListener("click", onClick, true);
  document.addEventListener("auxclick", onClick, true);
})();
