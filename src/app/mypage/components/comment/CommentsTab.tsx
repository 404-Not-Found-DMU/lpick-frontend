'use client';

import React, { useState } from 'react';
import { MessageCircle, Heart, Reply, Calendar, User, Filter } from 'lucide-react';

const CommentsTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const filters = ['전체', '일반 댓글', '답글', '좋아요 많은 순'];

  const comments = [
    {
      id: 1,
      content: '정말 훌륭한 분석이네요! Pink Floyd의 The Wall은 개념 앨범의 정점이라고 생각합니다.',
      postTitle: 'Pink Floyd - The Wall 완벽 분석',
      postAuthor: 'MusicCritic',
      date: '2024-01-15',
      likes: 23,
      replies: 5,
      isReply: false,
    },
    {
      id: 2,
      content: '@MusicLover99님의 의견에 동감합니다. 특히 Another Brick in the Wall 부분은...',
      postTitle: 'Pink Floyd - The Wall 완벽 분석',
      postAuthor: 'MusicCritic',
      date: '2024-01-14',
      likes: 8,
      replies: 2,
      isReply: true,
      replyTo: 'MusicLover99',
    },
    {
      id: 3,
      content: '재즈 입문자에게 정말 도움이 되는 글이었습니다. Kind of Blue부터 시작해보겠습니다!',
      postTitle: '재즈 입문자를 위한 추천 앨범 50선',
      postAuthor: 'JazzMaster',
      date: '2024-01-12',
      likes: 45,
      replies: 12,
      isReply: false,
    },
    {
      id: 4,
      content: 'David Bowie의 Berlin Trilogy에 대한 설명이 특히 인상깊었습니다.',
      postTitle: 'David Bowie 아티스트 프로필',
      postAuthor: 'WikiContributor',
      date: '2024-01-10',
      likes: 15,
      replies: 3,
      isReply: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">내 댓글</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                작성한 댓글과 답글을 관리하세요
              </p>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="mb-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="mb-3 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">댓글 필터</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'scale-105 bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md'
                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="group rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-green-200 hover:bg-gradient-to-br hover:from-green-50/50 hover:to-teal-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-green-700"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    comment.isReply
                      ? 'bg-teal-100 dark:bg-teal-900/20'
                      : 'bg-green-100 dark:bg-green-900/20'
                  } shadow-sm`}
                >
                  {comment.isReply ? (
                    <Reply className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  ) : (
                    <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`text-xs font-medium uppercase ${
                        comment.isReply
                          ? 'text-teal-600 dark:text-teal-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}
                    >
                      {comment.isReply ? '답글' : '댓글'}
                    </span>
                    {comment.replyTo && (
                      <>
                        <span className="text-xs text-gray-400">→</span>
                        <span className="text-xs text-blue-600 dark:text-blue-400">
                          @{comment.replyTo}
                        </span>
                      </>
                    )}
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {comment.date}
                    </div>
                  </div>

                  <p className="mb-3 leading-relaxed text-gray-900 dark:text-white">
                    {comment.content}
                  </p>

                  <div className="mb-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {comment.postAuthor}
                      </span>
                      <span className="text-gray-400">의 글:</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {comment.postTitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-red-500">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{comment.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Reply className="h-4 w-4" />
                      <span className="text-sm font-medium">{comment.replies}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="py-12 text-center">
            <MessageCircle className="mx-auto mb-4 h-16 w-16 text-gray-400 opacity-50" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              아직 작성한 댓글이 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              다른 사용자의 게시글에 댓글을 남겨보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsTab;
