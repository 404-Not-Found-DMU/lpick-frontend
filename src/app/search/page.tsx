import { redirect } from 'next/navigation'

type SearchParams = { [key: string]: string | string[] | undefined }

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const qs = new URLSearchParams()
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        if (v != null) qs.append(key, String(v))
      }
    } else if (value != null) {
      qs.append(key, String(value))
    }
  }

  const suffix = qs.toString()
  redirect(`/search/result${suffix ? `?${suffix}` : ''}`)
}


