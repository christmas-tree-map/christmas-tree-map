import { useState } from 'react';

const useModal = (defaultValue: boolean = false) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValue);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return { isModalOpen, openModal, closeModal, toggleModal };
};

export default useModal;
