import { useEffect, useState } from 'react';

const useModalAnimation = (isOpen: boolean, animationDuration: number = 200) => {
  const [isClosing, setIsClosing] = useState(false);

  const startAnimation = () => {
    setIsClosing(true);
  };

  const finishAnimation = () => {
    setIsClosing(false);
  };
  // console.log('useModalAnimation isClosing', isClosing);
  // console.log('useModalAnimation isOpen', isOpen);
  // useEffect(() => {
  //   if (isFirstRender) {
  //     console.log('isFirstRender');
  //     setIsFirstRender(false);
  //     return;
  //   }

  //   console.log('isOpen', isOpen);
  //   if (!isOpen && !isClosing) {
  //     setIsClosing(true);
  //     const timer = setTimeout(() => {
  //       // handleClose();
  //       setIsClosing(false);
  //       console.log('애니메이션 종료');
  //     }, animationDuration);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [isOpen]);

  return { isClosing, startAnimation, finishAnimation };
};

export default useModalAnimation;
