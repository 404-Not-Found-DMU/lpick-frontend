import { MusicTrack } from '@/app/lplayer/temp/playlist.temp';
import { create } from 'zustand';

type LoopMode = 'none' | 'all' | 'one';

interface AudioPlayerState {
  isPlaying: boolean;
  volume: number;
  previousVolume: number;
  isMuted: boolean;
  loopMode: LoopMode;
  isShuffle: boolean;
  currentTime: number;
  duration: number;

  playlist: MusicTrack[];
  currentTrackId: number;

  setPlaylist: (tracks: MusicTrack[]) => void;
  goToNextTrack: () => void;
  goToPrevTrack: () => void;
  stopPlayback: () => void;

  setCurrentTrackId: (id: number) => void;

  togglePlay: () => void;
  toggleMute: () => void;
  cycleLoopMode: () => void;
  toggleShuffle: () => void;
  setVolume: (v: number) => void;
  setCurrentTime: (t: number) => void;
  setDuration: (t: number) => void;
  setIsPlaying: (b: boolean) => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set, get) => ({
  isPlaying: false,
  volume: 1,
  previousVolume: 1,
  isMuted: false,
  loopMode: 'none',
  isShuffle: false,
  currentTime: 0,
  duration: 225,

  playlist: [],
  currentTrackId: 1,

  setPlaylist: (tracks: MusicTrack[]) => set({ playlist: tracks }),

  goToNextTrack: () => {
    const { playlist, currentTrackId, isShuffle, loopMode } = get();
    const currentIndex = playlist.findIndex((track) => track.id === currentTrackId);

    if (playlist.length === 0) return;

    if (isShuffle) {
      const remaining = playlist.filter((track) => track.id !== currentTrackId);
      if (remaining.length === 0) return;
      const randomTrack = remaining[Math.floor(Math.random() * remaining.length)];
      set({ currentTrackId: randomTrack.id });
      return;
    }

    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];
    if (nextTrack) {
      set({ currentTrackId: nextTrack.id });

      if (loopMode === 'none' && nextIndex === 0) {
        set({ isPlaying: false });
      } else {
        set({ isPlaying: true });
      }
    }
  },

  goToPrevTrack: () => {
    const { playlist, currentTrackId } = get();
    const currentIndex = playlist.findIndex((track) => track.id === currentTrackId);

    if (playlist.length === 0) return;

    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    const prevTrack = playlist[prevIndex];
    if (prevTrack) {
      set({ currentTrackId: prevTrack.id });
      set({ isPlaying: true });
    }
  },

  stopPlayback: () => {
    set({ isPlaying: false, currentTime: 0 });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleMute: () => {
    const { isMuted, volume, previousVolume } = get();

    if (isMuted) {
      set({ isMuted: false, volume: previousVolume });
    } else {
      set({ isMuted: true, previousVolume: volume, volume: 0 });
    }
  },

  setVolume: (v) => {
    set({ volume: v });
    if (v === 0) {
      set({ isMuted: true });
    } else {
      set({ isMuted: false });
    }
  },

  cycleLoopMode: () => {
    const nextMode: LoopMode = {
      none: 'all',
      all: 'one',
      one: 'none',
    }[get().loopMode] as LoopMode;
    set({ loopMode: nextMode });
  },
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),

  setCurrentTime: (t) => set({ currentTime: t }),
  setDuration: (t) => set({ duration: t }),
  setIsPlaying: (b) => set({ isPlaying: b }),
  setCurrentTrackId: (id) => {
    set({ currentTrackId: id });
    set({ isPlaying: true });
  },
}));
