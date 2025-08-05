import { MarkdownRenderer } from "../common/MarkdownRenderer"
import type { InfoboxData, TracklistData, TextBlock } from "@/types/hierarchical.editor.types"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import type { LPInfo } from "@/types/hierarchical.editor.types"

interface LivePreviewProps {
  infoboxData: InfoboxData
  tracklistData: TracklistData
  textBlocks: TextBlock[]
}

const generateNumbering = (blocks: TextBlock[]): { [id: string]: string } => {
  const numbering: { [id: string]: string } = {}
  const counters = [0, 0, 0] // for depth 1, 2, 3

  for (const block of blocks) {
    const depthIndex = block.depth - 1
    counters[depthIndex]++
    for (let i = depthIndex + 1; i < counters.length; i++) {
      counters[i] = 0
    }
    const currentNumbering = counters
      .slice(0, depthIndex + 1)
      .filter((c) => c > 0)
      .join(".")
    numbering[block.id] = currentNumbering
  }
  return numbering
}

interface LPAccordionProps {
  lp: LPInfo
  index: number
}


function LPAccordion({ lp, index }: LPAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasAnyData = lp.material || lp.rpm || lp.diameter || lp.weight || 
    lp.pressingCountry || lp.pressingInfo ||
    lp.isColored !== undefined || lp.labelType || lp.format || lp.specialNotes

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div 
        className="px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              LP #{index + 1}
            </span>
            {lp.alias && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {lp.alias}
              </span>
            )}
            {lp.isColored !== undefined && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                lp.isColored 
                  ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                {lp.isColored ? '컬러판' : '일반 블랙판'}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {isExpanded && hasAnyData && (
        <div className="px-6 pb-4">
          <table className="w-full text-sm">
            <tbody>
              {lp.material && (
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">재질</th>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{lp.material}</td>
                </tr>
              )}
              {lp.rpm && (
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">RPM</th>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{lp.rpm}</td>
                </tr>
              )}
              {lp.diameter && (
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">직경</th>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{lp.diameter}</td>
                </tr>
              )}
              {lp.weight && (
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">무게/그램수</th>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{lp.weight}</td>
                </tr>
              )}
              {lp.pressingCountry && (
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">제조국/프레싱 국가</th>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{lp.pressingCountry}</td>
                </tr>
              )}
              {lp.pressingInfo && (
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">프레싱 정보</th>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{lp.pressingInfo}</td>
                </tr>
              )}
              {lp.labelType && (
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">라벨</th>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{lp.labelType}</td>
                </tr>
              )}
              {lp.format && (
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">수록 방식</th>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{lp.format}</td>
                </tr>
              )}
              {lp.specialNotes && (
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-b-0">
                  <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">특이사항</th>
                  <td className="p-3 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{lp.specialNotes}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const renderHeading = (block: TextBlock, numbering: string) => {
  const titleContent = (
    <>
      <span className="text-lavender-600 dark:text-lavender-400 mr-1">{numbering}</span> {block.title}
    </>
  )
  switch (block.depth) {
    case 1:
      return <h2 className="text-2xl font-bold border-b pb-2 mb-4">{titleContent}</h2>
    case 2:
      return <h3 className="text-xl font-bold mb-3">{titleContent}</h3>
    case 3:
      return <h4 className="text-lg font-bold mb-2">{titleContent}</h4>
    default:
      return <h2 className="text-2xl font-bold border-b pb-2 mb-4">{titleContent}</h2>
  }
}

export function LivePreview({ infoboxData, tracklistData, textBlocks }: LivePreviewProps) {
  const numberingMap = generateNumbering(textBlocks)

  return (
    <article className="prose dark:prose-invert max-w-none">
      <div className="flex flex-col sm:flex-row gap-6 mb-8 not-prose">
        <Image
          src={infoboxData.coverUrl || "/placeholder.svg?height=200&width=200"}
          alt="Album cover"
          width={192}
          height={192}
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            {infoboxData.title}
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mt-1">{infoboxData.artist}</p>
        </div>
      </div>

      {/* 기본 정보 테이블 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose mb-8 border border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-lavender-600 to-lavender-400 px-6 py-4">
          <h3 className="text-lg font-bold text-white">기본 정보</h3>
        </div>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">발매일</th>
              <td className="p-4 text-gray-900 dark:text-gray-100">{infoboxData.releaseDate}</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">장르</th>
              <td className="p-4 text-gray-900 dark:text-gray-100">{infoboxData.genre}</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-b-0">
              <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">레이블</th>
              <td className="p-4 text-gray-900 dark:text-gray-100">{infoboxData.label}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* LP 정보 아코디언 */}
      {infoboxData.lpInfos && infoboxData.lpInfos.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose mb-8 border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-lavender-600 to-lavender-400 px-6 py-4">
            <h3 className="text-lg font-bold text-white">LP 정보</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {infoboxData.lpInfos.map((lp, index) => (
              <LPAccordion key={lp.id} lp={lp} index={index} />
            ))}
          </div>
        </div>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">트랙리스트</h2>
        <ol className="list-decimal list-inside space-y-2 not-prose">
          {tracklistData.tracks.map((track) => (
            <li key={track.id} className="flex justify-between">
              <span>{track.title}</span>
              <span className="text-gray-500 dark:text-gray-400">{track.length}</span>
            </li>
          ))}
        </ol>
      </section>

      {textBlocks.map((block) => (
        <section key={block.id} className="mt-6">
          {renderHeading(block, numberingMap[block.id])}
          <div className="prose-p:my-2 prose-blockquote:my-2">
            <MarkdownRenderer>{block.content}</MarkdownRenderer>
          </div>
        </section>
      ))}
    </article>
  )
}
