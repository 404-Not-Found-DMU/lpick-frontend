import { useAudioPlayerStore } from '@/store/audioPlayerStore';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString();
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

const PlaylistDuration = () => {
  const { duration } = useAudioPlayerStore();
  return <>{formatTime(duration)}</>;
};

export default PlaylistDuration;
