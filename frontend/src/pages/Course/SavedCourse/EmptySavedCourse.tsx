import { useNavigate } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import * as S from './EmptySavedCourse.css';

const EmptySavedCourse = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={S.Layout}>
      <div className={S.EmptySavedCourse}>
        <p className={S.EmptySavedCourseText}>저장된 코스가 없어요🥲</p>
        <p className={S.EmptySavedCourseText}>코스를 저장해보세요</p>
        <div className={S.ButtonContainer}>
          <Button color="secondary" onClick={handleClick}>
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptySavedCourse;
