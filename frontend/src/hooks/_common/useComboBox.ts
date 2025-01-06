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
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setIsComboBoxOpen(value.trim() !== '');

    if (isComboBoxOpen && items && value.trim() !== '') {
      const foundIndex = items.findIndex((item) => item.displayedKeyword === value);
      setSelectedIndex(foundIndex !== -1 ? foundIndex : -1);
    }
  }, [isComboBoxOpen, items, value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!items || items.length === 0 || value.trim() === '') return;

    const cycleIndex = (currentIndex: number, direction: number) => {
      return (currentIndex + direction + items.length) % items.length;
    };

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = cycleIndex(selectedIndex, 1);
        setSelectedIndex(nextIndex);
        setDisplayedValue(items[nextIndex].displayedKeyword);
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
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
        if (inputRef.current) {
          const form = inputRef.current.closest('form');
          if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
          setIsComboBoxOpen(false);
        }
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
    inputRef,
    listRef,
    handleKeyDown,
    handleDisplayedInputChange,
  };
};

export default useComboBox;
