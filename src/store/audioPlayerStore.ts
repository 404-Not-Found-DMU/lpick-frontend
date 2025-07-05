// store/audioPlayerStore.ts
import { create } from 'zustand';

type LoopMode = 'none' | 'all' | 'one';

interface AudioPlayerState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  loopMode: LoopMode;
  isShuffle: boolean;
  currentTime: number;
  duration: number;

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
  isMuted: false,
  loopMode: 'none',
  isShuffle: false,
  currentTime: 0,
  duration: 225,

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  cycleLoopMode: () => {
    const nextMode: LoopMode = {
      none: 'all',
      all: 'one',
      one: 'none',
    }[get().loopMode] as LoopMode;
    set({ loopMode: nextMode });
  },
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  setVolume: (v) => set({ volume: v }),
  setCurrentTime: (t) => set({ currentTime: t }),
  setDuration: (t) => set({ duration: t }),
  setIsPlaying: (b) => set({ isPlaying: b }),
}));
