import React from 'react';
import { createPortal } from 'react-dom';
import ModalErrorBoundary from '@/pages/Error/Modal/ModalErrorBoundary';
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
  const isClosing = useModalAnimation(isOpen, onClose, 200);

  useEscapeKey(onClose);

  if (!portalElement) {
    console.error('모달이 열려있지 않아요!');
    return null;
  }

  if (!isOpen && !isClosing) return null;

  const modalLayout = (
    <div className={S.Layout}>
      <ModalBackdrop onClick={onClose} />
      <div className={`${S.Container[backgroundColor]} ${isClosing ? S.ContainerClosing : ''}`}>
        <div className={S.BarContainer}>
          <div className={S.Bar} />
        </div>

        <div className={S.ContentWrapper}>
          <ModalErrorBoundary>{children}</ModalErrorBoundary>
        </div>
      </div>
    </div>
  );

  return createPortal(modalLayout, portalElement);
};

Modal.BackgroundSnowBall = ModalBackgroundSnowBall;

export default Modal;
