import * as S from '../Modal.css';

interface ModalBackdropProps {
  onClick: () => void; 
}

const ModalBackdrop = ({ onClick }: ModalBackdropProps) => {
  return <div className={S.Backdrop} onClick={onClick} />;
};

export default ModalBackdrop;
