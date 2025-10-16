"use client"
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

type Track = { id: number; title: string; artist: string; mp3: string; cover: string; date: string }

export default function AdminLPlayerPage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [q, setQ] = useState('')
  const [form, setForm] = useState<{ id?: number; title: string; artist: string; mp3: string; cover: string }>({ title: '', artist: '', mp3: '', cover: '' })
  const [preview, setPreview] = useState<Track | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [dragging, setDragging] = useState<number | null>(null)
  const [errors, setErrors] = useState<{ title?: string; artist?: string; mp3?: string; cover?: string }>({})
  const [uploadMp3Progress, setUploadMp3Progress] = useState<number>(0)
  const [uploadCoverProgress, setUploadCoverProgress] = useState<number>(0)

  async function fetchList() {
    const res = await fetch(`/api/admin/lplayer`)
    const data = await res.json()
    setTracks(data.items)
  }

  useEffect(() => { fetchList() }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    function onTime() { const a = audioRef.current; if (!a) return; setProgress(a.currentTime / (a.duration || 1)) }
    function onEnded() { setPlaying(false) }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    return () => { audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('ended', onEnded) }
  }, [preview])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return tracks
    return tracks.filter((t) => [t.title, t.artist].some((v) => v.toLowerCase().includes(s)))
  }, [q, tracks])

  async function fileToDataUrl(file: File, onProgress?: (p: number) => void) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.onprogress = (e) => { if (e.lengthComputable && onProgress) onProgress(e.loaded / e.total) }
      reader.readAsDataURL(file)
    })
  }

  function validate(): boolean {
    const next: typeof errors = {}
    if (!form.title.trim()) next.title = '제목은 필수입니다.'
    if (!form.artist.trim()) next.artist = '아티스트는 필수입니다.'
    if (!form.mp3.trim()) next.mp3 = 'MP3 파일을 업로드하거나 URL을 입력하세요.'
    if (!form.cover.trim()) next.cover = '커버 이미지를 업로드하거나 URL을 입력하세요.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    if (form.id) {
      await fetch(`/api/admin/lplayer/${form.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/admin/lplayer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setForm({ id: undefined, title: '', artist: '', mp3: '', cover: '' })
    setErrors({})
    fetchList()
  }

  async function handleDelete(id?: number) {
    if (id) {
      await fetch(`/api/admin/lplayer/${id}`, { method: 'DELETE' })
    } else {
      // bulk delete
      await Promise.all(Array.from(selected).map((sid) => fetch(`/api/admin/lplayer/${sid}`, { method: 'DELETE' })))
      setSelected(new Set())
    }
    fetchList()
  }

  async function postNewOrder(items: Track[]) {
    await fetch('/api/admin/lplayer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: items.map((t) => t.id) }) })
  }

  function onDragStart(id: number) { setDragging(id) }
  function onDragOver(id: number) {
    if (dragging === null || dragging === id) return
    const cur = [...tracks]
    const from = cur.findIndex((t) => t.id === dragging)
    const to = cur.findIndex((t) => t.id === id)
    const [moved] = cur.splice(from, 1)
    cur.splice(to, 0, moved)
    setTracks(cur)
  }
  async function onDragEnd() {
    setDragging(null)
    await postNewOrder(tracks)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">LPlayer 관리</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">플레이리스트를 등록/수정/삭제합니다.</p>
        </div>
        <Link href="/lplayer" className="rounded-md border px-3 py-2 text-sm">LPlayer 보기</Link>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{form.id ? '트랙 수정' : '신규 트랙 등록'}</h3>
          <div className="flex items-center gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="검색..." className="w-56 rounded-full border px-3 py-1.5 text-sm" />
            <button disabled={selected.size === 0} onClick={() => handleDelete()} className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50">선택 삭제</button>
          </div>
        </div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
          <input placeholder="제목" className={`rounded-md border px-3 py-2 text-sm ${errors.title ? 'border-red-500' : ''}`} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="아티스트" className={`rounded-md border px-3 py-2 text-sm ${errors.artist ? 'border-red-500' : ''}`} value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} />
          {errors.title ? <p className="text-xs text-red-600">{errors.title}</p> : null}
          {errors.artist ? <p className="text-xs text-red-600 md:col-start-2">{errors.artist}</p> : null}
          {/* MP3 업로드/드롭 */}
          <div className="sm:col-span-2 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                e.preventDefault()
                const file = e.dataTransfer.files?.[0]
                if (file && file.type.startsWith('audio/')) {
                  const dataUrl = await fileToDataUrl(file)
                  setForm((f) => ({ ...f, mp3: dataUrl }))
                }
              }}
              className="rounded-md border border-dashed p-3 text-sm"
            >
              <div className="mb-2 font-medium">MP3 파일</div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 dark:bg-gray-700">🎵</div>
                <div className="flex-1">
                  <input accept="audio/*" type="file" onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      if (!file.type.startsWith('audio/')) { setErrors((er) => ({ ...er, mp3: '오디오 파일만 업로드할 수 있습니다.' })); return }
                      if (file.size > 20 * 1024 * 1024) { setErrors((er) => ({ ...er, mp3: '파일 용량은 20MB를 초과할 수 없습니다.' })); return }
                      setErrors((er) => ({ ...er, mp3: undefined }))
                      setUploadMp3Progress(0)
                      const dataUrl = await fileToDataUrl(file, (p) => setUploadMp3Progress(p))
                      setForm((f) => ({ ...f, mp3: dataUrl }))
                      setUploadMp3Progress(1)
                    }
                  }} />
                  <input placeholder="또는 URL 입력" className={`mt-2 w-full rounded-md border px-3 py-2 text-sm ${errors.mp3 ? 'border-red-500' : ''}`} value={form.mp3} onChange={(e) => { setForm({ ...form, mp3: e.target.value }); setErrors((er) => ({ ...er, mp3: undefined })) }} />
                  {uploadMp3Progress > 0 && uploadMp3Progress < 1 ? (
                    <div className="mt-2 h-1 w-full overflow-hidden rounded bg-gray-100">
                      <div className="h-1 bg-violet-600" style={{ width: `${Math.round(uploadMp3Progress * 100)}%` }} />
                    </div>
                  ) : null}
                  {errors.mp3 ? <p className="mt-1 text-xs text-red-600">{errors.mp3}</p> : null}
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">드래그&드롭 또는 파일 선택. data:URL 저장.</p>
            </div>
            {/* 커버 업로드/드롭 */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                e.preventDefault()
                const file = e.dataTransfer.files?.[0]
                if (file && file.type.startsWith('image/')) {
                  const dataUrl = await fileToDataUrl(file)
                  setForm((f) => ({ ...f, cover: dataUrl }))
                }
              }}
              className="rounded-md border border-dashed p-3 text-sm"
            >
              <div className="mb-2 font-medium">커버 이미지</div>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {form.cover ? <img src={form.cover} alt="cover" className="h-12 w-12 rounded object-cover" /> : <div className="h-12 w-12 rounded bg-gray-100" />}
                <div className="flex-1">
                  <input accept="image/*" type="file" onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      if (!file.type.startsWith('image/')) { setErrors((er) => ({ ...er, cover: '이미지 파일만 업로드할 수 있습니다.' })); return }
                      if (file.size > 5 * 1024 * 1024) { setErrors((er) => ({ ...er, cover: '이미지 용량은 5MB를 초과할 수 없습니다.' })); return }
                      setErrors((er) => ({ ...er, cover: undefined }))
                      setUploadCoverProgress(0)
                      const dataUrl = await fileToDataUrl(file, (p) => setUploadCoverProgress(p))
                      setForm((f) => ({ ...f, cover: dataUrl }))
                      setUploadCoverProgress(1)
                    }
                  }} />
                  <input placeholder="또는 URL 입력" className={`mt-2 w-full rounded-md border px-3 py-2 text-sm ${errors.cover ? 'border-red-500' : ''}`} value={form.cover} onChange={(e) => { setForm({ ...form, cover: e.target.value }); setErrors((er) => ({ ...er, cover: undefined })) }} />
                  {uploadCoverProgress > 0 && uploadCoverProgress < 1 ? (
                    <div className="mt-2 h-1 w-full overflow-hidden rounded bg-gray-100">
                      <div className="h-1 bg-violet-600" style={{ width: `${Math.round(uploadCoverProgress * 100)}%` }} />
                    </div>
                  ) : null}
                  {errors.cover ? <p className="mt-1 text-xs text-red-600">{errors.cover}</p> : null}
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">드래그&드롭 또는 파일 선택. data:URL 저장.</p>
            </div>
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2">
            {form.id ? (
              <button type="button" onClick={() => setForm({ id: undefined, title: '', artist: '', mp3: '', cover: '' })} className="rounded-md border px-4 py-2 text-sm">취소</button>
            ) : null}
            <button type="submit" disabled={!form.title || !form.artist || !form.mp3 || !form.cover} className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{form.id ? '수정 저장' : '등록'}</button>
          </div>
        </form>
      </div>

      {preview ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.cover} alt="cover" className="h-14 w-14 rounded object-cover" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">{preview.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{preview.artist}</div>
            </div>
          </div>
          <audio ref={audioRef} src={preview.mp3} preload="metadata" />
          <div className="relative h-16 w-full overflow-hidden rounded-md bg-gradient-to-r from-violet-100 via-indigo-100 to-sky-100 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700">
            <div className="absolute inset-0 flex items-end gap-1 px-3 py-2 opacity-70">
              {Array.from({ length: 80 }).map((_, i) => (
                <div key={i} className={`w-1 ${playing ? 'bg-violet-600' : 'bg-violet-500/70'} dark:bg-violet-400/60`} style={{ height: `${20 + Math.abs(Math.sin(i / 4 + progress * 10)) * 40}%` }} />
              ))}
            </div>
            <button onClick={() => { const a = audioRef.current; if (!a) return; if (playing) { a.pause(); setPlaying(false) } else { a.play(); setPlaying(true) } }} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-violet-600 p-3 text-white shadow hover:bg-violet-700">{playing ? '❚❚' : '▶'}</button>
            <div className="absolute bottom-1 left-0 right-0 h-1 bg-white/60 dark:bg-white/20">
              <div className="h-1 bg-violet-600" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">현재 플레이리스트</h3>
        <div className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
          {filtered.map((m) => (
            <div key={m.id} draggable onDragStart={() => onDragStart(m.id)} onDragOver={(e) => { e.preventDefault(); onDragOver(m.id) }} onDragEnd={onDragEnd} className="flex items-center justify-between gap-3 py-2">
              <div className="flex min-w-0 items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.cover} alt="cover" className="h-10 w-10 rounded object-cover" />
                <div className="min-w-0">
                  <div className="truncate font-medium text-gray-900 dark:text-gray-100">{m.title}</div>
                  <div className="truncate text-gray-500 dark:text-gray-400">{m.artist}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" checked={selected.has(m.id)} onChange={(e) => { const next = new Set(selected); if (e.target.checked) next.add(m.id); else next.delete(m.id); setSelected(next) }} />
                <button onClick={() => setPreview(m)} className="rounded-full border px-3 py-1">미리듣기</button>
                <button onClick={() => setForm({ id: m.id, title: m.title, artist: m.artist, mp3: m.mp3, cover: m.cover })} className="rounded-md border px-2 py-1 text-emerald-700">수정</button>
                <button onClick={() => handleDelete(m.id)} className="rounded-md border px-2 py-1 text-rose-600">삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
