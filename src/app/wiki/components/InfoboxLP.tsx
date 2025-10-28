"use client"
import Image from "next/image"

type InfoboxLP = {
  title: string
  artist: string
  coverImage?: string
  releaseDate?: string
  label?: string
  genres?: string[]
}

export default function InfoboxLP({ data }: { data: InfoboxLP }) {
  return (
    <aside className="mb-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
      <div className="flex items-start gap-4">
        {data.coverImage ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded">
            <Image src={data.coverImage} alt={`${data.title} cover`} fill className="object-cover" />
          </div>
        ) : null}
        <div className="min-w-0">
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{data.title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{data.artist}</div>
          <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {data.releaseDate && (
              <div className="text-gray-600 dark:text-gray-400"><span className="text-gray-500">발매일</span> {data.releaseDate}</div>
            )}
            {data.label && (
              <div className="text-gray-600 dark:text-gray-400"><span className="text-gray-500">레이블</span> {data.label}</div>
            )}
            {data.genres && data.genres.length > 0 && (
              <div className="col-span-2 text-gray-600 dark:text-gray-400"><span className="text-gray-500">장르</span> {data.genres.join(', ')}</div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}


