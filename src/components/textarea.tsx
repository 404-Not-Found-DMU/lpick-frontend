import * as React from "react"

import { ssl } from "@/utils/classNames"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 높이를 초기화하여 정확한 높이 계산을 위해
      textarea.style.height = 'auto';
      // 스크롤 높이에 맞춰 높이 설정
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [props.value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    // 높이를 초기화
    textarea.style.height = 'auto';
    // 스크롤 높이에 맞춰 높이 설정
    textarea.style.height = `${textarea.scrollHeight}px`;
    
    // 원래 onChange 핸들러가 있다면 호출
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <textarea
      className={ssl(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden",
        className,
      )}
      ref={(node) => {
        // 두 ref 모두 설정
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        textareaRef.current = node;
      }}
      onInput={handleInput}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
