import InquiryAdminDetailClient from './parts/InquiryAdminDetailClient'

export default function AdminInquiryDetailPage({ params }: { params: { id: string } }) {
  return <InquiryAdminDetailClient questionId={decodeURIComponent(params.id)} />
}


