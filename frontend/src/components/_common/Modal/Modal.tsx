import { createPortal } from 'react-dom';
import * as S from './Modal.css';

interface ModalProps {
  isOpen: boolean;
}

const portalElement = document.getElementById('modal') as HTMLElement;

const Modal = ({ children, isOpen }: React.PropsWithChildren<ModalProps>) => {
  if (!isOpen || !portalElement) {
    return null;
  }

  return createPortal(
    <div className={S.ModalLayout}>
      <div className={S.BarContainer}>
        <div className={S.Bar} />
      </div>
      {children}
    </div>,
    portalElement,
  );
};

export default Modal;
