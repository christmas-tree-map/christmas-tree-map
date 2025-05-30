import EditIcon from '@/assets/edit.svg';
import * as S from './FloatingButton.css';

const FloatingButton = ({ onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type="button" className={S.Layout} onClick={onClick}>
      <img src={EditIcon} className={S.EditIcon} />
    </button>
  );
};

export default FloatingButton;
