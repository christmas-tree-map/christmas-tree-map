import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import TextArea from '@/components/_common/TextArea/TextArea';
import useFeedMutation from '@/queries/Feed/useFeedMutation';
import * as S from './FeedSubmit.css';

const FeedSubmit = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { addFeedMutation } = useFeedMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addFeedMutation({ imageUrl, content });
    navigate('/feeds');
  };

  return (
    <form className={S.Layout} onSubmit={handleSubmit}>
      {/* 이미지 업로드 방식 논의 필요 */}
      <div className={S.ImageUploadBox}>
        <p className={S.LabelText}>업로드 할 이미지를 선택해 주세요.</p>
        <img src="" alt="이미지 업로드" />
      </div>
      <TextArea value={content} onChange={(e) => setContent(e.target.value)}>
        <TextArea.Label label="설명" />
      </TextArea>
      <Button type="submit" color="primary">
        제출
      </Button>
    </form>
  );
};

export default FeedSubmit;
