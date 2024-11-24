import type { FeedItemType } from './FeedItem.type';

const FeedItem = ({ name, createdAt, imageUrl, likeCount, content }: FeedItemType) => {
  return (
    <div>
      {name}
      {createdAt}
      <img src={imageUrl} alt="feed" />
      {likeCount}
      {content}
    </div>
  );
};

export default FeedItem;
