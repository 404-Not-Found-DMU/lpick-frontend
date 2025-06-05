'use client';
import { useTheme } from 'next-themes';
import { Button } from '@/components';
import { Moon, Sun } from 'lucide-react';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} variant={'ghost'}>
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
};

export default ThemeSelector;
