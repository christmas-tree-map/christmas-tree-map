/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

const { kakao } = window;

interface useMapEventHandlerProps {
  map: any;
  eventName: string;
  onEvent: (map: any) => void;
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
