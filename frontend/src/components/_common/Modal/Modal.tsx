import { createPortal } from 'react-dom';
import * as S from './Modal.css';
import ModalBackgroundSnowBall from './ModalBackgroundSnowBall/ModalBackgroundSnowBall';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  backgroundColor?: 'red';
}

const Modal = ({ children, isOpen, handleClose, backgroundColor = 'red' }: React.PropsWithChildren<ModalProps>) => {
  const portalElement = document.getElementById('modal') as HTMLElement;

  if (!isOpen || !portalElement) {
    return null;
  }

  return createPortal(
    <div className={S.Layout}>
      <div className={S.Backdrop} onClick={handleClose} />
      <div className={S.Container[backgroundColor]}>
        <div className={S.BarContainer}>
          <div className={S.Bar} />
        </div>

        <div className={S.ContentWrapper}>{children}</div>
      </div>
    </div>,
    portalElement,
  );
};

Modal.BackgroundSnowBall = ModalBackgroundSnowBall;

export default Modal;
