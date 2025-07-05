import { useState, useRef, useEffect } from 'react';

export function useProgressBar(initialPercent = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(initialPercent);
  const [isDragging, setIsDragging] = useState(false);

  const updatePercent = (clientX: number) => {
    if (!ref.current) return;
    const { left, width } = ref.current.getBoundingClientRect();
    const x = clientX - left;
    const newPercent = Math.min(Math.max((x / width) * 100, 0), 100);
    setPercent(newPercent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePercent(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) updatePercent(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

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
