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

    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <div id="map" className={S.Layout}>
      Hello World!
    </div>
  );
};

export default TreeMap;
