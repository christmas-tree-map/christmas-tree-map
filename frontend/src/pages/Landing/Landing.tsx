import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    </div>
  );
};

export default Landing;
