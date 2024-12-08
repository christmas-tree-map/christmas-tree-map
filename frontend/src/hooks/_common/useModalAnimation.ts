import { useEffect, useState } from 'react';

const useModalAnimation = (isOpen: boolean, handleClose: () => void, animationDuration: number = 200) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    if (!isOpen) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsClosing(false);
        handleClose();
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, handleClose, animationDuration]);

  return isClosing;
};

export default useModalAnimation;
