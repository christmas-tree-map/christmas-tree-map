import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalErrorBoundary from '@/pages/Error/ErrorBoundary/ModalErrorBoundary';
import useEscapeKey from '@/hooks/_common/useEscapeKey';
import * as S from './Modal.css';
import ModalBackdrop from './ModalBackdrop/ModalBackdrop';
import ModalBackgroundSnowBall from './ModalBackgroundSnowBall/ModalBackgroundSnowBall';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundColor?: 'red';
  animationDurationTime?: number;
}

const Modal = ({
  children,
  isOpen,
  onClose,
  backgroundColor = 'red',
  animationDurationTime = 200,
}: React.PropsWithChildren<ModalProps>) => {
  const portalElement = document.getElementById('modal') as HTMLElement;
  const [isRender, setIsRender] = useState(isOpen);

  useEscapeKey(isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      setIsRender(true);
    } else {
      const timer = setTimeout(() => {
        setIsRender(false);
      }, animationDurationTime);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!portalElement || !isRender) {
    return null;
  }

  const modalLayout = (
    <div
      className={S.Layout[isRender && isOpen ? 'isOpening' : 'isClosing']}
      style={{ '--animation-duration': `${animationDurationTime + 1}ms` } as React.CSSProperties}
    >
      <ModalBackdrop onClick={onClose} />
      <div className={S.Container[backgroundColor]}>
        <div className={S.BarContainer}>
          <div className={S.Bar} />
        </div>

        <div className={S.ContentWrapper}>
          <ModalErrorBoundary>{children}</ModalErrorBoundary>
        </div>
      </div>
    </div>
  );

  return isRender && createPortal(modalLayout, portalElement);
};

Modal.BackgroundSnowBall = ModalBackgroundSnowBall;

export default Modal;
