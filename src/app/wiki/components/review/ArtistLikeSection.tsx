"use client"
import { useMemo, useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { useWikiLike } from "@/app/wiki/components/useWikiLike"
import { useToast } from "@/components/Toast/ToastProvider"

type ArtistLikeSectionProps = {
	wikiId: string
	initialCount?: number
	className?: string
}

export default function ArtistLikeSection({ wikiId, initialCount = 0, className = "" }: ArtistLikeSectionProps) {
	const { liked, pending, initialized, toggle } = useWikiLike(wikiId)
	const [count, setCount] = useState<number>(initialCount)
	const { push } = useToast()

	// 초기 liked 상태에 따라 표시 카운트를 보정할 수 있도록 선택적으로 사용
	useEffect(() => {
		// 서버에서 별도 likeCount를 내려주지 않으므로,
		// count는 초기값을 기준으로 토글 시에만 증감 처리
	}, [initialized])

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
					disabled={pending || !initialized}
					onClick={async () => {
						const before = liked
						try {
							await toggle()
							setCount((c) => (before ? Math.max(0, c - 1) : c + 1))
						} catch {
							push('좋아요 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error')
						}
					}}
				>
					<Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
					{label}
				</button>
			</div>
		</section>
	)
}


