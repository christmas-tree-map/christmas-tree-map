import { useParams } from 'react-router-dom';
import useFeedsQuery from '@/queries/Feed/useFeedsQuery';
import FeedItem from '../FeedItem/FeedItem';
import * as S from './FeedList.css';

const FeedList = () => {
  const { treeId: treeIdParam } = useParams();
  const treeId = Number(treeIdParam);

  if (!treeId) {
    throw new Error();
  }

  const { feeds } = useFeedsQuery(treeId);

  return (
    <div className={S.Layout}>
      {feeds && feeds.length > 0 ? feeds.map((feed) => <FeedItem key={feed.id} feed={feed} />) : <>피드가 없습니다.</>}
    </div>
  );
};

export default FeedList;
