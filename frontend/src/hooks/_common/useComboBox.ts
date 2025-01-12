import { useEffect, useRef, useState } from 'react';

interface useComboBoxProps<T> {
  items?: T[];
  value: string;
  canSubmitByInput: boolean;
}

const useComboBox = <T extends { displayedKeyword: string }>({
  items,
  value,
  canSubmitByInput,
}: useComboBoxProps<T>) => {
  const [displayedValue, setDisplayedValue] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isComboBoxOpen, setIsComboBoxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setIsComboBoxOpen(value.trim() !== '');

    if (isComboBoxOpen && items && value.trim() !== '') {
      const foundIndex = items.findIndex((item) => item.displayedKeyword === value);
      setSelectedIndex(foundIndex !== -1 ? foundIndex : -1);
    }
  }, [items, value]);

  const submitForm = (currentIndex: number) => {
    if (!items || currentIndex < 0 || currentIndex >= items.length) return;

    setDisplayedValue(items[currentIndex].displayedKeyword);
    setSelectedIndex(currentIndex);

    if (containerRef.current) {
      const form = containerRef.current.closest('form');
      if (form) {
        setTimeout(() => {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })); // submit 이벤트 트리거
        }, 0);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!items || items.length === 0 || value.trim() === '') return;

    const cycleIndex = (currentIndex: number, direction: number) => {
      return (currentIndex + direction + items.length) % items.length;
    };

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (!isComboBoxOpen) break;
        const nextIndex = cycleIndex(selectedIndex, 1);
        setSelectedIndex(nextIndex);
        setDisplayedValue(items[nextIndex].displayedKeyword);
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        if (!isComboBoxOpen) break;
        const prevIndex = cycleIndex(selectedIndex, -1);
        setSelectedIndex(prevIndex);
        setDisplayedValue(items[prevIndex].displayedKeyword);
        break;
      }

      case 'Enter':
        if (!canSubmitByInput && selectedIndex === -1) {
          event.preventDefault();
          return;
        }
        submitForm(selectedIndex);
        break;

      case 'Escape':
        event.preventDefault();
        setIsComboBoxOpen(false);
        break;
    }
  };

  const handleDisplayedInputChange = (value: string) => {
    setDisplayedValue(value);
  };

  return {
    displayedValue,
    selectedIndex,
    isComboBoxOpen,
    setIsComboBoxOpen,
    containerRef,
    listRef,
    handleKeyDown,
    handleDisplayedInputChange,
    submitForm,
  };
};

export default useComboBox;
