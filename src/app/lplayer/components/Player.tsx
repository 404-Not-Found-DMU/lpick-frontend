'use client';

import RecordPlayer from './RecordPlayer';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import { useAudio } from '../hooks/useAudioPlayer';

const Player = () => {
  const { audioRef } = useAudio();

  return (
    <div className="animate-slide-up mx-auto flex w-full min-w-0 max-w-[95vw] flex-col items-center justify-center rounded-2xl bg-white px-6 py-8 shadow-lg dark:bg-gray-900 sm:max-w-[700px] md:max-w-[900px] md:px-12 md:py-10 xl:max-w-[1200px] xl:px-32 xl:py-20 2xl:max-w-[1400px]">
      <audio ref={audioRef} preload="metadata" controls>
        <source src="/sample.mp3" type="audio/mpeg" />
        <source src="/sample.ogg" type="audio/ogg" />
        브라우저가 오디오를 지원하지 않습니다.
      </audio>
      <div className="flex w-full flex-col items-center gap-4 md:gap-6">
        <RecordPlayer />
        <div className="text-center">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 md:text-lg">
            Pink Floyd - The Dark Side of the Moon
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 md:text-sm">
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
