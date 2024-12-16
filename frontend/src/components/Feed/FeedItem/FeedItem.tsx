import { formatDateTime } from '@/utils/formatDateTime';
import * as S from './FeedItem.css';
import type { FeedItemType } from './FeedItem.type';

interface FeedItemProps {
  feed: FeedItemType;
}

const FeedItem = ({ feed }: FeedItemProps) => {
  const { nickname, updatedAt, imageUrl, likeCount, content, treeImageCode } = feed;

  return (
    <div className={S.Layout}>
      <div className={S.Header}>
        <div className={S.NicknameBox}>
          <img src={treeImageCode} />
          <p className={S.BodyText}>{nickname}</p>
        </div>
        <p className={S.UpdatedAtText}>{formatDateTime(updatedAt)}</p>
      </div>
      <img src={imageUrl} draggable={false} className={S.Image} alt="feed" />
      <p className={S.LikeCountText}>{likeCount}</p>
      <p className={S.BodyText}>{content}</p>
    </div>
  );
};

export default FeedItem;
