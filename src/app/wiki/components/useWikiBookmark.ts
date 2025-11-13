"use client"
import { useEffect, useState } from "react"
import { addWikiBookmark, getWikiBookmarkStatus, removeWikiBookmark } from "@/hooks/api/wiki.api"

export function useWikiBookmark(wikiId?: string | null) {
  const [bookmarkId, setBookmarkId] = useState<string | null>(null)
  const [pending, setPending] = useState<boolean>(false)

  useEffect(() => {
    let active = true
    async function load() {
      if (!wikiId) return
      try {
        const id = await getWikiBookmarkStatus(wikiId)
        if (!active) return
        setBookmarkId(id)
      } catch {
        if (!active) return
        setBookmarkId(null)
      }
    }
    load()
    return () => { active = false }
  }, [wikiId])

  async function toggle() {
    if (!wikiId || pending) return
    setPending(true)
    try {
      if (bookmarkId) {
        await removeWikiBookmark(bookmarkId)
        setBookmarkId(null)
      } else {
        await addWikiBookmark(wikiId)
        const newId = await getWikiBookmarkStatus(wikiId)
        setBookmarkId(newId)
      }
    } finally {
      setPending(false)
    }
  }

  return { bookmarkId, pending, toggle }
}

