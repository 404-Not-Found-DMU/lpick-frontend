import Player from './components/Player';
import Playlist from './components/Playlist';

const LPlayerPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-4 py-6 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900/20">
      <div className="mx-auto flex flex-col items-center justify-center gap-10 px-4 xl:flex-row xl:items-start xl:px-6">
        <Player />
        <Playlist />
      </div>
    </div>
  );
};

export default LPlayerPage;
