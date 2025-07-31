'use client';

import React, { createContext, useContext, useState } from 'react';
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
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

export interface DialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ 
  asChild = false, 
  children 
}) => {
  const { onOpenChange } = useDialogContext();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => onOpenChange(true),
    });
  }

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      <div className={clsx(
        'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 border border-gray-200 dark:border-gray-700',
        className
      )}>
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