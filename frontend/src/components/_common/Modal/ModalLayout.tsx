import { createPortal } from 'react-dom';

import * as S from './ModalLayout.css';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const portalElement = document.getElementById('modal') as HTMLElement;

const ModalLayout = ({ children, isOpen }: ModalProps) => {
  if (!isOpen || !portalElement) {
    return null;
  }

  return createPortal(
    <div className={S.ModalLayoutStyle}>
      <div className={S.BarContainer}>
        <div className={S.Bar} />
      </div>
      {children}
    </div>,
    portalElement,
  );
};

export default ModalLayout;
