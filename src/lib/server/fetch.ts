import { headers } from "next/headers"

export function getBaseUrlFromHeaders(): string {
  const hdrs = headers()
  const proto = hdrs.get('x-forwarded-proto') ?? 'http'
  const host = hdrs.get('host') ?? 'localhost:3000'
  return process.env.NEXT_PUBLIC_BASE_URL ?? `${proto}://${host}`
}

export async function fetchWithTimeout(
  url: string,
  opts: RequestInit & { timeoutMs?: number; retries?: number } = {}
) {
  const { timeoutMs = 5000, retries = 1, ...rest } = opts
  for (let attempt = 0; attempt <= retries; attempt++) {
    const ac = new AbortController()
    const id = setTimeout(() => ac.abort(), timeoutMs)
    try {
      const nextOption = (opts as any)?.next ?? { revalidate: 60 }
      const res = await fetch(url, { ...(rest as any), signal: ac.signal, next: nextOption } as any)
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

