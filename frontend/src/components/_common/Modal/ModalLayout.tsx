import { createPortal } from 'react-dom';

import * as S from './ModalLayout.css';

interface ModalProps {
  isOpen: boolean;
}

const portalElement = document.getElementById('modal') as HTMLElement;

const ModalLayout = ({ children, isOpen }: React.PropsWithChildren<ModalProps>) => {
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
