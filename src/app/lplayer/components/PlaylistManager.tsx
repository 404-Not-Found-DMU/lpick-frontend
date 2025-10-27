'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Loader2,
  Music,
  Lock,
  Unlock,
  FolderOpen,
} from 'lucide-react';
import {
  fetchPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  type Playlist,
} from '../api/playlist.api';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';

export const PlaylistManager = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublic: true,
  });
  const { setPlaylist } = useAudioPlayerStore();

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error('플레이리스트 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title.trim()) return;

    try {
      await createPlaylist(formData);
      setFormData({ title: '', description: '', isPublic: true });
      setIsCreating(false);
      loadPlaylists();
    } catch (error) {
      console.error('플레이리스트 생성 실패:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    if (!formData.title.trim()) return;

    try {
      await updatePlaylist(id, formData);
      setEditingId(null);
      setFormData({ title: '', description: '', isPublic: true });
      loadPlaylists();
    } catch (error) {
      console.error('플레이리스트 수정 실패:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;

    try {
      await deletePlaylist(id);
      loadPlaylists();
    } catch (error) {
      console.error('플레이리스트 삭제 실패:', error);
    }
  };

  const startEdit = (playlist: Playlist) => {
    setEditingId(playlist.playlistId);
    setFormData({
      title: playlist.title,
      description: playlist.description || '',
      isPublic: playlist.isPublic,
    });
  };

  const loadPlaylistToPlayer = (playlist: Playlist) => {
    setPlaylist(playlist.tracks);
  };

  return (
    <div className="animate-slide-up space-y-6">
      {/* 헤더 */}
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-900/30">
              <Music className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">내 라이브러리</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {playlists.length}개의 플레이리스트
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-violet-700 hover:to-purple-700"
          >
            <Plus className="h-5 w-5" />새 플레이리스트
          </button>
        </div>
      </div>

      {/* 생성 폼 */}
      {isCreating && (
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            새 플레이리스트 만들기
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 출근길 음악"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                autoFocus
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                설명
              </label>
              <textarea
                placeholder="이 플레이리스트에 대한 설명을 입력하세요"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                rows={3}
              />
            </div>
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <label className="flex cursor-pointer items-center justify-between">
                <div className="flex items-center gap-3">
                  {formData.isPublic ? (
                    <Unlock className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      공개 플레이리스트
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      다른 사용자가 이 플레이리스트를 볼 수 있습니다
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500 dark:border-gray-600"
                />
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCreate}
                disabled={!formData.title.trim()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                생성하기
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setFormData({ title: '', description: '', isPublic: true });
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 플레이리스트 목록 */}
      {isLoading ? (
        <div className="flex items-center justify-center rounded-2xl bg-white p-16 shadow-sm dark:bg-gray-900">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-violet-500" />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">로딩 중...</p>
          </div>
        </div>
      ) : playlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-16 shadow-sm dark:bg-gray-900">
          <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
            <FolderOpen className="h-12 w-12 text-gray-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              플레이리스트가 없습니다
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              첫 플레이리스트를 만들어보세요
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="mt-2 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-violet-700 hover:to-purple-700"
          >
            <Plus className="h-5 w-5" />첫 플레이리스트 만들기
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {playlists.map((playlist) => (
            <div
              key={playlist.playlistId}
              className="group rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md dark:bg-gray-900"
            >
              {editingId === playlist.playlistId ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    autoFocus
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(playlist.playlistId)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
                    >
                      <Save className="h-4 w-4" />
                      저장
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => loadPlaylistToPlayer(playlist)}
                    className="mb-4 w-full text-left"
                  >
                    {/* 플레이리스트 썸네일 */}
                    <div className="mb-4 aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 shadow-lg">
                      <div className="flex h-full items-center justify-center">
                        <Music className="h-16 w-16 text-white/80" />
                      </div>
                    </div>
                    {/* 플레이리스트 정보 */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate font-semibold text-gray-900 dark:text-white">
                          {playlist.title}
                        </h4>
                        {playlist.isPublic ? (
                          <Unlock className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                        ) : (
                          <Lock className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                        )}
                      </div>
                      {playlist.description && (
                        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                          {playlist.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">{playlist.tracks.length}곡</p>
                    </div>
                  </button>
                  {/* 액션 버튼 */}
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => startEdit(playlist)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      title="수정"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">수정</span>
                    </button>
                    <button
                      onClick={() => handleDelete(playlist.playlistId)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                      title="삭제"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">삭제</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
