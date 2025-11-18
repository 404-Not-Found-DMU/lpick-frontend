import { headers } from "next/headers"

export async function getBaseUrlFromHeaders(): Promise<string> {
  const hdrs = await headers()
  const proto = hdrs.get('x-forwarded-proto') ?? 'http'
  const host = hdrs.get('host') ?? 'localhost:3000'
  return process.env.NEXT_PUBLIC_BASE_URL ?? `${proto}://${host}`
}

export async function fetchWithTimeout(
  url: string,
  opts: RequestInit & { timeoutMs?: number; retries?: number; next?: { revalidate?: number } } = {}
) {
  const { timeoutMs = 5000, retries = 1, ...rest } = opts
  for (let attempt = 0; attempt <= retries; attempt++) {
    const ac = new AbortController()
    const id = setTimeout(() => ac.abort(), timeoutMs)
    try {
      const init = { ...(rest as RequestInit), signal: ac.signal } as RequestInit & Record<string, unknown>
      const providedNext = (opts as Record<string, unknown>)['next']
      ;(init as Record<string, unknown>)['next'] = providedNext !== undefined ? providedNext : { revalidate: 60 }
      const res = await fetch(url, init as unknown as RequestInit)
      clearTimeout(id)
      if (!res.ok) throw new Error('bad status')
      return res
    } catch (e) {
      clearTimeout(id)
      if (attempt === retries) throw e
    }
  }
  throw new Error('unreachable')
}

