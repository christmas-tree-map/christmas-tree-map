import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getFeeds } from '@/apis/feed';

import FloatingButton from '../../_common/FloatingButton/FloatingButton';
import FeedItem from '../FeedItem/FeedItem';
import { FeedItemType } from '../FeedItem/FeedItem.type';
import * as S from './FeedList.css';

const FeedList = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<FeedItemType[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      const response = await getFeeds();
      setFeeds(response);
    };

    fetchFeeds();
  }, []);

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
