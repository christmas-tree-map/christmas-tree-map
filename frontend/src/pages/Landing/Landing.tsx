import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import ModalLayout from '@/components/_common/Modal/ModalLayout';

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>트리 에셋</button>
      <ModalLayout isOpen={isOpen}>
        <Outlet />
      </ModalLayout>
    </div>
  );
};

export default Landing;
