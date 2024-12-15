import { useEffect } from 'react';

const { kakao } = window;

interface useMapEventHandlerProps {
  map: kakao.maps.Map | null;
  eventName: string;
  onEvent: (map: kakao.maps.Map) => void;
}

const useMapEventHandler = ({ map, eventName, onEvent }: useMapEventHandlerProps) => {
  useEffect(() => {
    if (!map) return;

    const eventHandler = () => {
      onEvent(map);
    };

    kakao.maps.event.addListener(map, eventName, eventHandler);

    return () => {
      kakao.maps.event.removeListener(map, eventName, eventHandler);
    };
  }, [map, eventName, onEvent]);
};

export default useMapEventHandler;
