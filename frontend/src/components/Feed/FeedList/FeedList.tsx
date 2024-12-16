import { useSearchParams } from 'react-router-dom';
import useFeedsQuery from '@/queries/Feed/useFeedsQuery';
import FeedItem from '../FeedItem/FeedItem';
import * as S from './FeedList.css';

const FeedList = () => {
  const [searchParams] = useSearchParams();
  const treeIdSearchParam = searchParams.get('treeId');
  const treeId = treeIdSearchParam ? Number(treeIdSearchParam) : null;

  if (!treeId) {
    throw new Error();
  }

  const { feeds } = useFeedsQuery(treeId);

  return (
    <div className={S.Layout}>
      {feeds && feeds.length > 0 ? (
        feeds.map((feed, index) => (
          <FeedItem
            key={index}
            // key={feed.id} // TODO: 바꾸기
            feed={feed}
          />
        ))
      ) : (
        <>피드가 없습니다.</>
      )}
    </div>
  );
};

export default FeedList;
