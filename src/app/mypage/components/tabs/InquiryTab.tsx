'use client';

import React, { useState } from 'react';
import { HelpCircle, Send, Phone, Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const InquiryTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('일반');
  const [message, setMessage] = useState('');

  const categories = ['일반', '기술 지원', '계정 문제', '결제', '기타'];

  const inquiryHistory = [
    {
      id: 1,
      category: '기술 지원',
      title: '플레이리스트 동기화 오류',
      status: '답변 완료',
      date: '2024-01-15',
      response: true,
    },
    {
      id: 2,
      category: '일반',
      title: '새로운 기능 제안',
      status: '검토 중',
      date: '2024-01-12',
      response: false,
    },
    {
      id: 3,
      category: '계정 문제',
      title: '프로필 사진 업로드 불가',
      status: '답변 완료',
      date: '2024-01-08',
      response: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 새 문의 작성 */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <HelpCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">문의하기</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              궁금한 점이나 문제가 있으시면 언제든 문의해주세요
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 카테고리 선택 */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              문의 유형
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 제목 입력 */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              제목
            </label>
            <input
              type="text"
              placeholder="문의 제목을 입력해주세요"
              className="w-full rounded-2xl border border-gray-200 p-4 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* 내용 입력 */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              문의 내용
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="문의 내용을 자세히 작성해주세요"
              rows={6}
              className="w-full resize-none rounded-2xl border border-gray-200 p-4 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* 전송 버튼 */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
              <Send className="h-4 w-4" />
              문의 전송
            </button>
          </div>
        </div>
      </div>

      {/* 빠른 연락처 */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">빠른 연락처</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20">
            <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">전화 문의</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">1588-1234</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4 dark:bg-green-900/20">
            <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">이메일</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">support@lpick.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-violet-50 p-4 dark:bg-violet-900/20">
            <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">라이브 채팅</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">평일 9-18시</div>
            </div>
          </div>
        </div>
      </div>

      {/* 문의 내역 */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">문의 내역</h4>
        <div className="space-y-4">
          {inquiryHistory.map((inquiry) => (
            <div
              key={inquiry.id}
              className="rounded-2xl border border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {inquiry.category}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        inquiry.response
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">{inquiry.title}</h5>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{inquiry.date}</span>
                  </div>
                </div>
                {inquiry.response && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InquiryTab;
