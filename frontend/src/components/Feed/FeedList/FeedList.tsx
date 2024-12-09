import useFeedsQuery from '@/queries/Feed/useFeedsQuery';
import FeedItem from '../FeedItem/FeedItem';
import * as S from './FeedList.css';

const FeedList = () => {
  const { feeds } = useFeedsQuery();

  return (
    <div className={S.Layout}>
      {feeds && feeds.length > 0 ? (
        feeds.map((feed) => (
          <FeedItem
            key={feed.id}
            id={feed.id}
            name={feed.name}
            createdAt={feed.createdAt}
            imageUrl={feed.imageUrl}
            content={feed.content}
            likeCount={feed.likeCount}
          />
        ))
      ) : (
        <>피드가 없습니다.</>
      )}
    </div>
  );
};

export default FeedList;
