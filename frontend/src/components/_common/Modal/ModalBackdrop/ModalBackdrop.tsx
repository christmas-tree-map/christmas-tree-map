import useEscapeKey from '@/hooks/_common/useEscapeKey';
import * as S from '../Modal.css';

interface ModalBackdropProps {
  onClick: () => void;
}

const ModalBackdrop = ({ onClick }: ModalBackdropProps) => {
  useEscapeKey(onClick);

  return <div className={S.Backdrop} onClick={onClick} />;
};

export default ModalBackdrop;
