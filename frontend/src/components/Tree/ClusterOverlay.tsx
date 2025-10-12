import { MouseEventHandler } from 'react';

interface ClusterOverlayProps {
  count: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ClusterOverlay = ({ count, onClick }: ClusterOverlayProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '100%',
        backgroundColor: 'yellow',
        zIndex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 0 10px 5px rgba(255, 255, 0, 0.5)',
      }}
    >
      <span style={{ color: 'black' }}>{count}</span>
    </button>
  );
};

export default ClusterOverlay;
