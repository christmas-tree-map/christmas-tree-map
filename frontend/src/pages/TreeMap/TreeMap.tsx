import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/_common/useModal';
import useModalContent from '@/hooks/_common/useModalContent';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import * as S from './TreeMap.css';

const TreeMap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isModalOpen, openModal, closeModal } = useModal();
  const { map, mapRef, addMarker } = useTreeMap();

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
    openModal();
    navigate('/?modal=feeds');
  };

  const handleButtonClick = () => {
    openModal();
    navigate('/?modal=submit');
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

    navigator.geolocation.getCurrentPosition((position) =>
      addMarker(map, position.coords.latitude, position.coords.longitude, handleMarkerClick),
    );
  }, [map]);

  return (
    <>
      <div ref={mapRef} className={S.Layout} />
      {modalType !== 'submit' && <FloatingButton onClick={handleButtonClick} />}
      <Modal isOpen={isModalOpen} handleClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default TreeMap;
