import { Menu, Music } from 'lucide-react';
import clsx from 'clsx';

interface TabMenuProps {
  selected: 'playlist' | 'collection';
  setSelected: (value: 'playlist' | 'collection') => void;
}

const TabMenu = ({ selected, setSelected }: TabMenuProps) => {
  return (
    <div className="relative flex w-auto items-center justify-center rounded-xl p-1 shadow-md">
      <div
        className={clsx(
          'absolute left-1 top-1 flex h-[calc(100%-0.5rem)] w-[calc(50%-8px)] rounded-lg bg-purple-400 transition-transform duration-300',
          selected === 'collection' && 'translate-x-[calc(100%+8px)]',
        )}
      />

      <button
        onClick={() => setSelected('playlist')}
        className={clsx(
          'relative z-10 flex w-full min-w-[120px] items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
          selected === 'playlist' ? 'text-white' : 'text-gray-600',
        )}
      >
        <Menu size={18} />
        재생 목록
      </button>

      <button
        onClick={() => setSelected('collection')}
        className={clsx(
          'relative z-10 flex w-full min-w-[120px] items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
          selected === 'collection' ? 'text-white' : 'text-gray-600',
        )}
      >
        <Music size={18} />내 컬렉션
      </button>
    </div>
  );
};

export default TabMenu;
