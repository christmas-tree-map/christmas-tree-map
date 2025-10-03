import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoRefresh } from '@react-icons/all-files/io5/IoRefresh';
import DelayedButton from '@/components/_common/DelayedButton/DelayedButton';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Modal from '@/components/_common/Modal/Modal';
import useModal from '@/hooks/_common/useModal';
import useModalContent from '@/hooks/TreeMap/useModalContent';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import useTreeClustersQuery from '@/queries/Tree/useTreeClustersQuery';
import useTreesQuery from '@/queries/Tree/useTreesQuery';
import { vars } from '@/styles/theme.css';
import * as S from './TreeMap.css';

const TreeMap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isModalOpen, openModal, closeModal } = useModal();
  const { map, mapRef, addMarker, addCustomOverlay, centerPosition, updateCenterPosition, clearMarkers, bounds, zoom } =
    useTreeMap();
  const isClusterView = zoom > 5 ? true : false;
  const { trees, isLoading } = useTreesQuery({ ...centerPosition, zoom, enabled: !isClusterView });
  const { treeClusters } = useTreeClustersQuery({
    zoom,
    tl_latitude: bounds?.ne.latitude,
    tl_longitude: bounds?.ne.longitude,
    br_latitude: bounds?.sw.latitude,
    br_longitude: bounds?.sw.longitude,
    enabled: isClusterView,
  });

  const handleMarkerClick = (treeId: number) => {
    openModal();
    navigate(`/map/${treeId}?modal=feeds`);
  };

  useEffect(() => {
    if (map === null) return;

    clearMarkers();

    if (isClusterView) {
      treeClusters.forEach((cluster) => {
        const marker = document.createElement('button');
        marker.style.width = '50px';
        marker.style.height = '50px';
        marker.style.borderRadius = '100%';
        marker.style.backgroundColor = 'yellow';
        marker.style.zIndex = '1';
        marker.style.display = 'flex';
        marker.style.justifyContent = 'center';
        marker.style.alignItems = 'center';
        marker.style.pointerEvents = 'pointer';
        marker.style.boxShadow = '0 0 10px 5px rgba(255, 255, 0, 0.5)';
        marker.innerHTML = `<span style="color: black;">${cluster.count}</span>`;
        const markerString = marker.outerHTML;
        addCustomOverlay(map, cluster.latitude, cluster.longitude, markerString, undefined);
      });
    } else {
      trees.forEach((tree) =>
        addMarker(map, tree.latitude, tree.longitude, tree.imageCode, () => handleMarkerClick(tree.id)),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, centerPosition, trees, zoom]);

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
