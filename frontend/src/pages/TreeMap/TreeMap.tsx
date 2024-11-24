import { useEffect } from 'react';

import * as S from './TreeMap.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const TreeMap = () => {
  useEffect(() => {
    const container = document.getElementById('map');

    if (!navigator.geolocation) {
      const options = {
        center: new window.kakao.maps.LatLng(37.5503, 126.9971),
        level: 3,
      };

      new window.kakao.maps.Map(container, options);
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      new window.kakao.maps.Map(container, options);
    });
  }, []);

  return <div id="map" className={S.Layout} />;
};

export default TreeMap;
