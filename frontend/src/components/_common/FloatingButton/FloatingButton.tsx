import * as S from './FloatingButton.css';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <button className={S.Layout} onClick={onClick}>
      작성
    </button>
  );
};

export default FloatingButton;
