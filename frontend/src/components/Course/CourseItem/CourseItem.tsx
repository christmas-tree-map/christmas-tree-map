import { Link } from 'react-router-dom';
import * as S from './CourseItem.css';

interface CourseItemProps {
  id: string;
  title: string;
  address: string;
  phone: string;
  imgSrc?: string;
  backgroundColor?: 'white' | 'grey';
}

const CourseItem = ({ id, title, address, phone, imgSrc, backgroundColor = 'white' }: CourseItemProps) => {
  return (
    <Link to={`https://map.kakao.com/link/map/${id}`} target="_blank">
      <div className={S.Layout[backgroundColor]}>
        {imgSrc && <img src={imgSrc} className={S.Image} alt="장소 썸네일" />}
        <div className={S.Container}>
          <p className={S.Title}>{title}</p>
          <div className={S.InfoContainer}>
            <p>{address}</p>
            <p className={S.PhoneText}>{phone}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
