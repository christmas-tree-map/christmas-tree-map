import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/_common/useModal';
import useModalContent from '@/hooks/TreeMap/useModalContent';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import useTreesQuery from '@/queries/Tree/useTreesQuery';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import * as S from './TreeMap.css';

const TreeMap = () => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const { isModalOpen, openModal, closeModal } = useModal();
  const { map, mapRef, addMarker } = useTreeMap();
  const { trees, isSuccess } = useTreesQuery(currentPosition);

  const handleMarkerClick = (treeId: number) => {
    openModal();
    navigate(`/map?modal=feeds&treeId=${treeId}`);
  };

  useEffect(() => {
    if (map === null || !isSuccess) return;

    trees.forEach((tree) =>
      addMarker(map, tree.latitude, tree.longitude, tree.imageCode, () => handleMarkerClick(tree.id)),
    );
  }, [map, isSuccess]);

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location]);
  const modalType = searchParams.get('modal');
  const modalContent = useModalContent(modalType);

  const handleButtonClick = () => {
    navigate('/map?modal=submit', { state: { center: currentPosition } });
  };

  useEffect(() => {
    if (modalType) {
      openModal();
    } else {
      closeModal();
    }
  }, [modalType, location]);

  const handleCloseModal = () => {
    closeModal();
    navigate('/map');
  };

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
