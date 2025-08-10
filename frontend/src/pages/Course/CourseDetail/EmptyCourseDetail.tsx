import { useNavigate } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import * as S from './EmptyCourseDetail.css';

const EmptyCourseDetail = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={S.Layout}>
      <div className={S.EmptyCourseDetail}>
        <p className={S.EmptyCourseDetailText}>추천 코스가 없어요🥲</p>
        <p className={S.EmptyCourseDetailText}>다른 장소를 검색해보세요</p>
        <div className={S.ButtonContainer}>
          <Button color="secondary" onClick={handleClick}>
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCourseDetail;
