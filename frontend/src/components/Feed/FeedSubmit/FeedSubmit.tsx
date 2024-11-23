import { useNavigate } from 'react-router-dom';

import TextArea from '@/components/_common/TextArea/TextArea';

import * as S from './FeedSubmit.css';

const FeedSubmit = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <form className={S.Layout} onSubmit={handleSubmit}>
      <div className={S.ImageUploadBox}>
        <p className={S.Label}>업로드 할 이미지를 선택해 주세요.</p>
        <img src="" alt="이미지 업로드" />
      </div>
      <TextArea>
        <TextArea.Label>설명</TextArea.Label>
      </TextArea>
      <button type="submit">제출</button>
    </form>
  );
};

export default FeedSubmit;
