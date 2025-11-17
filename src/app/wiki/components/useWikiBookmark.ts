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
        // 위키 ID로 북마크 해제
        await removeWikiBookmark(wikiId)
        // 삭제 후 실제 상태 재확인
        const confirm = await getWikiBookmarkStatus(wikiId)
        setBookmarkId(confirm)
      } else {
        await addWikiBookmark(wikiId)
        // 생성 직후 반영 지연을 고려해 한 번 더 확인
        let newId = await getWikiBookmarkStatus(wikiId)
        if (!newId) {
          await new Promise((r) => setTimeout(r, 200))
          newId = await getWikiBookmarkStatus(wikiId)
        }
        setBookmarkId(newId)
      }
    } catch (e) {
      // 서버 오류(500), 인증 문제 등은 UI를 깨뜨리지 않도록 삼킨다.
      // TODO: 토스트 등 사용자 공지 연결
      console.warn('Bookmark toggle failed', e)
    } finally {
      setPending(false)
    }
  }

  return { bookmarkId, pending, toggle }
}

