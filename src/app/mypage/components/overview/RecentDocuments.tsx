'use client';

import React from 'react';
import {
  FileText,
  User,
  Music,
  MessageCircle,
  Clock,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { tempRecentDocuments } from '../../temp/mypage.temp';

const RecentDocuments = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'review':
        return <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'guide':
        return <User className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'playlist':
        return <Music className="h-4 w-4 text-violet-600 dark:text-violet-400" />;
      case 'tip':
        return <MessageCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'review':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'guide':
        return 'bg-green-100 dark:bg-green-900';
      case 'playlist':
        return 'bg-violet-100 dark:bg-violet-900';
      case 'tip':
        return 'bg-orange-100 dark:bg-orange-900';
      default:
        return 'bg-gray-100 dark:bg-gray-900';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '완료':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case '공개':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">최근 수정한 문서</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">작성 중인 리뷰와 문서들</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">
          <ExternalLink className="h-4 w-4" />
          전체보기
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {tempRecentDocuments.map((doc) => (
          <div
            key={doc.id}
            className="group cursor-pointer rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-blue-200 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-violet-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-blue-800 dark:hover:bg-gradient-to-br dark:hover:from-blue-900/20 dark:hover:to-violet-900/20"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${getCategoryBg(
                    doc.category,
                  )} shadow-sm`}
                >
                  {getCategoryIcon(doc.category)}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {doc.type}
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <Eye className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">324 조회</span>
                  </div>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                  doc.status,
                )}`}
              >
                {doc.status}
              </span>
            </div>

            <h4 className="mb-3 line-clamp-2 font-bold leading-snug text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {doc.title}
            </h4>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{doc.lastModified}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDocuments;
