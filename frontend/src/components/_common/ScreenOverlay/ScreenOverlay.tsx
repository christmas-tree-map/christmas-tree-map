import { createPortal } from 'react-dom';
import { IoIosClose } from '@react-icons/all-files/io/IoIosClose';
import usePreventScroll from '@/hooks/_common/usePreventScroll';
import * as S from './ScreenOverlay.css';

interface ScreenOverlayProps {
  title: string;
  isOpen: boolean;
  closeOverlay: () => void;
}

const ScreenOverlay = ({ title, isOpen, closeOverlay, children }: React.PropsWithChildren<ScreenOverlayProps>) => {
  const portalElement = document.getElementById('modal') as HTMLElement;

  usePreventScroll(isOpen);

  if (!portalElement) return null;

  return createPortal(
    <div className={S.Layout}>
      <div className={S.Header}>
        {title}
        <button className={S.CloseButton} type="button" onClick={closeOverlay}>
          <IoIosClose size="24px" />
        </button>
      </div>
      <div className={S.Container}>{children}</div>
    </div>,
    portalElement,
  );
};

export default ScreenOverlay;
