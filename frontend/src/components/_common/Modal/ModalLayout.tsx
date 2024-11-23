import { createPortal } from 'react-dom';

import * as S from './ModalLayout.css';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const portalElement = document.getElementById('modal') as HTMLElement;

const ModalLayout = ({ children, isOpen }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(<div className={S.modalLayoutStyle}>{children}</div>, portalElement);
};

export default ModalLayout;
