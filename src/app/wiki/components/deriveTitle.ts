"use client"
import type { CategoryData } from "@/types/hierarchical.editor.types"

export function deriveTitleFromCategoryData(cd?: CategoryData): string {
  if (!cd) return "문서"
  switch (cd.type) {
    case "lp":
      return (cd as any)?.data?.infobox?.title || "문서"
    case "artist":
      return (cd as any)?.data?.name || "문서"
    case "equipment":
      return (cd as any)?.data?.name || "문서"
    case "other":
      return (cd as any)?.data?.title || "문서"
    default:
      return "문서"
  }
}

