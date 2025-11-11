"use client"
import { useMemo, useState } from "react"
import ReviewForm from "./ReviewForm"
import ReviewList, { type ReviewItem } from "./ReviewList"
import { useUserStore } from "@/store/userStore"

type ReviewSectionProps = {
	wikiId: string
	className?: string
	pageSize?: number
}

// UI-only: 프론트 상태로 페이징/수정/삭제를 흉내냅니다.
export default function ReviewSection({ className = "", pageSize = 10 }: ReviewSectionProps) {
	const userInfo = useUserStore((s) => s.userInfo)
	const currentUserId = userInfo?.oauthId ?? null

	const [allItems, setAllItems] = useState<ReviewItem[]>(() => {
		const now = Date.now()
		return [
			{ id: "1", userId: "u_1", userName: "Alice", rating: 5, text: "마스터피스입니다.", createdAt: new Date(now - 86400000).toISOString() },
			{ id: "2", userId: "u_2", userName: "Bob", rating: 4, text: "좋아요. 몇 트랙은 아쉬움.", createdAt: new Date(now - 43200000).toISOString() },
			{ id: "3", userId: "u_3", userName: "Charlie", rating: 3, text: "취향은 갈릴 듯.", createdAt: new Date(now - 3600000).toISOString() },
		]
	})
	const [page, setPage] = useState<number>(1)

	const total = allItems.length
	const pageItems = useMemo(() => {
		const start = (page - 1) * pageSize
		return allItems.slice(start, start + pageSize)
	}, [page, pageSize, allItems])

	const myItem = useMemo(() => {
		if (!currentUserId) return null
		return allItems.find((i) => i.userId === currentUserId) ?? null
	}, [allItems, currentUserId])

	const handleCreate = (rating: number, text: string) => {
		const id = Math.random().toString(36).slice(2)
		const me: ReviewItem = {
			id,
			userId: currentUserId || "me",
			userName: userInfo?.nickname || "나",
			rating,
			text,
			createdAt: new Date().toISOString(),
		}
		setAllItems((prev) => [me, ...prev])
		setPage(1)
	}

	const handleEdit = (target: ReviewItem) => {
		// 간단히 프롬프트로 UI-only 수정 처리
		const newText = window.prompt("한줄평 수정", target.text) ?? target.text
		const newRatingStr = window.prompt("별점(1~5) 수정", String(target.rating)) ?? String(target.rating)
		const newRating = Math.min(5, Math.max(1, Number(newRatingStr)))
		setAllItems((prev) =>
			prev.map((i) => (i.id === target.id ? { ...i, text: newText, rating: newRating, updatedAt: new Date().toISOString() } : i)),
		)
	}

	const handleDelete = (target: ReviewItem) => {
		if (!window.confirm("이 리뷰를 삭제할까요?")) return
		setAllItems((prev) => prev.filter((i) => i.id !== target.id))
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


