interface ClusterMarkerProps {
  count: number;
}

export const ClusterMarker = ({ count }: ClusterMarkerProps) => {
  return (
    <button
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

export const createClusterMarkerHTML = (count: number): string => {
  const marker = document.createElement('button');
  marker.style.width = '50px';
  marker.style.height = '50px';
  marker.style.borderRadius = '100%';
  marker.style.backgroundColor = 'yellow';
  marker.style.zIndex = '1';
  marker.style.display = 'flex';
  marker.style.justifyContent = 'center';
  marker.style.alignItems = 'center';
  marker.style.pointerEvents = 'pointer';
  marker.style.boxShadow = '0 0 10px 5px rgba(255, 255, 0, 0.5)';
  marker.innerHTML = `<span style="color: black;">${count}</span>`;
  return marker.outerHTML;
};
