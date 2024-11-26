import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Modal from '@/components/_common/Modal/Modal';

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);

    if (!nextIsOpen) {
      navigate('/');
    }
  };

  return (
    <div>
      <button onClick={toggleModal}>트리 에셋</button>
      <Modal isOpen={isOpen}>
        <Outlet />
      </Modal>
    </div>
  );
};

export default Landing;
