import { createPortal } from 'react-dom';
import * as S from './Modal.css';
import ModalBackgroundSnowBall from './ModalBackgroundSnowBall/ModalBackgroundSnowBall';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const portalElement = document.getElementById('modal') as HTMLElement;

const Modal = ({ children, isOpen, handleClose }: React.PropsWithChildren<ModalProps>) => {
  if (!isOpen || !portalElement) {
    return null;
  }

  return createPortal(
    <div className={S.Layout}>
      <div className={S.Backdrop} onClick={handleClose} />
      <div className={S.Container}>
        <ModalBackgroundSnowBall />
        <div className={S.BarContainer}>
          <div className={S.Bar} />
        </div>

        <div className={S.ContentWrapper}>{children}</div>
      </div>
    </div>,
    portalElement,
  );
};

export default Modal;
