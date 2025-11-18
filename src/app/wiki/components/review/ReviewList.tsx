"use client"
import StarRating from "./StarRating"
import { Button } from "@/components/Button"
import Paginator from "@/app/admin/components/Paginator"
import { useMemo } from "react"

export type ReviewItem = {
	id: string
	userId: string
	userName: string
	rating: number
	text: string
	createdAt: string
	updatedAt?: string | null
}

type ReviewListProps = {
	items: ReviewItem[]
	currentUserId?: string | null
	page: number
	pageSize: number
	total: number
	onPageChange: (page: number) => void
	onEdit: (item: ReviewItem) => void
	onDelete: (item: ReviewItem) => void
	className?: string
}

export default function ReviewList({
	items,
	currentUserId = null,
	page,
	pageSize,
	total,
	onPageChange,
	onEdit,
	onDelete,
	className = "",
}: ReviewListProps) {
	const visible = items
	const showToolbar = useMemo(() => total > pageSize, [total, pageSize])

	return (
		<div className={className}>
			<ul className="space-y-3">
				{visible.map((r) => {
					const isMine = currentUserId && r.userId === currentUserId
					return (
						<li key={r.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium">{r.userName}</span>
									<span className="text-xs text-gray-400">·</span>
									<span className="text-xs text-gray-500 dark:text-gray-400">{new Date(r.createdAt).toLocaleString()}</span>
									{r.updatedAt ? (
										<span className="text-[10px] text-gray-400 ml-1">(수정됨)</span>
									) : null}
								</div>
								<div>
									<StarRating value={r.rating} readOnly size="sm" />
								</div>
							</div>
							<p className="mt-2 text-sm text-gray-800 dark:text-gray-100">{r.text}</p>
							{isMine ? (
								<div className="mt-3 flex items-center gap-2">
									<Button size="sm" variant="outline" className="h-7" onClick={() => onEdit(r)}>
										수정
									</Button>
									<Button size="sm" variant="outline" className="h-7" onClick={() => onDelete(r)}>
										삭제
									</Button>
								</div>
							) : null}
						</li>
					)
				})}
			</ul>
			{showToolbar ? (
				<Paginator
					page={page}
					total={total}
					pageSize={pageSize}
					onChange={onPageChange}
				/>
			) : null}
		</div>
	)
}


