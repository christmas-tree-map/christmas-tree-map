import { useEffect, useState } from 'react';

import { getFeeds } from '@/apis/Feed';

import FeedItem from './FeedItem/FeedItem';
import type { FeedItemType } from './FeedItem/FeedItem.type';

const FeedList = () => {
  const [feeds, setFeeds] = useState<FeedItemType[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      const response = await getFeeds();
      setFeeds(response);
    };

    fetchFeeds();
  }, []);

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
    </>
  );
};

export default FeedList;
