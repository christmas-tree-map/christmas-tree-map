import * as S from './FeedItem.css';
import type { FeedItemType } from './FeedItem.type';

const FeedItem = ({ name, createdAt, imageUrl, likeCount, content }: FeedItemType) => {
  return (
    <div className={S.Layout}>
      <div className={S.Header}>
        <p className={S.Body}>{name}</p>
        <p className={S.CreatedAt}>{createdAt}</p>
      </div>
      <img src={imageUrl} draggable={false} className={S.Image} alt="feed" />
      <p className={S.LikeCount}>{likeCount}</p>
      <p className={S.Body}>{content}</p>
    </div>
  );
};

export default FeedItem;
