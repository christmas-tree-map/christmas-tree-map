import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextArea from '@/components/_common/TextArea/TextArea';

import { postFeed } from '@/apis/Feed';

import * as S from './FeedSubmit.css';

const FeedSubmit = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await postFeed({ imageUrl, content });
    navigate('/');
  };

  return (
    <form className={S.Layout} onSubmit={handleSubmit}>
      {/* 이미지 업로드 방식 논의 필요 */}
      <div className={S.ImageUploadBox}>
        <p className={S.Label}>업로드 할 이미지를 선택해 주세요.</p>
        <img src="" alt="이미지 업로드" /> 
      </div>
      <TextArea value={content} onChange={(e) => setContent(e.target.value)}>
        <TextArea.Label>설명</TextArea.Label>
      </TextArea>
      <button type="submit">제출</button>
    </form>
  );
};

export default FeedSubmit;
