import { Link } from 'react-router-dom';
import * as S from './CourseSearchedPlaceItem.css';
import { SearchedPlace } from './CourseSearchedPlaceItem.typs';

interface CourseSearchedPlaceItemProps {
  place: SearchedPlace;
}

const CourseSearchedPlaceItem = ({ place }: CourseSearchedPlaceItemProps) => {
  return (
    <Link to={`https://map.kakao.com/link/map/${place.id}`} target="_blank" key={place.id}>
      <div key={place.id} className={S.PlaceItemBox}>
        <img src={''} className={S.PlaceImage} alt="장소 썸네일" />
        <div className={S.PlaceContentBox}>
          <p className={S.PlaceName}>{place.place_name}</p>
          <div className={S.PlaceContentDetailBox}>
            <p className={S.PlaceAddress}>{place.road_address_name}</p>
            <p className={S.PlacePhone}>{place.phone}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseSearchedPlaceItem;
