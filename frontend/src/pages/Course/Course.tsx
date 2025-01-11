import { useState } from 'react';
import { useEffect } from 'react';
import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';
import InputComboBox from '@/components/_common/InputComboBox/InputComboBox';
import CourseSearchedPlaceItem from '@/components/Course/CourseSearchedPlaceItem/CourseSearchedPlaceItem';
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
          {searchedPlaceList && searchedPlaceList.map((place) => <CourseSearchedPlaceItem place={place} />)}
        </section>
      </div>
    </div>
  );
};

export default Course;
