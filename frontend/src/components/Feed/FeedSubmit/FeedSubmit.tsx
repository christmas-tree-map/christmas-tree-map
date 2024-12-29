import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiImageAddLine } from '@react-icons/all-files/ri/RiImageAddLine';
import Button from '@/components/_common/Button/Button';
import Input from '@/components/_common/Input/Input';
import TextArea from '@/components/_common/TextArea/TextArea';
import useFeedSubmit from '@/hooks/Feed/useFeedSubmit';
import useImageUploader from '@/hooks/Feed/useImageUploader';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import mapIcon from '@/assets/map.png';
import * as S from './FeedSubmit.css';

const FeedSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { getAddress, currentAddress } = useTreeMap();
  const { imageUrl, fileInputRef, handleImageUploadClick, handleImageChange } = useImageUploader();
  const {
    content,
    password,
    center,
    handleContentChange,
    handlePasswordChange,
    handleSubmit,
    handleSelectMarkerClick,
  } = useFeedSubmit({
    imageFile: fileInputRef.current?.files?.[0] ?? null,
    location,
    navigate,
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
        <div className={S.SelectMarkerTextBox}>
          <p className={S.SelectMarkerText}>
            현재 선택된 주소
            <br />
            {currentAddress}
          </p>
        </div>
        <div className={S.AddressSelectButtonBox}>
          <Button color="secondary" onClick={handleSelectMarkerClick}>
            다시 선택
          </Button>
        </div>
      </div>

      <div className={S.ImageUploadBox}>
        <p className={S.LabelText}>이미지 업로드</p>
        {imageUrl ? (
          <img src={imageUrl} className={S.UploadedImage} alt="업로드된 이미지" onClick={handleImageUploadClick} />
        ) : (
          <div className={S.UploadBox} onClick={handleImageUploadClick}>
            <RiImageAddLine size={39} />
            <p className={S.LabelText}>첨부할 이미지를 선택해 주세요.</p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} className={S.ImageInput} ref={fileInputRef} />
      </div>

      <TextArea value={content} onChange={handleContentChange}>
        <TextArea.Label label="설명" />
      </TextArea>
      <Input label="비밀번호" type="password" value={password} onChange={handlePasswordChange} />
      <Button type="submit" color="primary">
        제출
      </Button>
    </form>
  );
};

export default FeedSubmit;
