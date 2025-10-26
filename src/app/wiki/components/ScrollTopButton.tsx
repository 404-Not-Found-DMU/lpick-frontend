"use client"
import { useEffect, useState } from "react"

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-violet-600 px-3 py-2 text-white shadow-lg ring-2 ring-violet-300 hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      aria-label="상단으로 이동"
    >
      ↑
    </button>
  )
}


