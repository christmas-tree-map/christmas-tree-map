import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { RiImageAddLine } from '@react-icons/all-files/ri/RiImageAddLine';
import Button from '@/components/_common/Button/Button';
import TextArea from '@/components/_common/TextArea/TextArea';
import useFeedEdit from '@/hooks/Feed/useFeedEdit';
import useImageUploader from '@/hooks/Feed/useImageUploader';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import useFeedQuery from '@/queries/Feed/useFeedQuery';
import { FEED } from '@/constants/feed';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import mapIcon from '@/assets/map.png';
import * as S from './FeedEdit.css';

interface FeedEditProps {
  feedId: string;
  treeId: string;
}

const FeedEdit = ({ feedId, treeId }: FeedEditProps) => {
  const location = useLocation();
  const center: { latitude: number; longitude: number } = useMemo(
    () =>
      location.state?.center ?? {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
      },
    [location.state.center],
  );

  const { feed } = useFeedQuery(feedId);
  const { getAddress, currentAddress } = useTreeMap();
  const { imageUrl, fileInputRef, handleImageUploadClick, handleImageChange } = useImageUploader();
  const { content, isContentError, handleContentChange, handleSubmit } = useFeedEdit({
    feedId,
    treeId,
    initialImageFile: fileInputRef.current?.files?.[0] ?? null,
    initialContent: feed?.content ?? '',
  });

  useEffect(() => {
    getAddress(center.latitude, center.longitude);
  }, [center, getAddress]);

  return (
    <form className={S.Layout} onSubmit={handleSubmit}>
      <div className={S.SelectMarkerBox}>
        <div className={S.MapIconWrapper}>
          <img src={mapIcon} alt="Map Icon" className={S.MapIcon} />
        </div>
        <p className={S.SelectMarkerText}>
          현재 트리 주소
          <br />
          {currentAddress}
        </p>
      </div>

      <div className={S.ImageUploadBox}>
        <p className={S.LabelText}>이미지 업로드</p>
        {imageUrl ? (
          <img
            src={feed?.imageUrl ?? imageUrl}
            className={S.UploadedImage}
            alt="업로드된 이미지"
            onClick={handleImageUploadClick}
          />
        ) : (
          <div className={S.UploadBox} onClick={handleImageUploadClick}>
            <RiImageAddLine size={39} />
            <p className={S.LabelText}>첨부할 이미지를 선택해 주세요.</p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} className={S.ImageInput} ref={fileInputRef} />
      </div>

      <TextArea
        value={content}
        onChange={handleContentChange}
        status={isContentError ? 'error' : 'default'}
        errorMessage="내용을 작성해 주세요."
        maxLength={FEED.contentMaxLength}
      >
        <TextArea.Label label="설명" />
      </TextArea>
      <Button type="submit" color="primary" disabled={isContentError ? true : false}>
        제출
      </Button>
    </form>
  );
};

export default FeedEdit;
