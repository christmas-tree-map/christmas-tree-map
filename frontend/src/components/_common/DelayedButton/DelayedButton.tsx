import { useEffect, useState } from 'react';
import * as S from './DelayedButton.css';

interface DelayedButtonProps {
  delay?: number;
  position?: 'top' | 'bottom';
  layerLevel?: 'base' | 'modal';
  onClick: () => void;
  children: React.ReactNode;
}
const DelayedButton = ({
  delay = 500,
  onClick,
  children,
  position = 'top',
  layerLevel = 'base',
}: DelayedButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <button className={`${S.DelayedButtonStyle[position]} ${S.layerLevel[layerLevel]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default DelayedButton;
