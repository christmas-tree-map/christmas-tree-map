import { Link } from 'react-router-dom';
import Tooltip from '@/components/_common/Tooltip/Tooltip';
import { COURSE_TEXT } from '@/constants/course';
import * as S from './CourseTooltip.css';

interface CourseTooltip {
  isOpen: boolean;
  id: string;
  type: string;
  title: string;
}

const CourseTooltip = ({ isOpen, id, type, title, children }: React.PropsWithChildren<CourseTooltip>) => {
  return (
    <div className={S.Layout}>
      {children}
      {isOpen && (
        <Tooltip>
          <div className={S.Container}>
            <p className={S.TypeText}>{COURSE_TEXT[type]}</p>
            <p>{title}</p>
            <Link className={S.Link} to={`https://map.kakao.com/link/map/${id}`} target="_blank">
              카카오맵 이동하기
            </Link>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default CourseTooltip;
