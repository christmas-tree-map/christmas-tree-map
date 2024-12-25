import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import ModalErrorBoundary from '@/pages/Error/ErrorBoundary/ModalErrorBoundary';
import useEscapeKey from '@/hooks/_common/useEscapeKey';
import useModalAnimation from '@/hooks/_common/useModalAnimation';
import * as S from './Modal.css';
import ModalBackdrop from './ModalBackdrop/ModalBackdrop';
import ModalBackgroundSnowBall from './ModalBackgroundSnowBall/ModalBackgroundSnowBall';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundColor?: 'red';
}

const Modal = ({ children, isOpen, onClose, backgroundColor = 'red' }: React.PropsWithChildren<ModalProps>) => {
  const portalElement = document.getElementById('modal') as HTMLElement;
  const [isClosing, setIsClosing] = useState(false);
const navigate = useNavigate();

  const handleAnimation = useCallback(() => {
    if (isClosing) return;

    console.log('호출');
    setIsClosing(true);
    const timer = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      navigate('/map');
    };
  }, [isOpen]);

  // useEffect(() => {
  //   if (isFirstRender) {
  //     setIsFirstRender(false);
  //     return;
  //   }

  //   handleAnimation();

  //   // if (!isOpen) {
  //   //   console.log('호출');
  //   //   const timer = setTimeout(() => {
  //   //     startAnimation();
  //   //     onClose();
  //   //   }, 2000);
  //   //   return () => {
  //   //     clearTimeout(timer);
  //   //     finishAnimation();
  //   //   };
  //   // }
  // }, [isOpen]);

  // // const handleClose = () => {
  // //   const timer = setTimeout(() => {
  // //     console.log('timer');
  // //     startAnimation();
  // //     onClose();
  // //   }, 2000);
  // //   return () => {
  // //     clearTimeout(timer);
  // //     finishAnimation();
  // //   };
  // // };

  // useEscapeKey(isOpen, onClose);

  if (!portalElement) {
    console.error('모달이 열려있지 않아요!');
    return null;
  }

  const modalLayout = (
    <div className={S.Layout[isClosing ? 'isClosing' : 'isOpening']}>
      <ModalBackdrop onClick={handleAnimation} />

      <div className={S.Container[backgroundColor]}>
        <ModalBackgroundSnowBall />
        <div className={S.BarContainer}>
          <div className={S.Bar} />
        </div>

        <div className={S.ContentWrapper}>
          <ModalErrorBoundary>{children}</ModalErrorBoundary>
        </div>
      </div>
    </div>
  );

  return isOpen && createPortal(modalLayout, portalElement);
};

// Modal.BackgroundSnowBall = ModalBackgroundSnowBall;

export default Modal;
