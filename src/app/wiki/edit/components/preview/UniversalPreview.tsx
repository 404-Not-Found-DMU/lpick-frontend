import type { TextBlock, CategoryData, WikiCategory, InfoboxData, TracklistData } from "@/types/hierarchical.editor.types"
import { LivePreview } from "./LivePreview"
import { MarkdownRenderer } from "../common/MarkdownRenderer"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface UniversalPreviewProps {
  category: WikiCategory;
  categoryData: CategoryData;
  textBlocks: TextBlock[];
}

const generateNumbering = (blocks: TextBlock[]): { [id: string]: string } => {
  const numbering: { [id: string]: string } = {};
  const counters = [0, 0, 0]; // for depth 1, 2, 3

  for (const block of blocks) {
    const depthIndex = block.depth - 1;

    counters[depthIndex]++;

    for (let i = depthIndex + 1; i < counters.length; i++) {
      counters[i] = 0;
    }

    const currentNumbering = counters
      .slice(0, depthIndex + 1)
      .filter((c) => c > 0)
      .join('.');
    numbering[block.id] = currentNumbering;
  }
  return numbering;
};

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
};

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
              {fields.map((field) => (
                data[field.key] && (
                  <tr key={field.key} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-3 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">{field.label}</th>
                    <td className="p-3 text-gray-900 dark:text-gray-100">{String(data[field.key])}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function UniversalPreview({ category, categoryData, textBlocks }: UniversalPreviewProps) {
  const numberingMap = generateNumbering(textBlocks);

  const renderCategoryHeader = () => {
    switch (category) {
      case 'lp':
        const lpData = categoryData.data as { infobox: Record<string, unknown>; tracklist: Record<string, unknown> };
        return (
          <div className="flex flex-col sm:flex-row gap-6 mb-8 not-prose">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={String(lpData.infobox.coverUrl || "/placeholder.svg?height=200&width=200")}
              alt="Album cover"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {String(lpData.infobox.title)}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mt-1">{String(lpData.infobox.artist)}</p>
            </div>
          </div>
        );
      
      case 'equipment':
        const equipmentData = categoryData.data as Record<string, unknown>;
        return (
          <div className="flex flex-col sm:flex-row gap-6 mb-8 not-prose">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={String(equipmentData.imageUrl || "/placeholder.svg?height=200&width=200")}
              alt="Equipment image"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {String(equipmentData.name)}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mt-1">{String(equipmentData.brand)}</p>
            </div>
          </div>
        );
      
      case 'artist':
        const artistData = categoryData.data as Record<string, unknown>;
        return (
          <div className="flex flex-col sm:flex-row gap-6 mb-8 not-prose">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={String(artistData.imageUrl || "/placeholder.svg?height=200&width=200")}
              alt="Artist image"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {String(artistData.name)}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mt-1">
                {String(artistData.country)} • {String(artistData.activePeriod)}
              </p>
            </div>
          </div>
        );
      
      case 'other':
        const otherData = categoryData.data as Record<string, unknown>;
        return (
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {String(otherData.title)}
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
          <LivePreview 
            infoboxData={lpData.infobox}
            tracklistData={lpData.tracklist}
            textBlocks={textBlocks}
          />
        );
      
      case 'equipment':
        const equipmentData = categoryData.data as Record<string, unknown>;
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
                    <td className="p-4 text-gray-900 dark:text-gray-100">{String(equipmentData.brand)}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">출시년도</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{String(equipmentData.releaseYear)}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-b-0">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">분류</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{String(equipmentData.equipmentType)}</td>
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
                    data={equipmentData.turntableInfo as Record<string, unknown>}
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
                    data={equipmentData.speakerInfo as Record<string, unknown>}
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
                    data={equipmentData.ampInfo as Record<string, unknown>}
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
                    data={equipmentData.headphoneInfo as Record<string, unknown>}
                    fields={[
                      { key: 'type', label: '헤드폰 형식' },
                      { key: 'impedance', label: '임피던스' }
                    ]}
                  />
                </div>
              </div>
            )}
            
            {textBlocks.map((block) => (
              <section key={block.id} className="mt-6">
                {renderHeading(block, numberingMap[block.id])}
                <div className="prose-p:my-2 prose-blockquote:my-2">
                  <MarkdownRenderer>{block.content}</MarkdownRenderer>
                </div>
              </section>
            ))}
          </div>
        );
      
      case 'artist':
        const artistData = categoryData.data as Record<string, unknown>;
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
                    <td className="p-4 text-gray-900 dark:text-gray-100">{String(artistData.country)}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">활동 기간</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{String(artistData.activePeriod)}</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-b-0">
                    <th className="p-4 text-left font-semibold w-1/3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">역할</th>
                    <td className="p-4 text-gray-900 dark:text-gray-100">
                      {Array.isArray(artistData.roles) && artistData.roles.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {artistData.roles.map((role: unknown, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md text-sm"
                            >
                              {String(role)}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 소개글 */}
            {artistData.introduction && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">소개</h3>
                </div>
                <div className="p-6">
                  <MarkdownRenderer>{String(artistData.introduction)}</MarkdownRenderer>
                </div>
              </div>
            )}

            {/* 디스코그래피 */}
            {Array.isArray(artistData.discography) && artistData.discography.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">디스코그래피</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {artistData.discography.map((item: unknown, index: number) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="font-medium">{(item as Record<string, unknown>).title as string}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {(item as Record<string, unknown>).releaseDate as string} • {(item as Record<string, unknown>).type as string} • {(item as Record<string, unknown>).role as string}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 활동 이력 */}
            {Array.isArray(artistData.activities) && artistData.activities.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">활동 이력</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {artistData.activities.map((item: unknown, index: number) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="font-medium">{(item as Record<string, unknown>).title as string}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {(item as Record<string, unknown>).year as string} • {(item as Record<string, unknown>).type as string}
                        </div>
                        <div className="text-sm mt-1">{(item as Record<string, unknown>).description as string}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {textBlocks.map((block) => (
              <section key={block.id} className="mt-6">
                {renderHeading(block, numberingMap[block.id])}
                <div className="prose-p:my-2 prose-blockquote:my-2">
                  <MarkdownRenderer>{block.content}</MarkdownRenderer>
                </div>
              </section>
            ))}
          </div>
        );
      
      case 'other':
        const otherData = categoryData.data as Record<string, unknown>;
        return (
          <div className="space-y-8">
            {/* 마크다운 내용 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden not-prose border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <MarkdownRenderer>{String(otherData.content)}</MarkdownRenderer>
              </div>
            </div>
            
            {textBlocks.map((block) => (
              <section key={block.id} className="mt-6">
                {renderHeading(block, numberingMap[block.id])}
                <div className="prose-p:my-2 prose-blockquote:my-2">
                  <MarkdownRenderer>{block.content}</MarkdownRenderer>
                </div>
              </section>
            ))}
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
    </article>
  );
} 