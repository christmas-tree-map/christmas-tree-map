import { useCallback, useEffect, useRef } from 'react';

const useAutoResize = (value: string) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeHeight = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 4}px`;
    }
  }, []);

  useEffect(() => {
    resizeHeight();
  }, [value, resizeHeight]);

  return { textAreaRef };
};

export default useAutoResize;
