import { useNavigate } from 'react-router-dom';
import useFeedsQuery from '@/queries/Feed/useFeedsQuery';
import FloatingButton from '../../_common/FloatingButton/FloatingButton';
import FeedItem from '../FeedItem/FeedItem';
import * as S from './FeedList.css';

const FeedList = () => {
  const navigate = useNavigate();
  const { feeds } = useFeedsQuery();

  const handleClickFloatingButton = () => {
    navigate('/submit');
  };

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

      <FloatingButton onHandleClick={handleClickFloatingButton} />
    </div>
  );
};

export default FeedList;
