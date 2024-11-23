import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getFeeds } from '@/apis/Feed';

import FloatingButton from '../../_common/FloatingButton/FloatingButton';
import FeedItem from '../FeedItem/FeedItem';
import type { FeedItemType } from '../FeedItem/FeedItem.type';

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
    <>
      {feeds.length > 0 ? (
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
    </>
  );
};

export default FeedList;
