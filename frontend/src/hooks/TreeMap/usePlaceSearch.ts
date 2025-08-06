import { useState } from 'react';

const { kakao } = window;

export interface Place {
  id: string;
  place_name: string;
  x: string;
  y: string;
  address_name: string;
}

const usePlaceSearch = () => {
  const [results, setResults] = useState<Place[]>([]);

  const searchPlaces = (keyword: string) => {
    if (!keyword) return;

    const ps = new kakao.maps.services.Places();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ps.keywordSearch(keyword, (data: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        setResults(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setResults([]);
      } else if (status === kakao.maps.services.Status.ERROR) {
        console.error('검색 에러');
      }
    });
  };

  return { results, searchPlaces };
};

export default usePlaceSearch;
