"use client"
import React from "react"
import { MarkdownRenderer } from "../common/MarkdownRenderer"
import type { 
  InfoboxData, 
  TracklistData, 
  TextBlock, 
  CategoryData, 
  WikiCategory,
  LPInfo,
  EquipmentInfo,
  ArtistInfo,
  OtherInfo
} from "@/types/hierarchical.editor.types"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface LivePreviewProps {
  category: WikiCategory;
  categoryData: CategoryData;
  textBlocks: TextBlock[];
}

// 기존 LP 전용 props를 위한 오버로드
interface LivePreviewLPProps {
  infoboxData: InfoboxData;
  tracklistData: TracklistData;
  textBlocks: TextBlock[];
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

// 라벨 매핑 및 불린 포매터
const roleLabelMap: Record<string, string> = {
  composer: '작곡가',
  singer: '가수',
  group: '그룹',
  producer: '프로듀서',
  arranger: '편곡가',
  instrumentalist: '연주자',
  other: '기타',
}

const equipmentTypeLabelMap: Record<string, string> = {
  turntable: '턴테이블',
  speaker: '스피커',
  amp: '앰프',
  headphone: '헤드폰',
  other: '기타',
}

const formatBooleanKo = (v: unknown) => (v ? '예' : '아니오')

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

// 장비 정보 아코디언 컴포넌트
interface EquipmentAccordionProps {
  title: string;
  data: Record<string, unknown>;
  fields: { key: string; label: string }[];
}

function EquipmentAccordion({ title, data, fields }: EquipmentAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasAnyData = fields.some(field => data[field.key]);

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
              {title}
            </span>
          </div>
        </div>
      </div>
      
      {isExpanded && hasAnyData && (
        <div className="px-6 pb-4">
          <table className="w-full text-sm">
            <tbody>
              {fields.map((field) => {
                const value = data[field.key];
                const displayValue = typeof value === 'boolean' ? formatBooleanKo(value) : String(value);
                return value !== undefined && value !== '' ? (
                  <tr key={field.key} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">{field.label}</th>
                    <td className="p-3 text-gray-900 dark:text-gray-100">{displayValue}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
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

// 오버로드된 함수 시그니처
export function LivePreview(props: LivePreviewProps): React.JSX.Element;
export function LivePreview(props: LivePreviewLPProps): React.JSX.Element;
export function LivePreview(props: LivePreviewProps | LivePreviewLPProps): React.JSX.Element {
  // 기존 LP 전용 props인지 확인
  if ('infoboxData' in props && 'tracklistData' in props) {
    const { infoboxData, tracklistData, textBlocks } = props;
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
          <section id={block.id} key={block.id} className="mt-6 scroll-mt-24">
            {renderHeading(block, generateNumbering(textBlocks)[block.id])}
            <div className="prose-p:my-2 prose-blockquote:my-2">
              <MarkdownRenderer>{block.content}</MarkdownRenderer>
            </div>
          </section>
        ))}
      </article>
    );
  }

  // Universal props 처리
  const { category, categoryData, textBlocks } = props;
  const numberingMap = generateNumbering(textBlocks);

  const renderCategoryHeader = () => {
    switch (category) {
      case 'lp':
        const lpData = categoryData.data as { infobox: InfoboxData; tracklist: TracklistData };
        return (
          <div className="flex flex-col sm:flex-row gap-6 mb-8 not-prose">
            <Image
              src={lpData.infobox.coverUrl || "/placeholder.svg?height=200&width=200"}
              alt="Album cover"
              width={192}
              height={192}
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {lpData.infobox.title}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mt-1">{lpData.infobox.artist}</p>
            </div>
          </div>
        );
      
      case 'equipment':
        const equipmentData = categoryData.data as EquipmentInfo;
        return (
          <div className="flex flex-col sm:flex-row gap-6 mb-8 not-prose">
            <Image
              src={equipmentData.imageUrl || "/placeholder.svg?height=200&width=200"}
              alt="Equipment image"
              width={192}
              height={192}
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {equipmentData.name}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mt-1">{equipmentData.brand}</p>
            </div>
          </div>
        );
      
      case 'artist':
        const artistData = categoryData.data as ArtistInfo;
        return (
          <div className="flex flex-col sm:flex-row gap-6 mb-8 not-prose">
            <Image
              src={artistData.imageUrl || "/placeholder.svg?height=200&width=200"}
              alt="Artist image"
              width={192}
              height={192}
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {artistData.name}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mt-1">
                {artistData.country} • {artistData.activePeriod}
              </p>
            </div>
          </div>
        );
      
      case 'other':
        const otherData = categoryData.data as OtherInfo;
        return (
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {otherData.title}
            </h1>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderCategoryInfo = () => {
    switch (category) {
      case 'lp':
        const lpData = categoryData.data as { infobox: InfoboxData; tracklist: TracklistData };
        return (
          <>
            {/* 기본 정보 테이블 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose mb-8 border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-lavender-600 to-lavender-400 px-6 py-4">
                <h3 className="text-lg font-bold text-white">기본 정보</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">발매일</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{lpData.infobox.releaseDate}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">장르</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{lpData.infobox.genre}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-b-0">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">레이블</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{lpData.infobox.label}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* LP 정보 아코디언 */}
            {lpData.infobox.lpInfos && lpData.infobox.lpInfos.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose mb-8 border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-lavender-600 to-lavender-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">LP 정보</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {lpData.infobox.lpInfos.map((lp, index) => (
                    <LPAccordion key={lp.id} lp={lp} index={index} />
                  ))}
                </div>
              </div>
            )}

            <section className="mb-8">
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">트랙리스트</h2>
              <ol className="list-decimal list-inside space-y-2 not-prose">
                {lpData.tracklist.tracks.map((track) => (
                  <li key={track.id} className="flex justify-between">
                    <span>{track.title}</span>
                    <span className="text-gray-500 dark:text-gray-400">{track.length}</span>
                  </li>
                ))}
              </ol>
            </section>
          </>
        );
      
      case 'equipment':
        const equipmentData = categoryData.data as EquipmentInfo;
        return (
          <div className="space-y-8">
            {/* 기본 정보 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-4">
                <h3 className="text-lg font-bold text-white">기본 정보</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">브랜드</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{equipmentData.brand}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">출시년도</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{equipmentData.releaseYear}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-b-0">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">분류</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{equipmentTypeLabelMap[equipmentData.equipmentType] || equipmentData.equipmentType}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 분류별 상세 정보 */}
            {equipmentData.turntableInfo && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">턴테이블 상세 정보</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <EquipmentAccordion
                    title="턴테이블 정보"
                    data={equipmentData.turntableInfo as unknown as Record<string, unknown>}
                    fields={[
                      { key: 'rotationSpeed', label: '회전속도' },
                      { key: 'driveType', label: '구동 방식' },
                      { key: 'tonearmType', label: '톤암 종류' }
                    ]}
                  />
                </div>
              </div>
            )}
            
            {equipmentData.speakerInfo && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">스피커 상세 정보</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <EquipmentAccordion
                    title="스피커 정보"
                    data={equipmentData.speakerInfo as unknown as Record<string, unknown>}
                    fields={[
                      { key: 'type', label: '스피커 방식' },
                      { key: 'enclosureType', label: '인클로저 형태' },
                      { key: 'output', label: '출력' }
                    ]}
                  />
                </div>
              </div>
            )}
            
            {equipmentData.ampInfo && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">앰프 상세 정보</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <EquipmentAccordion
                    title="앰프 정보"
                    data={equipmentData.ampInfo as unknown as Record<string, unknown>}
                    fields={[
                      { key: 'output', label: '출력 (W)' },
                      { key: 'inputTerminals', label: '입력단자' },
                      { key: 'hasVacuumTubes', label: '진공관' }
                    ]}
                  />
                </div>
              </div>
            )}
            
            {equipmentData.headphoneInfo && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">헤드폰 상세 정보</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <EquipmentAccordion
                    title="헤드폰 정보"
                    data={equipmentData.headphoneInfo as unknown as Record<string, unknown>}
                    fields={[
                      { key: 'type', label: '헤드폰 형식' },
                      { key: 'impedance', label: '임피던스' }
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        );
      
      case 'artist':
        const artistData = categoryData.data as ArtistInfo;
        return (
          <div className="space-y-8">
            {/* 기본 정보 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-4">
                <h3 className="text-lg font-bold text-white">기본 정보</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">국가</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{artistData.country}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">활동 기간</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{artistData.activePeriod}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-b-0">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">역할</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">
                      {artistData.roles && artistData.roles.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {artistData.roles.map((role, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md text-sm"
                            >
                              {roleLabelMap[role] || role}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 디스코그래피 */}
            {artistData.discography && artistData.discography.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">디스코그래피</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {artistData.discography.map((item, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.releaseDate} • {item.type} • {item.role}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 활동 이력 */}
            {artistData.activities && artistData.activities.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">활동 이력</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {artistData.activities.map((item, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.year} • {item.type}
                        </div>
                        <div className="text-sm mt-1">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'other':
        const otherData = categoryData.data as OtherInfo;
        return (
          <div className="space-y-8">
            {/* 마크다운 내용 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <MarkdownRenderer>{otherData.content}</MarkdownRenderer>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <article className="prose dark:prose-invert max-w-none">
      {renderCategoryHeader()}
      {renderCategoryInfo()}
      
      {/* 텍스트 블록들 */}
      {textBlocks.map((block) => (
        <section id={block.id} key={block.id} className="mt-6 scroll-mt-24">
          {renderHeading(block, numberingMap[block.id])}
          <div className="prose-p:my-2 prose-blockquote:my-2">
            <MarkdownRenderer>{block.content}</MarkdownRenderer>
          </div>
        </section>
      ))}
    </article>
  );
}
