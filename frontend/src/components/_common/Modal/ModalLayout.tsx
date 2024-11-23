import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const portalElement = document.getElementById('modal') as HTMLElement;

const ModalLayout = ({ children, isOpen }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(<>{children}</>, portalElement);
};

export default ModalLayout;
