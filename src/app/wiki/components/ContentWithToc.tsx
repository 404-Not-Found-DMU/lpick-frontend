"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Link as LinkIcon } from "lucide-react"
import WikiRenderer from "@/app/wiki/components/WikiRenderer"

type HeadingItem = { id: string; text: string; level: 2 | 3 }

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()_+\-={}|\[\]\\:";'<>?,./]/g, '')
    .replace(/\s+/g, '-')
}

export default function ContentWithToc({ content }: { content: string }) {
  const [headings, setHeadings] = useState<HeadingItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [open, setOpen] = useState<boolean>(true)
  const collectedRef = useRef<Map<string, HeadingItem>>(new Map())
  const containerRef = useRef<HTMLDivElement | null>(null)

  // initialize open from localStorage and viewport
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('wiki_toc_open') : null
    if (saved === 'true' || saved === 'false') {
      setOpen(saved === 'true')
      return
    }
    if (typeof window !== 'undefined') {
      setOpen(window.innerWidth >= 1024)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wiki_toc_open', String(open))
    }
  }, [open])

  const components = useMemo(() => {
    function makeHeading(level: 2 | 3) {
      return function Heading({ children }: { children: React.ReactNode }) {
        const plain = Array.isArray(children) ? children.join(' ') : (typeof children === 'string' ? children : '')
        const text = String(plain ?? '')
        const id = slugify(text)
        if (!collectedRef.current.has(id)) {
          collectedRef.current.set(id, { id, text, level })
        }
        const Tag = (level === 2 ? 'h2' : 'h3') as 'h2' | 'h3'
        return (
          <Tag id={id} className="group scroll-mt-24">
            <span>{children}</span>
            <button
              type="button"
              aria-label="링크 복사"
              onClick={async (e) => {
                e.preventDefault()
                const url = `${window.location.origin}${window.location.pathname}#${id}`
                try {
                  await navigator.clipboard.writeText(url)
                } catch {
                  // ignore
                }
              }}
              className="ml-2 inline-flex opacity-0 transition-opacity group-hover:opacity-100 align-middle text-gray-400 hover:text-violet-600"
            >
              <LinkIcon className="h-4 w-4" />
            </button>
          </Tag>
        )
      }
    }
    return {
      h2: makeHeading(2),
      h3: makeHeading(3),
    }
  }, [])

  // After first render, commit collected headings
  useEffect(() => {
    setHeadings(Array.from(collectedRef.current.values()))
  }, [])

  // Scroll spy
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const targets = root.querySelectorAll('h2[id], h3[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [content])

  const onClickToc = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    }
  }

  const copyLink = async (id: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`)
    } catch {}
  }

  return (
    <>
      <nav aria-label="목차" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">목차</h2>
          {open ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>

        {open && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <ol className="space-y-2">
              {headings.map((h) => (
                <li key={h.id} className="flex items-center justify-between">
                  <a
                    href={`#${h.id}`}
                    onClick={onClickToc(h.id)}
                    className={`text-violet-600 hover:underline ${
                      h.level === 3 ? 'ml-4' : ''
                    } ${activeId === h.id ? 'font-semibold' : ''}`}
                  >
                    {h.text}
                  </a>
                  <button
                    className="ml-2 inline-flex rounded p-1 text-gray-400 hover:text-violet-600"
                    aria-label="섹션 링크 복사"
                    onClick={() => copyLink(h.id)}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </nav>

      <div ref={containerRef} className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <WikiRenderer content={content} components={components} />
      </div>
    </>
  )
}


