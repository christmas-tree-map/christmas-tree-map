import useTreeMap from '@/hooks/TreeMap/useTreeMap';

import * as S from './TreeMap.css';

const TreeMap = () => {
  const { mapRef } = useTreeMap();

  return <div ref={mapRef} className={S.Layout} />;
};

export default TreeMap;
