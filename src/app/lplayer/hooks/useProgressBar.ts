// hooks/useProgressBar.ts
import { useEffect, useRef, useState } from 'react';

interface UseProgressBarProps {
  vertical?: boolean;
  onChange?: (percent: number) => void;
}

export function useProgressBar({ vertical = false, onChange }: UseProgressBarProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updatePercent = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    let newPercent = 0;

    if (vertical) {
      const y = clientY - rect.top;
      newPercent = 100 - Math.min(Math.max((y / rect.height) * 100, 0), 100);
    } else {
      const x = clientX - rect.left;
      newPercent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    }

    setPercent(newPercent);
    if (onChange) onChange(newPercent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePercent(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) updatePercent(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return {
    ref,
    percent,
    setPercent,
    handleMouseDown,
  };
}
