import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoRefresh } from '@react-icons/all-files/io5/IoRefresh';
import DelayedButton from '@/components/_common/DelayedButton/DelayedButton';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/_common/useModal';
import useModalContent from '@/hooks/TreeMap/useModalContent';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import useTreesQuery from '@/queries/Tree/useTreesQuery';
import { vars } from '@/styles/theme.css';
import * as S from './TreeMap.css';

const TreeMap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isModalOpen, openModal, closeModal } = useModal();
  const { map, mapRef, addMarker, centerPosition, updateCenterPosition, clearMarkers } = useTreeMap();
  const { trees, isSuccess, isLoading } = useTreesQuery(centerPosition);

  const handleMarkerClick = (treeId: number) => {
    openModal();
    navigate(`/map/${treeId}?modal=feeds`);
  };

  useEffect(() => {
    if (map === null || !isSuccess) return;

    clearMarkers();
    trees.forEach((tree) =>
      addMarker(map, tree.latitude, tree.longitude, tree.imageCode, () => handleMarkerClick(tree.id)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isSuccess, centerPosition, trees]);

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location]);
  const modalType = searchParams.get('modal');
  const modalContent = useModalContent(modalType);

  const handleButtonClick = () => {
    navigate('/map?modal=submit', { state: { center: centerPosition } });
  };

  const handleCloseModal = () => {
    closeModal();
    navigate('/map');
  };

  useEffect(() => {
    if (modalType) {
      openModal();
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalType, location]);

  return (
    <>
      <div ref={mapRef} className={S.Layout} />
      <DelayedButton delay={1000} onClick={updateCenterPosition} isLoading={isLoading}>
        <IoRefresh size="18px" color={vars.colors.primary[700]} />
        <p>트리 검색</p>
      </DelayedButton>
      {modalType !== 'submit' && <FloatingButton onClick={handleButtonClick} />}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Modal.BackgroundSnowBall />
        {modalContent}
      </Modal>
    </>
  );
};

export default TreeMap;
