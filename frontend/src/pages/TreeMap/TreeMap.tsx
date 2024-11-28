import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/_common/useModal';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import * as S from './TreeMap.css';

const TreeMap = () => {
  const navigate = useNavigate();

  const { isModalOpen, openModal } = useModal();
  const { map, mapRef, addMarker } = useTreeMap();

  const handleMarkerClick = () => {
    openModal();
    navigate('/');
  };

  useEffect(() => {
    if (map === null) return;

    navigator.geolocation.getCurrentPosition((position) =>
      addMarker(map, position.coords.latitude, position.coords.longitude, handleMarkerClick),
    );
  }, [map]);

  return (
    <>
      <div ref={mapRef} className={S.Layout} />
      <Modal isOpen={isModalOpen}>
        <Outlet />
      </Modal>
    </>
  );
};

export default TreeMap;
