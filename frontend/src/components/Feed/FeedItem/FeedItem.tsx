import { formatDateTime } from '@/utils/formatDateTime';
import * as S from './FeedItem.css';
import type { FeedItemType } from './FeedItem.type';

const FeedItem = ({ name, createdAt, imageUrl, likeCount, content }: FeedItemType) => {
  return (
    <div className={S.Layout}>
      <div className={S.Header}>
        <p className={S.BodyText}>{name}</p>
        <p className={S.CreatedAtText}>{formatDateTime(createdAt)}</p>
      </div>
      <img src={imageUrl} draggable={false} className={S.Image} alt="feed" />
      <p className={S.LikeCountText}>{likeCount}</p>
      <p className={S.BodyText}>{content}</p>
    </div>
  );
};

export default FeedItem;
