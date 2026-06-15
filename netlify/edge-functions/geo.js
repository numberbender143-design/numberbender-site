// Numberbender — Edge geolocation
// Replaces the homepage's client-side ipapi.co lookup. Netlify resolves the
// visitor's country at the edge (no third-party request, no rate limit) and we
// pass it to the page via a short-lived cookie that the sticky-bar script reads.
// Safe no-op if geo is ever unavailable — the page then falls back to its
// existing logic.
export default async (request, context) => {
  const response = await context.next();
  try {
    const code = context.geo && context.geo.country && context.geo.country.code;
    if (code) {
      response.headers.append(
        "Set-Cookie",
        `nb_country=${code}; Path=/; Max-Age=86400; SameSite=Lax`
      );
    }
  } catch (_) {
    /* ignore — client-side fallback handles it */
  }
  return response;
};

// Only the homepage shows the geo-targeted sticky bar, so scope it there.
export const config = { path: "/" };
