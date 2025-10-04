import { useEffect, useMemo } from 'react';
import { Location, NavigateFunction } from 'react-router-dom';
import useModalContent from '@/hooks/TreeMap/useModalContent';

interface UseMapModalParams {
  location: Location;
  openModal: () => void;
  closeModal: () => void;
  navigate: NavigateFunction;
}

export const useMapModal = ({ location, openModal, closeModal, navigate }: UseMapModalParams) => {
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const modalType = searchParams.get('modal');
  const modalContent = useModalContent(modalType);

  useEffect(() => {
    if (modalType) {
      openModal();
    } else {
      closeModal();
    }
  }, [modalType, openModal, closeModal]);

  const handleCloseModal = () => {
    closeModal();
    navigate('/map');
  };

  return {
    modalType,
    modalContent,
    handleCloseModal,
  };
};
