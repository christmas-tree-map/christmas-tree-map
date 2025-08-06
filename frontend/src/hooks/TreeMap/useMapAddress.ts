import { useCallback, useState } from 'react';

const { kakao } = window;

const useMapAddress = () => {
  const [address, setAddress] = useState('');

  const getAddress = useCallback((latitude: number, longitude: number): void => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(latitude, longitude);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const addr = result[0].road_address?.address_name || result[0].address.address_name;
        setAddress(addr);
      } else {
        setAddress('주소 정보를 찾을 수 없습니다.');
      }
    });
  }, []);

  return { address, getAddress };
};

export default useMapAddress;
