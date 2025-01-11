import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';
import InputComboBox from '@/components/_common/InputComboBox/InputComboBox';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import { formatAddress } from '@/utils/formatAddress';
import * as S from './Course.css';

const Course = () => {
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const { getAddress, currentAddress, searchPlaces, searchedPlaceList } = useTreeMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (!currentPosition) return;
    getAddress(currentPosition.latitude, currentPosition.longitude);
  }, [currentPosition]);

  const currentCity = formatAddress(currentAddress, '시');
  useEffect(() => {
    if (!currentCity || currentCity.length === 0) return;

    searchPlaces(`${currentCity} 가볼만한 곳`, 3);
  }, [currentAddress]);

  return (
    <div className={S.Layout}>
      <div className={S.Container}>
        <div className={S.Circle} />
        <form className={S.FormSection}>
          <InputComboBox
            label="어디로 떠나시나요?\n직접 선별한 코스를 알려드려요!"
            comboBoxList={[]}
            value=""
            canSubmitByInput={false}
            buttonType="submit"
            buttonImage={IoIosSearch}
            onChangeValue={() => {}}
            name={'searchedComboBox'}
          />
        </form>
        <section className={S.PlaceSection}>
          <div className={S.PlaceHeader}>
            <h1 className={S.Title}>{currentCity} 주변 가볼 만한 곳</h1>
            <p className={S.SubTitle}>장소를 누르면 카카오맵으로 연결됩니다.</p>
          </div>
          {searchedPlaceList &&
            searchedPlaceList.map((place) => (
              <Link to="http://place.map.kakao.com/784414359" target="_blank">
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
            ))}
        </section>
      </div>
    </div>
  );
};

export default Course;
