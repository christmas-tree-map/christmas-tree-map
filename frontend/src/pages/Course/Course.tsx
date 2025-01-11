import { useState } from 'react';
import { useEffect } from 'react';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import { formatAddress } from '@/utils/formatAddress';

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

  useEffect(() => {
    const currentCity = formatAddress(currentAddress, '시');

    if (!currentCity || currentCity.length === 0) return;

    searchPlaces(`${currentCity} 가볼만한 곳`, 3);
  }, [currentAddress]);

  return (
    <div>
      <p>어디로 떠나시나요?\n직접 선별한 코스를 알려드려요!</p>
      {currentAddress}
      {searchedPlaceList &&
        searchedPlaceList.map((place) => (
          <div key={place.id}>
            <p>{place.place_name}</p>
            <p>{place.road_address_name}</p>
            <p>{place.phone}</p>
          </div>
        ))}
    </div>
  );
};

export default Course;
