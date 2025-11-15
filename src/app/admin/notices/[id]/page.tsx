import NoticeDetailClient from '../parts/NoticeDetailClient'

export default async function AdminNoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <NoticeDetailClient noticeId={id} />
}



