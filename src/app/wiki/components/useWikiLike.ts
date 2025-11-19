"use client"
import { useEffect, useState } from "react"
import { getWikiLikeStatus, likeWiki, unlikeWiki } from "@/hooks/api/wiki.api"

export function useWikiLike(wikiId?: string | null) {
  const [liked, setLiked] = useState<boolean>(false)
  const [likeId, setLikeId] = useState<string | null>(null)
  const [pending, setPending] = useState<boolean>(false)
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    let active = true
    async function load() {
      if (!wikiId) return
      try {
        const res = await getWikiLikeStatus(wikiId)
        if (!active) return
        setLiked(!!res?.liked)
        setLikeId(res?.wikiLikeId ?? null)
      } catch {
        if (!active) return
        setLiked(false)
        setLikeId(null)
      } finally {
        if (active) setInitialized(true)
      }
    }
    load()
    return () => { active = false }
  }, [wikiId])

  async function toggle() {
    if (!wikiId || pending) return
    setPending(true)
    try {
      if (liked) {
        await unlikeWiki(wikiId)
        const confirm = await getWikiLikeStatus(wikiId)
        setLiked(!!confirm?.liked)
        setLikeId(confirm?.wikiLikeId ?? null)
      } else {
        await likeWiki(wikiId)
        const confirm = await getWikiLikeStatus(wikiId)
        setLiked(!!confirm?.liked)
        setLikeId(confirm?.wikiLikeId ?? null)
      }
    } catch (e) {
      console.warn('Like toggle failed', e)
    } finally {
      setPending(false)
    }
  }

  return { liked, likeId, pending, initialized, toggle }
}
