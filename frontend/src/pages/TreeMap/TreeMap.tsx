import { useLocation, useNavigate } from 'react-router-dom';
import { IoRefresh } from '@react-icons/all-files/io5/IoRefresh';
import DelayedButton from '@/components/_common/DelayedButton/DelayedButton';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/_common/useModal';
import useMapMarkers from '@/hooks/TreeMap/useMapMarker';
import { useMapModal } from '@/hooks/TreeMap/useMapModal';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import useTreeClustersQuery from '@/queries/Tree/useTreeClustersQuery';
import useTreesQuery from '@/queries/Tree/useTreesQuery';
import { vars } from '@/styles/theme.css';
import * as S from './TreeMap.css';

const CLUSTER_VIEW_THRESHOLD = 5;

const TreeMap = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isModalOpen, openModal, closeModal } = useModal();
  const { map, mapRef, centerPosition, updatePosition, bounds, zoom } = useTreeMap();

  const isClusterView = zoom > CLUSTER_VIEW_THRESHOLD;

  const { trees, isLoading } = useTreesQuery({
    ...centerPosition,
    enabled: !isClusterView,
  });

  const { treeClusters } = useTreeClustersQuery({
    zoom,
    tr_latitude: bounds.ne.latitude,
    tr_longitude: bounds.ne.longitude,
    bl_latitude: bounds.sw.latitude,
    bl_longitude: bounds.sw.longitude,
    enabled: isClusterView,
  });

  const handleMarkerClick = (treeId: number) => {
    openModal();
    navigate(`/map/${treeId}?modal=feeds`);
  };

  useMapMarkers({
    map,
    isClusterView,
    trees,
    treeClusters,
    onMarkerClick: handleMarkerClick,
  });

  const { modalType, modalContent, handleCloseModal } = useMapModal({
    location,
    openModal,
    closeModal,
    navigate,
  });

  const handleSubmitClick = () => {
    navigate('/map?modal=submit', { state: { center: centerPosition } });
  };

  const shouldShowFloatingButton = modalType !== 'submit';

  return (
    <>
      <div ref={mapRef} className={S.Layout} />

      <DelayedButton delay={1000} onClick={updatePosition} isLoading={isLoading}>
        <IoRefresh size="18px" color={vars.colors.primary[700]} />
        <p>트리 검색</p>
      </DelayedButton>

      {shouldShowFloatingButton && <FloatingButton onClick={handleSubmitClick} />}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Modal.BackgroundSnowBall />
        {modalContent}
      </Modal>
    </>
  );
};

export default TreeMap;
