import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/_common/useModal';
import useModalContent from '@/hooks/TreeMap/useModalContent';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import * as S from './TreeMap.css';

const TreeMap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isModalOpen, openModal, closeModal } = useModal();
  const { map, mapRef, addMarker } = useTreeMap();
  const [currentPosition, setCurrentPosition] = useState({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location]);
  const modalType = searchParams.get('modal');
  const modalContent = useModalContent(modalType);

  // 뒤로가기로 '/' 이동을 방지
  useEffect(() => {
    if (modalType) {
      window.history.replaceState(null, '', location.pathname + location.search);
    }
  }, [modalType]);

  const handleMarkerClick = () => {
    const treeId = 1; // TODO: 수정 필요
    openModal();
    navigate(`/map?modal=feeds&treeId=${treeId}`);
  };

  const handleButtonClick = () => {
    openModal();
    navigate('/map?modal=submit', { state: { center: currentPosition } });
  };

  const handleCloseModal = useCallback(() => {
    closeModal();
    navigate('/');
  }, []);

  useEffect(() => {
    if (!modalType) {
      closeModal();
    } else {
      openModal();
    }
  }, [modalType]);

  useEffect(() => {
    if (map === null) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ latitude, longitude });
      addMarker(map, latitude, longitude, handleMarkerClick);
    });
  }, [map]);

  return (
    <>
      <div ref={mapRef} className={S.Layout} />
      {modalType !== 'submit' && <FloatingButton onClick={handleButtonClick} />}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Modal.BackgroundSnowBall />
        {modalContent}
      </Modal>
    </>
  );
};

export default TreeMap;
