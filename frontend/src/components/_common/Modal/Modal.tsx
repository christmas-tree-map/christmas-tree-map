import { createPortal } from 'react-dom';
import * as S from './Modal.css';
import ModalBackdrop from './ModalBackdrop/ModalBackdrop';
import ModalBackgroundSnowBall from './ModalBackgroundSnowBall/ModalBackgroundSnowBall';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  backgroundColor?: 'red';
}

const Modal = ({ children, isOpen, handleClose, backgroundColor = 'red' }: React.PropsWithChildren<ModalProps>) => {
  const portalElement = document.getElementById('modal') as HTMLElement;

  if (!portalElement) {
    console.error('모달이 열려있지 않아요!');
    return null;
  }

  if (!isOpen) return null;

  const modalLayout = (
    <div className={S.Layout}>
      <ModalBackdrop onClick={handleClose} />
      <div className={S.Container[backgroundColor]}>
        <div className={S.BarContainer}>
          <div className={S.Bar} />
        </div>

        <div className={S.ContentWrapper}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalLayout, portalElement);
};

Modal.BackgroundSnowBall = ModalBackgroundSnowBall;

export default Modal;
