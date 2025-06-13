import { useLocation } from 'react-router-dom';
import RouteGuard from '@/components/_common/RouteGuard/RouteGuard';
import FeedEdit from './FeedEdit';

const FeedEditGuard = () => {
  const location = useLocation();
  const feedId = location.state?.feedId;

  return (
    <RouteGuard condition={!feedId} redirectPath="/map">
      <FeedEdit feedId={feedId} />
    </RouteGuard>
  );
};

export default FeedEditGuard;
