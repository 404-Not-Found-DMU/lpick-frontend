import InquiryAdminDetailClient from '../parts/InquiryAdminDetailClient'

export default async function AdminInquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <InquiryAdminDetailClient questionId={decodeURIComponent(id)} />
}


