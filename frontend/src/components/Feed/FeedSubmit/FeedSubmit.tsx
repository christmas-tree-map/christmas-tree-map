import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import Input from '@/components/_common/Input/Input';
import TextArea from '@/components/_common/TextArea/TextArea';
import useImageUploader from '@/hooks/_common/useImageUploader';
import useFeedMutation from '@/queries/Feed/useFeedMutation';
import useTreeMutation from '@/queries/Tree/useTreeMutation';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import mapIcon from '@/assets/map.png';
import santaWithWindow from '@/assets/santaWithWindow.png';
import * as S from './FeedSubmit.css';

const FeedSubmit = () => {
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const imageCode = 'TREE_01'; // TODO: 변경 필요
  const [treeId, setTreeId] = useState<number>();
  const center: { latitude: number; longitude: number } = location.state?.center || {
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  };

  const { addFeedMutation } = useFeedMutation();
  const { addTree } = useTreeMutation();

  const { imageUrl, imageFile, fileInputRef, handleImageUploadClick, handleImageChange } = useImageUploader();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) return;

    const treeId = await addTree({ latitude: center.latitude, longitude: center.longitude, imageCode });
    setTreeId(treeId);
    addFeedMutation({ imageFile, treeId, content, password });
    navigate('/?modal=feeds');
  };

  const handleSelectMarkerClick = () => {
    navigate('/select');
  };

  return (
    <form className={S.Layout} onSubmit={handleSubmit}>
      <div className={S.SelectMarkerBox} onClick={handleSelectMarkerClick}>
        <div className={S.MapIconWrapper}>
          <img src={mapIcon} alt="Map Icon" className={S.MapIcon} />
        </div>
        <p className={S.SelectMarkerText}>지도를 움직여 핀을 꽂아 보세요.</p>
      </div>

      <div className={S.ImageUploadBox}>
        <p className={S.LabelText}>업로드 할 이미지를 선택해 주세요.</p>
        {imageUrl ? (
          <img src={imageUrl} className={S.UploadedImage} alt="업로드된 이미지" onClick={handleImageUploadClick} />
        ) : (
          <img src={santaWithWindow} className={S.UploadedImage} onClick={handleImageUploadClick} alt="이미지 업로드" />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} className={S.ImageInput} ref={fileInputRef} />
      </div>

      <TextArea value={content} onChange={(e) => setContent(e.target.value)}>
        <TextArea.Label label="설명" />
      </TextArea>
      <Input label="비밀번호" type="password" />
      <Button type="submit" color="primary">
        제출
      </Button>
    </form>
  );
};

export default FeedSubmit;
