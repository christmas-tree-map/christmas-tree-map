import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import ModalLayout from '@/components/_common/Modal/ModalLayout';

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
      <ModalLayout isOpen={isOpen}>
        <Outlet />
      </ModalLayout>
    </div>
  );
};

export default Landing;
