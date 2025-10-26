import { redirect } from 'next/navigation'

export default function WikiDiscussRedirect({ params }: { params: { slug: string } }) {
  redirect(`/wiki/discuss?docId=${encodeURIComponent(params.slug)}`)
}


