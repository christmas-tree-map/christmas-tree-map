import { useLocation } from 'react-router-dom';
import RouteGuard from '@/components/_common/RouteGuard/RouteGuard';
import FeedEdit from './FeedEdit';

const FeedEditGuard = () => {
  const location = useLocation();
  const feedId = location.state?.feedId;
  const treeId = location.state?.treeId;

  return (
    <RouteGuard condition={!feedId || !treeId} redirectPath="/map">
      <FeedEdit feedId={feedId} treeId={treeId} />
    </RouteGuard>
  );
};

export default FeedEditGuard;
