import { useEffect, useState } from 'react';
import * as S from './DelayedButton.css';

interface DelayedButtonProps {
  delay?: number;
  onClick: () => void;
  children: React.ReactNode;
}
const DelayedButton = ({ delay = 500, onClick, children }: DelayedButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <button className={S.DelayedButtonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default DelayedButton;
