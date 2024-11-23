import * as S from './FloatingButton.css';

interface FloatingButtonProps {
  onHandleClick: () => void;
}

const FloatingButton = ({ onHandleClick }: FloatingButtonProps) => {
  return (
    <button className={S.floatingButtonStyle} onClick={onHandleClick}>
      작성
    </button>
  );
};

export default FloatingButton;
