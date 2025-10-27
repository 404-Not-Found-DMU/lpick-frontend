import { fetcher } from '@/hooks/api/fetchers';

export interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  mp3: string;
  cover: string;
}

export interface Playlist {
  playlistId: number;
  userId: string;
  title: string;
  description?: string;
  isPublic: boolean;
  tracks: MusicTrack[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlaylistRequest {
  title: string;
  description?: string;
  isPublic: boolean;
}

export interface UpdatePlaylistRequest {
  title?: string;
  description?: string;
  isPublic?: boolean;
}

// 녹음 파일 업로드
export const uploadRecording = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  return fetcher('/api/v1/lplayer/upload', {
    method: 'POST',
    body: formData,
    headers: {}, // FormData는 Content-Type을 자동으로 설정
  });
};

// 플레이리스트 생성
export const createPlaylist = async (data: CreatePlaylistRequest): Promise<Playlist> => {
  return fetcher('/api/v1/lplayer/playlists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

// 플레이리스트 목록 조회
export const fetchPlaylists = async (): Promise<Playlist[]> => {
  return fetcher('/api/v1/lplayer/playlists', {
    method: 'GET',
  });
};

// 플레이리스트 상세 조회
export const fetchPlaylistDetail = async (playlistId: number): Promise<Playlist> => {
  return fetcher(`/api/v1/lplayer/playlists/${playlistId}`, {
    method: 'GET',
  });
};

// 플레이리스트 수정
export const updatePlaylist = async (
  playlistId: number,
  data: UpdatePlaylistRequest,
): Promise<Playlist> => {
  return fetcher(`/api/v1/lplayer/playlists/${playlistId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

// 플레이리스트 삭제
export const deletePlaylist = async (playlistId: number): Promise<void> => {
  return fetcher(`/api/v1/lplayer/playlists/${playlistId}`, {
    method: 'DELETE',
  });
};

// 플레이리스트에 트랙 추가
export const addTrackToPlaylist = async (
  playlistId: number,
  track: Omit<MusicTrack, 'id'>,
): Promise<Playlist> => {
  return fetcher(`/api/v1/lplayer/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(track),
  });
};

// 플레이리스트에서 트랙 제거
export const removeTrackFromPlaylist = async (
  playlistId: number,
  trackId: number,
): Promise<void> => {
  return fetcher(`/api/v1/lplayer/playlists/${playlistId}/tracks/${trackId}`, {
    method: 'DELETE',
  });
};

// 현재 재생 중인 플레이리스트 가져오기 (기본 플레이리스트)
export const fetchPlaylist = async (): Promise<MusicTrack[]> => {
  try {
    const playlists = await fetchPlaylists();
    // 첫 번째 플레이리스트의 트랙들을 반환
    if (playlists.length > 0) {
      return playlists[0].tracks;
    }
    return [];
  } catch (error) {
    console.error('플레이리스트 로드 실패:', error);
    // 에러 발생 시 임시 데이터 반환 (개발 환경)
    const { tempPlaylist } = await import('../temp/playlist.temp');
    return tempPlaylist;
  }
};
