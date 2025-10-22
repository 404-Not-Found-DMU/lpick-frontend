'use client';

import { useState } from 'react';
import { Upload, Loader2, CheckCircle2, XCircle, Music, File } from 'lucide-react';
import { uploadRecording } from '../api/playlist.api';

interface RecordingUploadProps {
  onUploadSuccess: (url: string) => void;
}

export const RecordingUpload = ({ onUploadSuccess }: RecordingUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 형식 검증
    if (!file.type.startsWith('audio/')) {
      setError('오디오 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 검증 (예: 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('파일 크기는 50MB를 초과할 수 없습니다.');
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await uploadRecording(selectedFile);
      setSuccess(true);
      setTimeout(() => {
        onUploadSuccess(response.url);
        setSuccess(false);
        setSelectedFile(null);
      }, 1500);
    } catch (err) {
      console.error('업로드 실패:', err);
      setError('파일 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="animate-slide-up space-y-6">
      {/* 헤더 */}
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-900/30">
            <Upload className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">파일 업로드</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              녹음 파일을 업로드하여 플레이리스트에 추가하세요
            </p>
          </div>
        </div>
      </div>

      {/* 업로드 영역 */}
      <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900">
        {!selectedFile ? (
          <div className="relative">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
              id="recording-upload"
            />
            <label
              htmlFor="recording-upload"
              className="flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-12 transition-all hover:border-violet-400 hover:bg-violet-50/50 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-violet-500 dark:hover:bg-violet-900/10"
            >
              <div className="rounded-full bg-gradient-to-br from-violet-500 to-purple-600 p-6 shadow-lg">
                <Music className="h-10 w-10 text-white" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  파일을 선택하거나 드래그하세요
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  MP3, WAV, M4A, FLAC • 최대 50MB
                </p>
              </div>
              <button
                type="button"
                className="mt-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
              >
                파일 선택
              </button>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 선택된 파일 정보 */}
            <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <div className="rounded-lg bg-violet-100 p-3 dark:bg-violet-900/30">
                <File className="h-8 w-8 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            {/* 업로드 버튼 */}
            <button
              onClick={handleUpload}
              disabled={isUploading || success}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-violet-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {success ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  업로드 완료!
                </>
              ) : isUploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  업로드 중...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  업로드 시작
                </>
              )}
            </button>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            <XCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* 안내사항 */}
      <div className="rounded-2xl bg-blue-50 p-6 dark:bg-blue-900/20">
        <h3 className="mb-3 font-semibold text-blue-900 dark:text-blue-300">업로드 안내</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          <li className="flex items-start gap-2">
            <span className="mt-0.5">•</span>
            <span>지원 형식: MP3, WAV, M4A, FLAC</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5">•</span>
            <span>최대 파일 크기: 50MB</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5">•</span>
            <span>업로드된 파일은 자동으로 플레이리스트에 추가됩니다</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
