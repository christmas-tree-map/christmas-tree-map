import { useEffect } from 'react';

const useEscapeKey = (isOpen: boolean, onEscape: () => void) => {
  useEffect(() => {
    if (isOpen) {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onEscape();
        }
      };

      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, onEscape]);
};

export default useEscapeKey;
