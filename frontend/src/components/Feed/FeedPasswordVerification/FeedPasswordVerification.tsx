import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import Input from '@/components/_common/Input/Input';
import * as S from './FeedPasswordVerification.css';

const FeedPasswordVerification = () => {
  const navigate = useNavigate();
  const { treeId } = useParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 성공시 콜백
    navigate(`/map?modal=submit`, { state: { treeId } });
  };

  return (
    <div className={S.Layout}>
      <form onSubmit={handleSubmit}>
        <Input label="비밀번호를 입력해 주세요" type="password" />
        <div className={S.Divider}></div>
        <Button color="primary" type="submit">
          입력하기
        </Button>
      </form>
    </div>
  );
};

export default FeedPasswordVerification;
