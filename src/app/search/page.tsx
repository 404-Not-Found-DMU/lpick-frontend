import { redirect } from 'next/navigation'

type SearchParams = { [key: string]: string | string[] | undefined }

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const qs = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (Array.isArray(value)) {
      value.forEach((v) => { if (v != null) qs.append(key, String(v)) })
    } else if (value != null) {
      qs.append(key, String(value))
    }
  })

  const suffix = qs.toString()
  redirect(`/search/result${suffix ? `?${suffix}` : ''}`)
}


