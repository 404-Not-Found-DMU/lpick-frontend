import { redirect } from 'next/navigation'

export default async function WikiDiscussRedirect({ params }: { params: { slug: string } }) {
  const { slug } = params
  redirect(`/wiki/discuss?docId=${encodeURIComponent(slug)}`)
}


