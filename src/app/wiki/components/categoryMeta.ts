import type { WikiCategory } from "@/types/hierarchical.editor.types"

export const CATEGORY_META: Record<WikiCategory, {
  label: string
  badgeClassName: string
  linkColorClass: string
  editPath: string
}> = {
  artist: { label: "아티스트", badgeClassName: "bg-purple-500/10 text-purple-500", linkColorClass: "text-purple-500", editPath: "artist" },
  lp: { label: "음반", badgeClassName: "bg-violet-500/10 text-violet-500", linkColorClass: "text-violet-500", editPath: "lp" },
  equipment: { label: "장비", badgeClassName: "bg-green-500/10 text-green-500", linkColorClass: "text-green-500", editPath: "equipment" },
  other: { label: "기타", badgeClassName: "bg-orange-500/10 text-orange-500", linkColorClass: "text-orange-500", editPath: "other" },
}

