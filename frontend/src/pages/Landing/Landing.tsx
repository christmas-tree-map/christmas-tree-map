import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@/components/_common/Button/Button';
import SnowAnimation from '@/components/Landing/SnowAnimation/SnowAnimation';
import { getTrees } from '@/apis/tree';
import { TREE_KEYS } from '@/queries/queryKeys';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import Garland from '@/assets/garland.svg';
import Snowman from '@/assets/snowman.svg';
import * as S from './Landing.css';

const FALLBACK_LOCATION = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
};

const Landing = () => {
  const queryClient = useQueryClient();
  const [isLocationReady, setIsLocationReady] = useState(false);

  useEffect(() => {
    const setLocation = (location: typeof FALLBACK_LOCATION) => {
      sessionStorage.setItem('userLocation', JSON.stringify(location));
      setIsLocationReady(true);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLocation(FALLBACK_LOCATION);
        },
      );
    }
  }, []);

  const handleButtonPrefetch = () => {
    import('@/pages/TreeMap/TreeMap');
    import('@/hooks/TreeMap/useTreeMap');

    const savedLocation = sessionStorage.getItem('userLocation');
    const location = savedLocation ? JSON.parse(savedLocation) : FALLBACK_LOCATION;

    queryClient.prefetchQuery({
      queryKey: [TREE_KEYS.TREES, location.latitude, location.longitude],
      queryFn: () => getTrees({ latitude: location.latitude, longitude: location.longitude }),
    });
  };

  return (
    <div className={S.Layout}>
      <div className={S.CircleContainer}>
        <div className={S.Circle} />
        <img className={S.GarlandImage} src={Garland} />
        <img className={S.SnowmanImage} src={Snowman} />
        <SnowAnimation />
        <div className={S.TitleContainer}>
          <p className={S.Title['default']}>메리 크리스마스?</p>
          <br />
          <p className={S.Title['delayed']}>
            <span>오늘부터</span> 메리, 트리스마스!
          </p>
        </div>
      </div>
      <div className={S.FooterContainer}>
        <p className={S.Text}>
          메리 트리스마스와 함께
          <br />
          낭만적인 크리스마스를 만들어 보세요!
        </p>
        <div className={S.ButtonContainer}>
          <Link to="/map">
            <Button
              color="secondary"
              onTouchStart={handleButtonPrefetch}
              onMouseEnter={handleButtonPrefetch}
              disabled={!isLocationReady}
            >
              {isLocationReady ? '시작하기' : '위치 불러오는 중...'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
