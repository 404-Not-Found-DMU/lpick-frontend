"use client"
import { useEffect, useMemo, useState } from "react"
import ReviewForm from "./ReviewForm"
import ReviewList, { type ReviewItem } from "./ReviewList"
import { useUserStore } from "@/store/userStore"
import { createWikiReview, deleteWikiReview, getWikiReviews, updateWikiReview, type WikiReviewsPage } from "@/hooks/api/review.api"

type ReviewSectionProps = {
	wikiId: string
	className?: string
	pageSize?: number
}

export default function ReviewSection({ wikiId, className = "", pageSize = 10 }: ReviewSectionProps) {
	const userInfo = useUserStore((s) => s.userInfo)
	const currentUserId = userInfo?.oauthId ?? null

	const [serverPage, setServerPage] = useState<WikiReviewsPage | null>(null)
	const [allItems, setAllItems] = useState<ReviewItem[]>([])
	const [page, setPage] = useState<number>(1)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		let active = true
		if (!wikiId) return
		async function load() {
			setLoading(true)
			try {
				const res = await getWikiReviews(wikiId, { page: Math.max(0, page - 1), size: pageSize })
				if (!active) return
				setServerPage(res)
				const mapped: ReviewItem[] = (res.content ?? []).map((it) => ({
					id: it.reviewId,
					userId: "unknown",
					userName: "익명",
					rating: it.starScore,
					text: it.content,
					createdAt: it.createdAt,
				}))
				setAllItems(mapped)
			} catch (e) {
				if (!active) return
				setServerPage(null)
				setAllItems([])
			} finally {
				if (active) setLoading(false)
			}
		}
		load()
		return () => { active = false }
	}, [wikiId, page, pageSize])

	const total = serverPage?.totalElements ?? 0
	const pageItems = allItems

	const myItem = useMemo(() => {
		if (!currentUserId) return null
		return allItems.find((i) => i.userId === currentUserId) ?? null
	}, [allItems, currentUserId])

	const handleCreate = async (rating: number, text: string) => {
		if (!wikiId) return
		try {
			await createWikiReview(wikiId, { starScore: rating, content: text })
			// 등록 후 첫 페이지부터 재조회
			setPage(1)
			const res = await getWikiReviews(wikiId, { page: 0, size: pageSize })
			setServerPage(res)
			const mapped: ReviewItem[] = (res.content ?? []).map((it) => ({
				id: it.reviewId,
				userId: "unknown",
				userName: "익명",
				rating: it.starScore,
				text: it.content,
				createdAt: it.createdAt,
			}))
			setAllItems(mapped)
		} catch (e) {
			// TODO: 토스트 연결
			console.warn("리뷰 등록 실패", e)
		}
	}

	const handleEdit = async (target: ReviewItem) => {
		// 간단히 프롬프트로 UI-only 수정 처리
		const newText = window.prompt("한줄평 수정", target.text) ?? target.text
		const newRatingStr = window.prompt("별점(1~5) 수정", String(target.rating)) ?? String(target.rating)
		const newRating = Math.min(5, Math.max(1, Number(newRatingStr)))
		try {
			await updateWikiReview(target.id, { content: newText, starScore: newRating })
			// 현재 페이지 재조회
			const res = await getWikiReviews(wikiId, { page: Math.max(0, page - 1), size: pageSize })
			setServerPage(res)
			const mapped: ReviewItem[] = (res.content ?? []).map((it) => ({
				id: it.reviewId,
				userId: "unknown",
				userName: "익명",
				rating: it.starScore,
				text: it.content,
				createdAt: it.createdAt,
			}))
			setAllItems(mapped)
		} catch (e) {
			console.warn("리뷰 수정 실패", e)
		}
	}

	const handleDelete = async (target: ReviewItem) => {
		if (!window.confirm("이 리뷰를 삭제할까요?")) return
		try {
			await deleteWikiReview(target.id)
			// 삭제 후 현재 페이지 재조회 (필요 시 이전 페이지로 이동)
			const nextPage = page
			const res = await getWikiReviews(wikiId, { page: Math.max(0, nextPage - 1), size: pageSize })
			setServerPage(res)
			const mapped: ReviewItem[] = (res.content ?? []).map((it) => ({
				id: it.reviewId,
				userId: "unknown",
				userName: "익명",
				rating: it.starScore,
				text: it.content,
				createdAt: it.createdAt,
			}))
			setAllItems(mapped)
		} catch (e) {
			console.warn("리뷰 삭제 실패", e)
		}
	}

	return (
		<section className={className} aria-labelledby="review-section-title">
			<h2 id="review-section-title" className="mt-10 mb-4 text-lg font-semibold">
				리뷰
			</h2>
			<div className="space-y-4">
				{myItem ? (
					<div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
						<div className="mb-2 text-sm text-gray-600 dark:text-gray-400">내 리뷰</div>
						<ReviewList
							items={[myItem]}
							currentUserId={currentUserId}
							page={1}
							pageSize={1}
							total={1}
							onPageChange={() => {}}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					</div>
				) : (
					<ReviewForm onSubmit={handleCreate} />
				)}

				<ReviewList
					items={pageItems}
					currentUserId={currentUserId}
					page={page}
					pageSize={pageSize}
					total={total}
					onPageChange={setPage}
					onEdit={handleEdit}
					onDelete={handleDelete}
					className="mt-2"
				/>
			</div>
		</section>
	)
}


