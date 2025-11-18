"use client"
import { useMemo, useState } from "react"
import StarRating from "./StarRating"
import { Button } from "@/components/Button"

type ReviewFormProps = {
	defaultRating?: number
	defaultText?: string
	onSubmit: (rating: number, text: string) => void
	onCancel?: () => void
	submitLabel?: string
	showCancel?: boolean
	maxLength?: number
	className?: string
}

export default function ReviewForm({
	defaultRating = 0,
	defaultText = "",
	onSubmit,
	onCancel,
	submitLabel = "등록",
	showCancel = false,
	maxLength = 140,
	className = "",
}: ReviewFormProps) {
	const [rating, setRating] = useState<number>(defaultRating)
	const [text, setText] = useState<string>(defaultText)
	const remaining = useMemo(() => Math.max(0, maxLength - text.length), [text, maxLength])
	const valid = rating >= 1 && rating <= 5 && text.trim().length > 0

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				if (!valid) return
				onSubmit(rating, text.trim())
			}}
			className={`rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-5 bg-white dark:bg-gray-900 ${className}`}
		>
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<span className="text-sm text-gray-600 dark:text-gray-400">별점</span>
					<StarRating value={rating} onChange={setRating} />
					<span className="text-xs text-gray-500 dark:text-gray-400">{rating || "-"} / 5</span>
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400">남은 글자 {remaining}</div>
			</div>
			<div className="mt-3">
				<label htmlFor="review-one-line" className="sr-only">
					한줄평
				</label>
				<input
					id="review-one-line"
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value.slice(0, maxLength))}
					placeholder="한줄평을 입력하세요"
					className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
				/>
			</div>
			<div className="mt-4 flex items-center justify-end gap-2">
				{showCancel && (
					<Button type="button" variant="outline" size="sm" className="h-8" onClick={onCancel}>
						취소
					</Button>
				)}
				<Button type="submit" size="sm" className="h-8" disabled={!valid}>
					{submitLabel}
				</Button>
			</div>
		</form>
	)
}


