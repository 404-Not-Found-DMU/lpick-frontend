'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog');
  }
  return context;
};

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ 
  open: controlledOpen, 
  onOpenChange: controlledOnOpenChange, 
  children 
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const onOpenChange = isControlled ? controlledOnOpenChange : setInternalOpen;

  return (
    <DialogContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </DialogContext.Provider>
  );
};

export interface DialogTriggerProps {
  children: React.ReactNode;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ 
  children 
}) => {
  const { onOpenChange } = useDialogContext();

  return (
    <button onClick={() => onOpenChange(true)}>
      {children}
    </button>
  );
};

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent: React.FC<DialogContentProps> = ({ 
  children, 
  className 
}) => {
  const { open, onOpenChange } = useDialogContext();
  const contentRef = useRef<HTMLDivElement>(null);

  // 훅은 항상 동일한 순서로 호출되어야 하므로 조기 반환을 아래로 이동

  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  // Focus trap: keep focus inside dialog
  useEffect(() => {
    if (!open) return;
    const root = contentRef.current;
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        (last || first).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        (first || last).focus();
      }
    };
    const listener: EventListener = (e) => handleTab(e as KeyboardEvent);
    root.addEventListener('keydown', listener);
    return () => root.removeEventListener('keydown', listener);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        className={clsx(
          'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 border border-gray-200 dark:border-gray-700',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={clsx('mb-4', className)}>
      {children}
    </div>
  );
};

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ 
  children, 
  className 
}) => {
  return (
    <h2 className={clsx('text-lg font-semibold', className)}>
      {children}
    </h2>
  );
}; 