import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import useHideNavBar from '@/hooks/_common/useHideNavBar';
import useMapEventHandler from '@/hooks/TreeMap/useMapEventHandler';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import markerSelector from '@/assets/markerSelector.png';
import * as S from './MapMarkerSelector.css';

interface Center {
  latitude: number;
  longitude: number;
}

const MapMarkerSelector = () => {
  const navigate = useNavigate();
  useHideNavBar();
  const { map, mapRef } = useTreeMap();
  const [center, setCenter] = useState<Center>({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });

  useEffect(() => {
    if (!map) return;

    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [map]);

  const handleComplete = () => {
    navigate('/map?modal=submit', { state: { center } });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (map: any) => {
    const mapCenter = map.getCenter();
    setCenter({
      latitude: mapCenter.getLat(),
      longitude: mapCenter.getLng(),
    });
  };

  useMapEventHandler({ map, eventName: 'dragend', onEvent: handleDragEnd });

  return (
    <div className={S.Layout}>
      <div ref={mapRef} className={S.MapLayout} />
      <div className={S.ToolTip}>
        <p className={S.ToolTipText}>핀을 지정하고 싶은 장소를 선택해 주세요.</p>
      </div>
      <img src={markerSelector} className={S.MarkerSelector} />
      <div className={S.ButtonBox}>
        <Button color="primary" onClick={handleComplete}>
          완료
        </Button>
      </div>
    </div>
  );
};

export default MapMarkerSelector;
