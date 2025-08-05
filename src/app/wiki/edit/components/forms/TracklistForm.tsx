"use client"

import * as React from "react"
import { Input } from "@/components/Input/Input"
import { Button } from "@/components/Button"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { nanoid } from "nanoid"
import type { Track, TracklistData } from "@/types/hierarchical.editor.types"

function SortableTrackRow({
  track,
  onTrackChange,
  onDeleteTrack,
}: {
  track: Track
  onTrackChange: (id: string, field: keyof Omit<Track, "id">, value: string) => void
  onDeleteTrack: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: track.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2">
      <Button variant="ghost" size="sm" {...attributes} {...listeners} className="cursor-grab h-9 w-9 flex-shrink-0">
        <GripVertical className="w-4 h-4 text-gray-500" />
      </Button>
      <div className="flex-1 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm border border-input rounded-md flex items-center justify-center">
        {track.number || "#"}
      </div>
      <Input
        value={track.title}
        onChange={(e) => onTrackChange(track.id, "title", e.target.value)}
        placeholder="곡 제목"
        className="flex-3 bg-white dark:bg-gray-700"
      />
      <Input
        value={track.length}
        onChange={(e) => onTrackChange(track.id, "length", e.target.value)}
        placeholder="길이"
        className="flex-2 bg-white dark:bg-gray-700"
      />
      <Button variant="ghost" size="icon" onClick={() => onDeleteTrack(track.id)} className="h-9 w-9 flex-shrink-0">
        <Trash2 className="w-3 h-3 text-lavender-400" />
      </Button>
    </div>
  )
}

export function TracklistForm({ data, onUpdate }: { data: TracklistData; onUpdate: (data: TracklistData) => void }) {
  const tracks = React.useMemo(() => data.tracks || [], [data.tracks])

  // 초기 로드 시 번호가 없으면 자동으로 번호 매기기
  React.useEffect(() => {
    if (tracks.length > 0 && tracks.some(track => !track.number)) {
      onUpdate({ tracks: updateTrackNumbers(tracks) })
    }
  }, [tracks, onUpdate])

  const handleTrackChange = (id: string, field: keyof Omit<Track, "id">, value: string) => {
    const newTracks = tracks.map((track) => (track.id === id ? { ...track, [field]: value } : track))
    onUpdate({ tracks: newTracks })
  }

  const updateTrackNumbers = (tracks: Track[]) => {
    return tracks.map((track, index) => ({
      ...track,
      number: (index + 1).toString()
    }))
  }

  const addTrack = () => {
    const newTracks = [...tracks, { id: nanoid(), number: "", title: "", length: "" }]
    onUpdate({ tracks: updateTrackNumbers(newTracks) })
  }

  const deleteTrack = (id: string) => {
    const newTracks = tracks.filter((track) => track.id !== id)
    onUpdate({ tracks: updateTrackNumbers(newTracks) })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = tracks.findIndex((t) => t.id === active.id)
      const newIndex = tracks.findIndex((t) => t.id === over.id)
      const reorderedTracks = arrayMove(tracks, oldIndex, newIndex)
      onUpdate({ tracks: updateTrackNumbers(reorderedTracks) })
    }
  }

  return (
    <div className="space-y-3">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tracks} strategy={verticalListSortingStrategy}>
          {tracks.map((track) => (
            <SortableTrackRow
              key={track.id}
              track={track}
              onTrackChange={handleTrackChange}
              onDeleteTrack={deleteTrack}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" onClick={addTrack} className="w-full mt-2 bg-transparent">
        <Plus className="w-4 h-4 mr-2" />
        트랙 추가
      </Button>
    </div>
  )
}
