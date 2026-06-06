/* ============================================================================
   nb-analytics.js  —  Numberbender opt-in usage analytics + consent layer
   ----------------------------------------------------------------------------
   PRIVACY-FIRST BY DESIGN:
     • Ships DORMANT. Nothing happens until you set NB_ENDPOINT (or NB_DEBUG).
     • No data is ever collected until a visitor explicitly clicks "Allow".
     • No cookies. No personal information. No third-party trackers.
     • Identifier is a random, anonymous string stored only in the visitor's
       browser (localStorage) — created ONLY after consent, never sent elsewhere
       to be linked to a real identity.
     • Visitors can change their choice at any time (Privacy link in the footer).

   HOW TO ACTIVATE (when your IRB approval + collector are ready):
     1. Set NB_ENDPOINT below to your HTTPS collector URL (receives POST JSON).
     2. Deploy. That's it — the consent banner and tracking turn on.
   To preview the consent UX locally without a collector, set NB_DEBUG = true
   (events print to the browser console; nothing leaves the browser).
   ============================================================================ */
(function () {
  "use strict";

  /* ---- CONFIG (edit these two lines to activate) ------------------------- */
  var NB_ENDPOINT = "";      // e.g. "https://data.numberbender.com/collect"  (empty = dormant)
  var NB_DEBUG    = false;   // true = show banner + console-log events locally, send nothing
  /* ----------------------------------------------------------------------- */

  var VER        = "1.0";
  var CONSENT_KEY = "nb_consent";   // "granted" | "denied"
  var ID_KEY      = "nb_aid";       // anonymous id (created only after consent)

  // No-op global so pages can call nbTrack() safely even when dormant.
  window.nbTrack = function () {};

  var ACTIVE = !!(NB_ENDPOINT || NB_DEBUG);
  if (!ACTIVE) return;  // dormant: site behaves exactly as before

  function ls(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); }
    catch (e) { return null; }
  }
  function rm(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function consent() { return ls(CONSENT_KEY); }
  function anonId() {
    var id = ls(ID_KEY);
    if (!id) { id = "a" + Math.random().toString(36).slice(2) + Date.now().toString(36); ls(ID_KEY, id); }
    return id;
  }

  function send(ev, props) {
    if (consent() !== "granted") return;                 // hard consent gate
    var payload = {
      v: VER, ev: ev, t: Date.now(),
      path: location.pathname, title: document.title,
      aid: anonId(), props: props || {}
    };
    if (NB_DEBUG) { try { console.log("[nb-analytics]", ev, payload.props); } catch (e) {} }
    if (!NB_ENDPOINT) return;                             // no destination -> nothing leaves the browser
    try {
      var body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(NB_ENDPOINT, new Blob([body], { type: "application/json" }));
      } else {
        fetch(NB_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" },
          body: body, keepalive: true, mode: "no-cors" });
      }
    } catch (e) {}
  }
  window.nbTrack = send;

  /* ---- consent banner --------------------------------------------------- */
  function showBanner() {
    if (document.getElementById("nb-consent")) return;
    var b = document.createElement("div");
    b.id = "nb-consent";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Anonymous usage data consent");
    b.innerHTML =
      '<div class="nbc-in">' +
        '<div class="nbc-tx"><b>Help improve Numberbender.</b> May we collect <b>anonymous</b> ' +
        'usage data (which lessons are opened — no login, no personal information) to study how these ' +
        'free resources support student learning? You can change your choice anytime.</div>' +
        '<div class="nbc-bt">' +
          '<button id="nbc-no" type="button">No thanks</button>' +
          '<button id="nbc-yes" type="button">Allow anonymous data</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(b);
    document.getElementById("nbc-yes").onclick = function () {
      ls(CONSENT_KEY, "granted"); anonId(); b.remove(); send("consent_granted"); send("page_view");
    };
    document.getElementById("nbc-no").onclick = function () {
      ls(CONSENT_KEY, "denied"); rm(ID_KEY); b.remove();
    };
  }

  function injectStyle() {
    var s = document.createElement("style");
    s.textContent =
      "#nb-consent{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#075e5e;color:#fff;box-shadow:0 -4px 20px rgba(7,94,94,.28)}" +
      "#nb-consent .nbc-in{max-width:1080px;margin:0 auto;padding:14px 18px;display:flex;gap:16px;align-items:center;flex-wrap:wrap;font-family:Inter,system-ui,sans-serif}" +
      "#nb-consent .nbc-tx{flex:1 1 320px;font-size:13.5px;line-height:1.5}" +
      "#nb-consent .nbc-bt{display:flex;gap:10px;flex:0 0 auto}" +
      "#nb-consent button{font-family:inherit;font-weight:700;font-size:13px;border-radius:8px;padding:9px 16px;cursor:pointer;border:1px solid rgba(255,255,255,.45)}" +
      "#nb-consent #nbc-no{background:transparent;color:#fff}" +
      "#nb-consent #nbc-yes{background:#e8a93b;color:#10242b;border-color:#e8a93b}" +
      "#nb-consent button:focus-visible{outline:3px solid #e8a93b;outline-offset:2px}" +
      ".nb-privacy-link{cursor:pointer;text-decoration:underline}";
    document.head.appendChild(s);
  }

  /* ---- footer "Privacy & data choices" link (lets visitors change/withdraw) */
  function addPrivacyLink() {
    var foot = document.querySelector(".foot .wrap") || document.querySelector(".foot") || document.querySelector("footer");
    if (!foot || foot.querySelector(".nb-privacy-link")) return;
    var a = document.createElement("a");
    a.className = "nb-privacy-link";
    a.href = "#";
    a.textContent = "Privacy & data choices";
    a.style.cssText = "display:inline-block;margin-top:8px;font-size:12px;color:rgba(255,255,255,.85)";
    a.addEventListener("click", function (e) {
      e.preventDefault();
      rm(CONSENT_KEY); rm(ID_KEY);   // reset so the visitor can choose again
      showBanner();
    });
    foot.appendChild(a);
  }

  /* ---- automatic event tracking via delegation (no edits to page handlers) */
  function hook() {
    send("page_view"); // no-op unless already consented
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("a,button,.pl") : null;
      if (!t || !t.matches) return;
      if (t.matches(".langtog button"))      return void send("language_toggle", { lang: t.id === "langFil" ? "fil" : "en" });
      if (t.matches("a.btn-dl"))             return void send("worksheet_download", { href: t.getAttribute("href") });
      if (t.matches(".btn-sheet"))           return void send("worksheet_preview");
      if (t.matches(".btn-watch, .mini"))    return void send("topic_open");
      if (t.matches(".pl"))                  return void send("lesson_select");
      if (t.matches(".btn-quiz"))            return void send("practice_quiz_open");
      if (t.matches(".btn-test"))            return void send("test_generate_open");
      if (t.matches(".ab-banner, .cta-btn")) return void send("ab1705_cta", { href: t.getAttribute("href") });
    }, true);
  }

  function init() {
    injectStyle();
    if (!consent()) showBanner();   // ask once; remembers choice
    addPrivacyLink();
    hook();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
