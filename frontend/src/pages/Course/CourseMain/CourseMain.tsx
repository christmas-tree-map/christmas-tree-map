import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';
import InputComboBox from '@/components/_common/InputComboBox/InputComboBox';
import Loading from '@/components/_common/Loading/Loading';
import CourseItem from '@/components/Course/CourseItem/CourseItem';
import { useDebounce } from '@/hooks/_common/useDebounce';
import useMapAddress from '@/hooks/TreeMap/useMapAddress';
import usePlaceSearch from '@/hooks/TreeMap/usePlaceSearch';
import useAttractionsQuery from '@/queries/Course/useAttractionsQuery';
import { extractAddressPart } from '@/utils/extractAddressPart';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import * as S from './CourseMain.css';

const DEBOUNCE_DELAY = 200;

const CourseMain = () => {
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY);

  const navigate = useNavigate();

  const { results, searchPlaces } = usePlaceSearch();
  const { getAddress, address } = useMapAddress();
  const { attractionList, isLoading } = useAttractionsQuery(currentPosition.latitude, currentPosition.longitude);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = formData.get('searchedComboBox');
    const selectedPlace = results.find((place) => place.place_name === data);
    if (!selectedPlace) return;

    navigate(`/course/detail?keyword=${data}&latitude=${selectedPlace.y}&longitude=${selectedPlace.x}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (!currentPosition) return;
    getAddress(currentPosition.latitude, currentPosition.longitude);
  }, [currentPosition]);

  useEffect(() => {
    if (!debouncedInputValue || debouncedInputValue.length === 0) return;
    searchPlaces(`${debouncedInputValue}`);
  }, [debouncedInputValue]);

  const currentCity = extractAddressPart(address, '시');

  return (
    <div className={S.Layout}>
      <div className={S.Container}>
        <div className={S.Circle} />
        <form className={S.FormSection} onSubmit={handleSubmit}>
          <InputComboBox
            label="어디로 떠나시나요?<br/>직접 선별한 코스를 알려드려요!"
            comboBoxList={results}
            value={inputValue}
            canSubmitByInput={false}
            buttonType="submit"
            buttonImage={IoIosSearch}
            onChangeValue={setInputValue}
            name={'searchedComboBox'}
          />
        </form>
        <section className={S.PlaceSection}>
          <div className={S.PlaceHeader}>
            <h1 className={S.Title}>{currentCity} 주변 가볼 만한 곳</h1>
            <p className={S.SubTitle}>장소를 누르면 카카오맵으로 연결됩니다.</p>
          </div>
          <div>
            {isLoading && <Loading variant="secondary" />}
            {attractionList &&
              attractionList.map((place) => (
                <CourseItem
                  key={place.id}
                  id={place.id}
                  title={place.place_name}
                  address={place.road_address_name}
                  phone={place.phone}
                  imgSrc={place.image_url}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseMain;
