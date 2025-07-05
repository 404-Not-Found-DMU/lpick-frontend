'use client';

import RecordPlayer from './RecordPlayer';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import { useAudio } from '../hooks/useAudioPlayer';

const Player = () => {
  const { audioRef } = useAudio();

  return (
    <div className="animate-slide-up w-[1000px] min-w-[600px] rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
      <audio ref={audioRef} src="/sample.mp3" preload="metadata" />
      <div className="flex flex-col items-center gap-6">
        <RecordPlayer />
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Pink Floyd - The Dark Side of the Moon
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pink Floyd · The Dark Side of the Moon · 1973
          </p>
        </div>
        <ProgressBar />
        <Controls />
      </div>
    </div>
  );
};

export default Player;
