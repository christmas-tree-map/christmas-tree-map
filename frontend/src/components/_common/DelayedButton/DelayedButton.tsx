import { useEffect, useState } from 'react';
import * as S from './DelayedButton.css';

interface DelayedButtonProps {
  delay?: number;
  position?: 'top' | 'bottom';
  layerLevel?: 'base' | 'modal';
  isLoading?: boolean;
  onClick: () => void;
}

const LoadingDots = () => {
  return (
    <div className={S.loadingWrapper}>
      <span className={S.dot} />
      <span className={S.dot} />
      <span className={S.dot} />
    </div>
  );
};

const DelayedButton = ({
  delay = 500,
  position = 'top',
  layerLevel = 'base',
  isLoading = false,
  onClick,
  children,
}: React.PropsWithChildren<DelayedButtonProps>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <button className={`${S.DelayedButtonStyle[position]} ${S.layerLevel[layerLevel]}`} onClick={onClick}>
      {isLoading ? <LoadingDots /> : children}
    </button>
  );
};

export default DelayedButton;
