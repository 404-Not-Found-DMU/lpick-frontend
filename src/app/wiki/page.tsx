"use client"

import { Search, Plus, TrendingUp, Clock, Users, BookOpen, Music, Headphones, User, FileText } from "lucide-react"
import { Input, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components"
import { useState } from "react"
import Link from "next/link"

const categories = [
  {
    id: "album",
    title: "LP (음반)",
    description: "LP 음반에 대한 정보를 작성합니다",
    icon: <Music className="w-8 h-8 text-violet-500" />,
    color: "bg-violet-50 hover:bg-violet-100 border-violet-200",
    href: "/wiki/edit?category=album",
  },
  {
    id: "equipment",
    title: "장비",
    description: "턴테이블, 앰프, 스피커 등 오디오 장비 정보를 작성합니다",
    icon: <Headphones className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    href: "/wiki/edit?category=equipment",
  },
  {
    id: "artist",
    title: "아티스트",
    description: "음악가, 밴드, 프로듀서 등에 대한 정보를 작성합니다",
    icon: <User className="w-8 h-8 text-green-500" />,
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    href: "/wiki/edit?category=artist",
  },
  {
    id: "other",
    title: "기타 (Other)",
    description: "레이블, 장르, 기타 음악 관련 정보를 작성합니다",
    icon: <FileText className="w-8 h-8 text-orange-500" />,
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
    href: "/wiki/edit?category=other",
  },
]

const recentArticles = [
  { title: "Pink Floyd - The Dark Side of the Moon", category: "LP", time: "5분 전", author: "음악덕후" },
  { title: "Technics SL-1200MK7", category: "장비", time: "12분 전", author: "턴테이블매니아" },
  { title: "아이유", category: "아티스트", time: "23분 전", author: "K-POP팬" },
  { title: "Blue Note Records", category: "기타", time: "1시간 전", author: "재즈러버" },
  { title: "Miles Davis - Kind of Blue", category: "LP", time: "2시간 전", author: "재즈마스터" },
]

const popularArticles = [
  { title: "Pink Floyd - The Dark Side of the Moon", views: 1234, category: "LP" },
  { title: "Technics SL-1200MK7", views: 987, category: "장비" },
  { title: "The Beatles - Abbey Road", views: 856, category: "LP" },
  { title: "Audio-Technica AT-LP120XUSB", views: 743, category: "장비" },
  { title: "아이유", views: 692, category: "아티스트" },
]

const stats = [
  { label: "총 문서 수", value: "2,847", icon: <BookOpen className="w-5 h-5" /> },
  { label: "활성 편집자", value: "156", icon: <Users className="w-5 h-5" /> },
  { label: "이번 달 편집", value: "1,023", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "새 문서", value: "47", icon: <Plus className="w-5 h-5" /> },
]

const WikiRootPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800/50">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">LPick 위키</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              LP 음반, 아티스트, 장비에 대한 모든 정보를 찾고 공유하는 공간입니다. 함께 만들어가는 음악 애호가들의 지식
              저장소입니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="음반, 아티스트, 장비 검색..."
                  className="pl-12 py-3 h-14 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm focus:ring-violet-500 rounded-full text-base w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="violet" size="lg" className="h-14 px-8 rounded-full">
                    <Plus className="w-5 h-5 mr-2" />새 문서 만들기
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">새 문서 만들기</DialogTitle>
                    <p className="text-gray-600 dark:text-gray-400">작성할 문서의 카테고리를 선택해주세요.</p>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                    {categories.map((category) => (
                      <Link key={category.id} href={category.href} onClick={() => setIsModalOpen(false)}>
                        <Card
                          className={`h-full cursor-pointer transition-all duration-200 hover:shadow-lg ${category.color} border-2`}
                        >
                          <CardHeader className="text-center pb-4">
                            <div className="flex justify-center mb-3">{category.icon}</div>
                            <CardTitle className="text-lg">{category.title}</CardTitle>
                            <CardDescription className="text-sm">{category.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Articles */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-violet-500" />
                      최근 수정된 문서
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentArticles.map((article, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <div className="flex-1">
                            <Link
                              href="#"
                              className="font-medium text-gray-900 dark:text-gray-100 hover:text-violet-500"
                            >
                              {article.title}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {article.category}
                              </Badge>
                              <span className="text-xs text-gray-500">by {article.author}</span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">{article.time}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" className="rounded-full bg-transparent">
                        더 보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Popular Articles */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-violet-500" />
                      인기 문서
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {popularArticles.map((article, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              index === 0
                                ? "bg-yellow-500"
                                : index === 1
                                  ? "bg-gray-400"
                                  : index === 2
                                    ? "bg-orange-500"
                                    : "bg-violet-400"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <Link
                              href="#"
                              className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-violet-500 line-clamp-1"
                            >
                              {article.title}
                            </Link>
                            <div className="flex items-center justify-between mt-1">
                              <Badge variant="outline" className="text-xs">
                                {article.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{article.views} views</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>빠른 링크</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link
                        href="#"
                        className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="font-medium text-sm">편집 가이드</div>
                        <div className="text-xs text-gray-500">위키 편집 방법 알아보기</div>
                      </Link>
                      <Link
                        href="#"
                        className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="font-medium text-sm">커뮤니티 규칙</div>
                        <div className="text-xs text-gray-500">위키 작성 규칙과 가이드라인</div>
                      </Link>
                      <Link
                        href="#"
                        className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="font-medium text-sm">도움말</div>
                        <div className="text-xs text-gray-500">자주 묻는 질문과 답변</div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white dark:bg-gray-800/50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">카테고리별 둘러보기</h2>
              <p className="text-gray-600 dark:text-gray-400">관심 있는 분야의 문서들을 탐색해보세요</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/wiki/category/${category.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">{category.icon}</div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-2xl font-bold text-violet-500 mb-1">
                        {category.id === "album"
                          ? "1,247"
                          : category.id === "equipment"
                            ? "856"
                            : category.id === "artist"
                              ? "623"
                              : "121"}
                      </div>
                      <div className="text-sm text-gray-500">개의 문서</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default WikiRootPage
