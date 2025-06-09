import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdMore } from '@react-icons/all-files/io/IoMdMore';
import HeartWithCount from '@/components/_common/HeartWithCount/HeartWithCount';
import Tooltip from '@/components/_common/Tooltip/Tooltip';
import { TooltipMenus } from '@/components/_common/Tooltip/Tooltip.type';
import useFeedMutation from '@/queries/Feed/useFeedMutation';
import { formatDateTime } from '@/utils/formatDateTime';
import { manageLikedFeeds } from '@/utils/manageLikedFeeds';
import { TREE_IMAGE } from '@/constants/feed';
import { vars } from '@/styles/theme.css';
import * as S from './FeedItem.css';
import type { FeedItemType } from './FeedItem.type';

interface FeedItemProps {
  feed: FeedItemType;
  treeId: number;
}

const FeedItem = ({ feed, treeId }: FeedItemProps) => {
  const navigate = useNavigate();
  const { id, nickname, updatedAt, imageUrl, likeCount, content, treeImageCode } = feed;
  const { addLikeFeedMutation, deleteLikeFeedMutation } = useFeedMutation();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  if (!treeId) {
    throw new Error('treeId가 없습니다.');
  }

  const TOOLTIP_MENUS: TooltipMenus[] = [
    {
      name: '수정',
      onClick: () => {
        navigate(`/map/${treeId}?modal=password`);
      },
    },
  ];

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

  const handleToggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <div className={S.Layout}>
      <div className={S.Header}>
        <div className={S.HeaderLeft}>
          <img src={TREE_IMAGE[treeImageCode as keyof typeof TREE_IMAGE]} className={S.TreeImage} />
          <p className={S.BodyText}>{nickname}</p>
        </div>
        <div className={S.HeaderRight}>
          <p className={S.UpdatedAtText}>{formatDateTime(updatedAt)}</p>
          <IoMdMore color={vars.colors.grey[500]} onClick={handleToggleTooltip} />
          {isTooltipOpen && (
            <div className={S.TooltipBox}>
              <Tooltip menus={TOOLTIP_MENUS} />
            </div>
          )}
        </div>
      </div>
      <img src={imageUrl} draggable={false} className={S.Image} alt="feed" />
      <HeartWithCount isSelected={isSelected} count={likeCount} onClickIcon={handleLiked} />
      <p className={S.BodyText}>{content}</p>
    </div>
  );
};

export default FeedItem;
