import { useState } from 'react';
import { useEffect } from 'react';
import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';
import InputComboBox from '@/components/_common/InputComboBox/InputComboBox';
import CourseItem from '@/components/Course/CourseItem/CourseItem';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import useAttractionsQuery from '@/queries/Course/useAttractionsQuery';
import { extractAddressPart } from '@/utils/extractAddressPart';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import * as S from './CourseMain.css';

const CourseMain = () => {
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });

  const { getAddress, currentAddress } = useTreeMap();
  const { attractionList } = useAttractionsQuery(currentPosition.latitude, currentPosition.longitude);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (!currentPosition) return;
    getAddress(currentPosition.latitude, currentPosition.longitude);
  }, [currentPosition]);

  const currentCity = extractAddressPart(currentAddress, '시');

  return (
    <div className={S.Layout}>
      <div className={S.Container}>
        <div className={S.Circle} />
        <form className={S.FormSection}>
          <InputComboBox
            label="어디로 떠나시나요?<br/>직접 선별한 코스를 알려드려요!"
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
          <div>
            {attractionList &&
              attractionList.map((place) => (
                <CourseItem
                  key={place.id}
                  id={place.id}
                  title={place.place_name}
                  address={place.road_address_name}
                  phone={place.phone}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseMain;
