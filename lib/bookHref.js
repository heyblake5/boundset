// Add query params to an absolute URL. The base may already include a query string.
export function withParams(base, params) {
  const url = new URL(base)
  for (const [key, value] of Object.entries(params)) if (value != null) url.searchParams.set(key, value)
  return url.toString()
}
