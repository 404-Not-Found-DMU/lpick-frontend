import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor.css';

// Toast UI Editor 타입 정의
interface ToastEditorInstance {
  getInstance: () => {
    getMarkdown: () => string;
    setMarkdown: (markdown: string, cursorToEnd?: boolean) => void;
    exec: (command: string) => void;
  };
}

const ToastEditor = dynamic(
  () => import('@toast-ui/react-editor').then(mod => mod.Editor),
  { ssr: false }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<ToastEditorInstance>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // value prop이 바뀌면 에디터 내용도 동기화
  useEffect(() => {
    if (editorRef.current && editorRef.current.getInstance) {
      const instance = editorRef.current.getInstance();
      if (instance && value !== instance.getMarkdown()) {
        instance.setMarkdown(value || '', false);
      }
    }
  }, [value]);

  // BubbleMenu 위치 및 표시
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setShowMenu(false);
        return;
      }
      const range = selection.getRangeAt(0);
      if (!containerRef.current || !containerRef.current.contains(range.commonAncestorContainer)) {
        setShowMenu(false);
        return;
      }
      if (selection.isCollapsed) {
        setShowMenu(false);
        return;
      }
      const rect = range.getBoundingClientRect();
      const parentRect = containerRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.top - parentRect.top - 40,
        left: rect.left - parentRect.left + rect.width / 2,
      });
      setShowMenu(true);
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  // BubbleMenu 명령 실행
  const execCommand = (cmd: 'bold' | 'italic' | 'strike') => {
    if (editorRef.current && editorRef.current.getInstance) {
      const instance = editorRef.current.getInstance();
      if (instance) {
        instance.exec(cmd);
        // onChange를 강제로 트리거
        onChange(instance.getMarkdown());
      }
    }
    setShowMenu(false);
  };

  return (
    <div className={className} ref={containerRef} style={{ position: 'relative' }}>
      {showMenu && (
        <div
          style={{
            position: 'absolute',
            top: menuPos.top,
            left: menuPos.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 1000,
            pointerEvents: 'auto',
            opacity: 1,
            transition: 'opacity 0.18s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1)',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: 4,
            display: 'flex',
            gap: 4,
          }}
        >
          <button onMouseDown={e => { e.preventDefault(); execCommand('bold'); }}><b>B</b></button>
          <button onMouseDown={e => { e.preventDefault(); execCommand('italic'); }}><i>I</i></button>
          <button onMouseDown={e => { e.preventDefault(); execCommand('strike'); }}><s>S</s></button>
        </div>
      )}
      <ToastEditor
        ref={editorRef}
        initialValue={value || ''}
        previewStyle="vertical"
        height="300px"
        initialEditType="markdown"
        useCommandShortcut={true}
        hideModeSwitch={true}
        placeholder={placeholder}
        onChange={() => {
          if (editorRef.current && editorRef.current.getInstance) {
            const instance = editorRef.current.getInstance();
            if (instance) {
              onChange(instance.getMarkdown());
            }
          }
        }}
      />
    </div>
  );
} 