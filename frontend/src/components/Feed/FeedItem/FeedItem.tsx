import { useSearchParams } from 'react-router-dom';
import HeartWithCount from '@/components/_common/HeartWithCount/HeartWithCount';
import useFeedMutation from '@/queries/Feed/useFeedMutation';
import { formatDateTime } from '@/utils/formatDateTime';
import { manageLikedFeeds } from '@/utils/manageLikedFeeds';
import * as S from './FeedItem.css';
import type { FeedItemType } from './FeedItem.type';

interface FeedItemProps {
  feed: FeedItemType;
}

const FeedItem = ({ feed }: FeedItemProps) => {
  const { id, nickname, updatedAt, imageUrl, likeCount, content, treeImageCode } = feed;
  const { addLikeFeedMutation, deleteLikeFeedMutation } = useFeedMutation();

  const [searchParams] = useSearchParams();
  const treeId = Number(searchParams.get('treeId'));

  const likedFeedList = JSON.parse(localStorage.getItem('liked_feeds') ?? '{}');
  const isSelected = likedFeedList[treeId] ? likedFeedList[treeId].includes(id) : false;

  const handleLiked = () => {
    if (isSelected) {
      deleteLikeFeedMutation({ feedId: id });
    } else {
      addLikeFeedMutation({ feedId: id });
    }
    manageLikedFeeds(treeId, id);
  };

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
      <HeartWithCount isSelected={isSelected} count={likeCount} onClickIcon={handleLiked} />
      <p className={S.BodyText}>{content}</p>
    </div>
  );
};

export default FeedItem;
