import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import treeImage from '@/assets/tree.png';

interface SearchedPlace {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const { kakao } = window;

const DEFAULT_ZOOM_LEVEL = 3;

const MARKER_IMAGE: Record<string, string> = {
  TREE_01: treeImage,
};

const useTreeMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [searchedPlaceList, setSearchedPlaceList] = useState<SearchedPlace[]>([]);

  const MARKER_SIZE = new kakao.maps.Size(50, 55);
  const MARKER_OPTIONS = { offset: new kakao.maps.Point(25, 55) };

  const initializeMap = (latitude: number, longitude: number) => {
    if (mapRef.current && kakao && kakao.maps) {
      const options = { center: new kakao.maps.LatLng(latitude, longitude), level: DEFAULT_ZOOM_LEVEL };
      const map = new kakao.maps.Map(mapRef.current, options);

      setMap(map);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addMarker = (map: any, latitude: number, longitude: number, imageCode: string, onClick?: () => void) => {
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const markerImage = new kakao.maps.MarkerImage(MARKER_IMAGE[imageCode], MARKER_SIZE, MARKER_OPTIONS);
    const marker = new kakao.maps.Marker({ position: markerPosition, image: markerImage, clickable: true });

    if (onClick) kakao.maps.event.addListener(marker, 'click', onClick);

    marker.setMap(map);
  };

  const getAddress = useCallback((latitude: number, longitude: number): void => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(latitude, longitude);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
        setCurrentAddress(address);
      } else {
        setCurrentAddress('주소 정보를 찾을 수 없습니다.');
      }
    });
  }, []);

  const searchPlaces = (keyword: string, count: number) => {
    if (!keyword) return;

    const places = new kakao.maps.services.Places();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return places.keywordSearch(keyword, (data: any[], status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchedPlaceList(data.slice(0, count));
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        return;
      }
    });
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      initializeMap(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
      return;
    }

    navigator.geolocation.getCurrentPosition((position) =>
      initializeMap(position.coords.latitude, position.coords.longitude),
    );
  }, []);

  return { map, mapRef, currentAddress, addMarker, getAddress, searchPlaces, searchedPlaceList };
};

export default useTreeMap;
