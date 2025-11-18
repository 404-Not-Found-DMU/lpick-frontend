import InquiryDetailClient from '../parts/InquiryDetailClient'

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const questionId = decodeURIComponent(id)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          <InquiryDetailClient questionId={questionId} />
        </div>
      </div>
    </div>
  )
}
