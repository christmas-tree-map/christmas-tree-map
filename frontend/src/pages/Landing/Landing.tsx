import { useState } from 'react';

import FeedList from '@/components/Feed/FeedList';
import ModalLayout from '@/components/_common/Modal/ModalLayout';

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>트리 에셋</button>
      <ModalLayout isOpen={isOpen}>
        <FeedList />
      </ModalLayout>
    </div>
  );
};

export default Landing;
