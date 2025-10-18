"use client"

import { useState, useEffect } from "react"
import { Button, Card } from "@/components"
import { RadioGroup, RadioGroupItem } from "@/components/radio-group"
import { Label } from "@/components/label"
import { ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Question {
  text: string
  axis: string
  weight: number
}

interface LPTIResult {
  code: string
  nickname: string
  description: string
  icon: string
}

const lptiQuestions: Question[] = [
  // 🔹 E / C (Energy vs Calm)
  { text: "나는 잔잔한 음악보다 신나고 리듬감 있는 음악을 더 좋아한다.", axis: "EC", weight: 0.36 },
  { text: "나는 느린 템포의 음악보다 빠르고 활기찬 음악을 더 자주 듣는다.", axis: "EC", weight: 0.33 },
  { text: "음악을 들을 때, 에너지가 넘치는 분위기가 나를 더 몰입하게 만든다.", axis: "EC", weight: 0.3 },

  // 🔹 A / M (Analog vs Modern)
  { text: "나는 최신 사운드보다 옛날 느낌의 아날로그 사운드를 더 좋아한다.", axis: "AM", weight: 0.36 },
  { text: "나는 새롭고 세련된 음악보다 따뜻하고 익숙한 음악을 들을 때 더 편안하다.", axis: "AM", weight: 0.33 },
  { text: "빈티지한 음색이나 노이즈가 섞인 음악이 오히려 감성적으로 느껴진다.", axis: "AM", weight: 0.3 },

  // 🔹 I / V (Instrumental vs Vocal)
  { text: "나는 가수의 목소리보다 악기 연주 소리를 더 즐겨 듣는다.", axis: "IV", weight: 0.36 },
  { text: "나는 가사의 의미보다 멜로디나 연주의 분위기를 더 중요하게 생각한다.", axis: "IV", weight: 0.33 },
  { text: "가사가 없는 연주곡에서도 충분히 감정을 느낄 수 있다고 생각한다.", axis: "IV", weight: 0.3 },

  // 🔹 E / S (Experimental vs Stable)
  { text: "나는 유명하고 대중적인 노래보다 특이하고 덜 알려진 노래를 더 좋아한다.", axis: "ES", weight: 0.33 },
  { text: "나는 안정적이고 익숙한 음악보다 새롭고 실험적인 음악을 들을 때 더 흥미롭다.", axis: "ES", weight: 0.36 },
  { text: "전통적인 음악 형식보다 예측할 수 없는 전개나 사운드가 더 매력적으로 느껴진다.", axis: "ES", weight: 0.3 },
]

const lptiResults: Record<string, LPTIResult> = {
  EAIE: {
    code: "EAIE",
    icon: "⚡",
    nickname: "실험적 연주가 (Experimental Player)",
    description:
      "에너지가 넘치고 창의적인 음악을 즐긴다. 가사보다 소리와 리듬의 흐름에서 몰입을 느끼며, 일렉트로닉·퓨전·프로그레시브 계열을 선호한다.",
  },
  EAIS: {
    code: "EAIS",
    icon: "🌿",
    nickname: "따뜻한 클래식리스트 (Warm Classicist)",
    description:
      "따뜻하고 인간적인 감성을 지닌 음악을 좋아한다. 아날로그한 음색과 서정적인 분위기에서 편안함을 찾는다. 재즈, 소울, 포크 계열에 익숙하다.",
  },
  EAVE: {
    code: "EAVE",
    icon: "🎷",
    nickname: "빈티지 모험가 (Vintage Explorer)",
    description:
      "복고적인 감성과 실험적 요소를 동시에 즐긴다. 옛날 음악의 질감 속에서 새로운 해석을 추구하며, 인디록·시티팝·레트로 신스를 선호한다.",
  },
  EAVS: {
    code: "EAVS",
    icon: "🎙",
    nickname: "감성적 퍼포머 (Emotive Performer)",
    description:
      "리듬감 있고 따뜻한 음악으로 사람들과 감정을 나눈다. 팝, 어쿠스틱, 감성 R&B 등 감정 전달이 중요한 음악을 좋아한다.",
  },
  EMIE: {
    code: "EMIE",
    icon: "🔊",
    nickname: "미래지향 연주가 (Futuristic Player)",
    description:
      "빠른 비트와 세련된 사운드를 탐구하는 혁신가형. 사운드 구조나 믹싱의 완성도를 즐기며, EDM·록·일렉트로닉 계열에 몰입한다.",
  },
  EMIS: {
    code: "EMIS",
    icon: "💎",
    nickname: "세련된 감성가 (Polished Romanticist)",
    description:
      "현대적인 감성 속에서도 따뜻한 정서를 중시한다. 세련되지만 따뜻한 멜로디를 선호하며, 발라드·모던팝을 자주 듣는다.",
  },
  EMVE: {
    code: "EMVE",
    icon: "🌈",
    nickname: "감각적 트렌드메이커 (Emotive Trendsetter)",
    description:
      "현대적인 트렌드를 빠르게 흡수하고 표현하는 타입. 실험적이면서도 대중성을 잃지 않는다. 하이퍼팝, 뉴웨이브, 컨템포러리 팝에 강하다.",
  },
  EMVS: {
    code: "EMVS",
    icon: "🎧",
    nickname: "트렌디 리스너 (Trendy Listener)",
    description: "대중적이지만 감각 있는 리스너. 세련된 프로덕션과 리듬감이 돋보이는 팝·K-POP·R&B 계열을 즐긴다.",
  },
  CAIE: {
    code: "CAIE",
    icon: "🔬",
    nickname: "섬세한 사운드 디자이너 (Delicate Sound Designer)",
    description:
      "차분하고 분석적인 음악 애호가. 악기의 질감, 음향 밸런스를 섬세하게 감상하며, 앰비언트·미니멀 계열을 즐긴다.",
  },
  CAIS: {
    code: "CAIS",
    icon: "🪞",
    nickname: "고요한 클래식리스트 (Silent Classicist)",
    description:
      "고요하고 안정된 음악을 사랑한다. 클래식, 뉴에이지, 힐링음악처럼 균형과 조화가 느껴지는 사운드를 선호한다.",
  },
  CAVE: {
    code: "CAVE",
    icon: "🌌",
    nickname: "몽환적 표현자 (Dreamy Expressor)",
    description:
      "감정적이지만 차분한 스타일로, 실험적 감성에 끌린다. 드림팝·얼터너티브 계열을 즐기며 감정과 사운드의 융합을 좋아한다.",
  },
  CAVS: {
    code: "CAVS",
    icon: "☕",
    nickname: "감성적인 안정가 (Emotional Stabilizer)",
    description:
      "따뜻한 멜로디와 안정적인 보컬에 깊이 공감한다. 포크, 재즈, 발라드처럼 잔잔하고 인간적인 음악을 선호한다.",
  },
  CMIE: {
    code: "CMIE",
    icon: "🔮",
    nickname: "미니멀 실험가 (Minimal Experimentalist)",
    description: "간결함 속에서 새로움을 찾는 모던한 창작자. 미니멀 테크노, Lo-Fi, 사운드 아트 계열에 흥미가 많다.",
  },
  CMIS: {
    code: "CMIS",
    icon: "🧊",
    nickname: "절제된 모더니스트 (Modern Purist)",
    description:
      "질서 있고 세련된 음악을 선호한다. 불필요한 장식보다 구조적 완성도를 중요시하며, 모던 재즈·R&B 계열을 즐긴다.",
  },
  CMVE: {
    code: "CMVE",
    icon: "🪄",
    nickname: "세련된 창조자 (Sophisticated Creator)",
    description:
      "현대적 감각과 실험 정신을 겸비한 창조형 리스너. 대중음악 안에서도 새로운 시도를 탐구하며, 하우스·얼터팝을 즐긴다.",
  },
  CMVS: {
    code: "CMVS",
    icon: "🏙",
    nickname: "트렌디 미니멀리스트 (Trendy Minimalist)",
    description:
      "최신 사운드와 간결한 프로덕션을 선호한다. 미니멀 팝, Lo-Fi, 뉴트로 계열에서 감각적인 완성도를 추구한다.",
  },
}

export default function LPTIPage() {
  const [currentStep, setCurrentStep] = useState<"intro" | "test" | "result">("intro")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [result, setResult] = useState<LPTIResult | null>(null)

  useEffect(() => {
    // Shuffle questions on mount
    const shuffled = [...lptiQuestions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
  }, [])

  const handleStart = () => {
    setCurrentStep("test")
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: value })
  }

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateResult()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateResult = () => {
    const scores = { EC: 0, AM: 0, IV: 0, ES: 0 }

    shuffledQuestions.forEach((question, index) => {
      const answer = answers[index] ?? 0 // Default to 0 (neutral)
      const score = (answer - 3) * question.weight // Convert 1-5 to -2 to +2
      scores[question.axis as keyof typeof scores] += score
    })

    // Determine the code based on scores
    const code =
      (scores.EC > 0 ? "E" : "C") +
      (scores.AM > 0 ? "A" : "M") +
      (scores.IV > 0 ? "I" : "V") +
      (scores.ES > 0 ? "E" : "S")

    setResult(lptiResults[code])
    setCurrentStep("result")
  }

  const handleRetry = () => {
    setCurrentStep("intro")
    setCurrentQuestionIndex(0)
    setAnswers({})
    setResult(null)
    // Re-shuffle questions
    const shuffled = [...lptiQuestions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
  }

  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100

  if (currentStep === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로
          </Link>

          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                LPTI 검사
              </h1>
              <p className="text-lg text-muted-foreground">LP Taste Indicator</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">나의 음악 취향은?</h2>
                <p className="text-muted-foreground">12개의 질문으로 당신의 음악 성향을 분석합니다.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-medium">Energy vs Calm</div>
                  <div className="text-sm text-muted-foreground">에너지 vs 차분함</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">🎵</div>
                  <div className="font-medium">Analog vs Modern</div>
                  <div className="text-sm text-muted-foreground">아날로그 vs 모던</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">🎸</div>
                  <div className="font-medium">Instrumental vs Vocal</div>
                  <div className="text-sm text-muted-foreground">연주 vs 보컬</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="font-medium">Experimental vs Stable</div>
                  <div className="text-sm text-muted-foreground">실험적 vs 안정적</div>
                </div>
              </div>
            </div>

            <Button onClick={handleStart} size="lg" className="w-full">
              검사 시작하기
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === "test" && shuffledQuestions.length > 0) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    const currentAnswer = answers[currentQuestionIndex]

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                질문 {currentQuestionIndex + 1} / {shuffledQuestions.length}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded">
              <div
                className="h-2 bg-violet-500 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">{currentQuestion.text}</h2>

            <RadioGroup name="lpti-answer">
              <div className="space-y-3">
                {[
                  { value: 1, label: "전혀 아니다" },
                  { value: 2, label: "아니다" },
                  { value: 3, label: "보통이다" },
                  { value: 4, label: "그렇다" },
                  { value: 5, label: "매우 그렇다" },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      currentAnswer === option.value
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20"
                        : "hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => handleAnswer(option.value)}
                  >
                    <RadioGroupItem
                      name="lpti-answer"
                      value={option.value.toString()}
                      id={`option-${option.value}`}
                      checked={currentAnswer === option.value}
                      onChange={() => handleAnswer(option.value)}
                    />
                    <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex gap-3 mt-8">
              {currentQuestionIndex > 0 && (
                <Button onClick={handlePrevious} variant="outline" className="flex-1 bg-transparent">
                  이전
                </Button>
              )}
              <Button onClick={handleNext} disabled={!currentAnswer} variant="violet" className="flex-1">
                {currentQuestionIndex === shuffledQuestions.length - 1 ? "결과 보기" : "다음"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === "result" && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{result.icon}</div>
              <h1 className="text-3xl font-bold mb-2">{result.code}</h1>
              <p className="text-xl text-muted-foreground mb-6">{result.nickname}</p>
              <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-lg">
                <p className="text-lg leading-relaxed">{result.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button onClick={handleRetry} variant="outline" className="w-full bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 검사하기
              </Button>
              <Link href="/" className="block">
                <Button variant="violet" className="w-full">
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
