"use client"
import type { CategoryData } from "@/types/hierarchical.editor.types"

export function deriveTitleFromCategoryData(cd?: CategoryData): string {
  if (!cd) return "문서"
  switch (cd.type) {
    case "lp":
      return cd.data.infobox.title || "문서"
    case "artist":
      return cd.data.name || "문서"
    case "equipment":
      return cd.data.name || "문서"
    case "other":
      return cd.data.title || "문서"
    default:
      return "문서"
  }
}

