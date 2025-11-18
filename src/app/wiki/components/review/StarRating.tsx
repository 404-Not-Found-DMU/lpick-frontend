"use client"
import { Star } from "lucide-react"
import { memo } from "react"

type StarRatingProps = {
	value: number
	onChange?: (value: number) => void
	readOnly?: boolean
	size?: "sm" | "md" | "lg"
	className?: string
}

function StarRatingComponent({ value, onChange, readOnly = false, size = "md", className = "" }: StarRatingProps) {
	const sizes = {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
	}
	return (
		<div className={`inline-flex items-center gap-1 ${className}`} aria-label="별점" role="group">
			{[1, 2, 3, 4, 5].map((n) => {
				const filled = value >= n
				const Icon = (
					<Star
						className={`${sizes[size]} ${filled ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
						aria-hidden="true"
					/>
				)
				if (readOnly) {
					return (
						<span key={n} aria-label={`${n}점`} className="inline-flex">
							{Icon}
						</span>
					)
				}
				return (
					<button
						key={n}
						type="button"
						onClick={() => onChange?.(n)}
						className="transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded"
						aria-label={`${n}점`}
					>
						{Icon}
					</button>
				)
			})}
		</div>
	)
}

const StarRating = memo(StarRatingComponent)
export default StarRating


