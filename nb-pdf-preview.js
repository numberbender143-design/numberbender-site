/* Numberbender PDF preview
   Adds a "Preview" button next to every PDF download link and opens the PDF in a window on the
   same page, so visitors can look at a worksheet without leaving it. Browsers that can't show PDFs
   inline (navigator.pdfViewerEnabled === false, e.g. Chrome on Android) open the file in a new tab.
   The button carries onclick="nbPdfView('…pdf')" so nb-events.js counts it as a worksheet_download. */
(function () {
  if (window.nbPdfView) return;

  var CSS =
    ".nb-pdfv-pill{display:inline-flex;align-items:center;gap:5px;margin-left:8px;padding:4px 10px;border:1.5px solid #CBD5E1;" +
    "border-radius:999px;background:#fff;color:#1F6F6B;font-family:inherit;font-weight:600;font-size:.82rem;line-height:1.2;cursor:pointer;vertical-align:middle}" +
    ".nb-pdfv-pill:hover{border-color:#1F6F6B;background:#F0FDFA}" +
    ".nb-pdfv-ov{position:fixed;inset:0;z-index:10000;background:rgba(15,23,42,.6);display:none;align-items:center;justify-content:center;padding:18px}" +
    ".nb-pdfv-ov.open{display:flex}" +
    ".nb-pdfv-box{background:#fff;border-radius:16px;width:min(980px,100%);height:min(90vh,1100px);display:flex;flex-direction:column;overflow:hidden;" +
    "box-shadow:0 24px 60px rgba(15,23,42,.35)}" +
    ".nb-pdfv-head{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #E2E8F0}" +
    ".nb-pdfv-title{flex:1;min-width:0;font-family:inherit;font-weight:700;font-size:1rem;line-height:1.3;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    ".nb-pdfv-act{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:10px;border:1.5px solid #E2E8F0;background:#fff;" +
    "color:#0F172A;font-family:inherit;font-weight:600;font-size:.88rem;line-height:1;text-decoration:none;cursor:pointer;white-space:nowrap}" +
    ".nb-pdfv-act:hover{border-color:#1F6F6B;color:#1F6F6B;text-decoration:none}" +
    ".nb-pdfv-dl{background:#1F6F6B;border-color:#1F6F6B;color:#fff}.nb-pdfv-dl:hover{background:#16544F;color:#fff}" +
    ".nb-pdfv-frame{flex:1;width:100%;border:0;background:#525659}" +
    "@media(max-width:640px){.nb-pdfv-ov{padding:0}.nb-pdfv-box{height:100%;border-radius:0}.nb-pdfv-act span{display:none}}";

  var ov, frame, titleEl, dl, openA, lastFocus;

  function build() {
    var st = document.createElement("style"); st.id = "nb-pdfv-css"; st.textContent = CSS; document.head.appendChild(st);
    ov = document.createElement("div");
    ov.className = "nb-pdfv-ov";
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-labelledby", "nb-pdfv-title");
    ov.innerHTML =
      '<div class="nb-pdfv-box"><div class="nb-pdfv-head">' +
      '<div class="nb-pdfv-title" id="nb-pdfv-title"></div>' +
      '<a class="nb-pdfv-act nb-pdfv-dl" download>&#11015; <span>Download</span></a>' +
      '<a class="nb-pdfv-act nb-pdfv-open" target="_blank" rel="noopener">&#8599; <span>New tab</span></a>' +
      '<button type="button" class="nb-pdfv-act nb-pdfv-x" aria-label="Close preview">&#10005;</button></div>' +
      '<iframe class="nb-pdfv-frame" title="Worksheet preview"></iframe></div>';
    document.body.appendChild(ov);
    frame = ov.querySelector("iframe"); titleEl = ov.querySelector(".nb-pdfv-title");
    dl = ov.querySelector(".nb-pdfv-dl"); openA = ov.querySelector(".nb-pdfv-open");
    ov.querySelector(".nb-pdfv-x").addEventListener("click", close);
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ov.classList.contains("open")) close(); });
  }

  function close() {
    ov.classList.remove("open"); frame.src = "about:blank"; document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  window.nbPdfView = function (url, title) {
    if (navigator.pdfViewerEnabled === false) { window.open(url, "_blank", "noopener"); return; }
    if (!ov) build();
    lastFocus = document.activeElement;
    titleEl.textContent = title || decodeURIComponent(url.split("/").pop().replace(/\.pdf.*$/i, "").replace(/[-_]+/g, " "));
    dl.href = url; openA.href = url;
    frame.src = url + (url.indexOf("#") < 0 ? "#view=FitH" : "");
    ov.classList.add("open"); document.body.style.overflow = "hidden";
    ov.querySelector(".nb-pdfv-x").focus();
  };

  function nameFor(a) {
    var t = (a.getAttribute("data-title") || a.textContent || "").replace(/[⬇↓↗]/g, "").replace(/\s+/g, " ").trim();
    if (t.length < 6 || /^(download|get|open|pdf|free pdf|download (free )?pdf)\b/i.test(t)) {
      var h1 = document.querySelector("h1");
      t = h1 ? h1.textContent.replace(/\s+/g, " ").trim() : "";
    }
    return t;
  }

  function enhance() {
    document.querySelectorAll('a[href*=".pdf"]').forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (!/\.pdf(?:$|[?#])/i.test(href) || a.hasAttribute("data-nb-pdfv")) return;
      if (a.closest(".lesson-item, .lesson-ws-row, .ws-actions, .nbm, #ws-modal, #video-modal, .nb-pdfv-ov, header, nav, footer")) return;
      a.setAttribute("data-nb-pdfv", "1");
      var url = new URL(href, location.href).pathname;
      var b = document.createElement("button");
      b.type = "button";
      b.className = (a.classList.contains("btn") ? "btn btn-outline" : "nb-pdfv-pill") + " nb-pdfv ws-btn view";
      b.setAttribute("onclick", "nbPdfView('" + url.replace(/'/g, "%27") + "', this.getAttribute('data-title'))");
      b.setAttribute("data-title", nameFor(a));
      b.setAttribute("aria-label", "Preview " + (nameFor(a) || "the PDF") + " on this page");
      b.innerHTML = "&#128065; Preview";
      a.insertAdjacentElement("afterend", b);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance); else enhance();
})();
