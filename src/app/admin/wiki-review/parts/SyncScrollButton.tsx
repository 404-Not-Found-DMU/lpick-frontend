"use client"
export default function SyncScrollButton() {
  return (
    <button
      type="button"
      onClick={() => {
        const a = document.getElementById('before')
        const b = document.getElementById('after')
        if (a && b) {
          b.scrollTop = a.scrollTop = 0
        }
      }}
      className="text-sm text-violet-600 hover:underline"
    >
      동기화 스크롤
    </button>
  )
}


