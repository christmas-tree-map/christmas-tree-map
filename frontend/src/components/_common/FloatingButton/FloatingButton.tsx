import EditIcon from '@/assets/edit.svg';
import * as S from './FloatingButton.css';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <button className={S.Layout} onClick={onClick}>
      <img src={EditIcon} className={S.EditIcon} />
    </button>
  );
};

export default FloatingButton;
