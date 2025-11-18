"use client"
import { useMemo, useState } from "react"
import { Heart } from "lucide-react"

type ArtistLikeSectionProps = {
	wikiId: string
	initialCount?: number
	className?: string
}

export default function ArtistLikeSection({ initialCount = 0, className = "" }: ArtistLikeSectionProps) {
	const [liked, setLiked] = useState<boolean>(false)
	const [count, setCount] = useState<number>(initialCount)

	const label = useMemo(() => (liked ? "좋아요 취소" : "좋아요"), [liked])

	return (
		<section className={className} aria-labelledby="artist-like-section-title">
			<h2 id="artist-like-section-title" className="mt-10 mb-4 text-lg font-semibold">
				좋아요
			</h2>
			<div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Heart className={`w-5 h-5 ${liked ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
					<span className="text-sm">{count.toLocaleString()}</span>
				</div>
				<button
					type="button"
					className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
						liked
							? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
							: "bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
					}`}
					aria-pressed={liked}
					onClick={() => {
						setLiked((prev) => !prev)
						setCount((c) => (liked ? Math.max(0, c - 1) : c + 1))
					}}
				>
					<Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
					{label}
				</button>
			</div>
		</section>
	)
}


