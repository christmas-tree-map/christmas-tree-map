import { useCallback, useState } from 'react';

const useModal = (defaultValue: boolean = false) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValue);

  const openModal = useCallback(() => setIsModalOpen(true), []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

  return { isModalOpen, openModal, closeModal, toggleModal };
};

export default useModal;
