// Numberbender — one address per page: /deped/grade-9/ → /deped/grade-9
// Every page's canonical tag, sitemap entry and internal link uses the
// no-slash form, but Netlify also answers 200 at the slash form, so Google
// indexes both and splits their impressions.
//
// This can't be a _redirects rule: Netlify matches redirect rules with or
// without the trailing slash, so "/x/ → /x" also catches /x and loops (the
// July 2026 ERR_TOO_MANY_REDIRECTS incident). An edge function sees the raw
// path, so it can tell the two apart.
//
// Keep Netlify's "Pretty URLs" setting OFF — it adds the slash back to
// folder pages, which would loop against this function.
export default async (request) => {
  if (request.method !== "GET" && request.method !== "HEAD") return;
  const url = new URL(request.url);
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  return Response.redirect(url.toString(), 301);
};

// Runs only on paths that end in "/" — never the homepage — so every other
// request skips it. /studio/ is the installable Studio app's start URL and
// scope (studio/manifest.webmanifest), so it stays as is.
export const config = {
  pattern: "^/.+/$",
  excludedPattern: ["^/\\.netlify/", "^/studio/$"],
};
