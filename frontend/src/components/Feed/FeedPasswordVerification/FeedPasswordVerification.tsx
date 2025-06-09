import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import Input from '@/components/_common/Input/Input';
import useFeedMutation from '@/queries/Feed/useFeedMutation';
import * as S from './FeedPasswordVerification.css';

const FeedPasswordVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { treeId } = useParams();
  const { postFeedPasswordMutation } = useFeedMutation();
  const [isError, setIsError] = useState(false);

  const handleInputChange = () => {
    setIsError(false);
  };

  const handlePasswordVerification = (password: string) => {
    if (!location.state?.feedId) return;

    postFeedPasswordMutation(
      { feedId: location.state.feedId, password },
      {
        onSuccess: (isValid: boolean) => {
          if (!isValid) {
            setIsError(true);
            return;
          }
          navigate(`/map?modal=submit`, { state: { treeId } });
        },
        onError: () => setIsError(true),
      },
    );
  };

  const renderPasswordForm = () => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        handlePasswordVerification(password);
      }}
    >
      <Input
        name="password"
        label="비밀번호를 입력해 주세요"
        status={isError ? 'error' : 'default'}
        errorMessage="비밀번호가 맞지 않습니다."
        type="password"
        onChange={handleInputChange}
      />
      <div className={S.Divider} />
      <Button color="primary" type="submit">
        입력하기
      </Button>
    </form>
  );

  return <div className={S.Layout}>{renderPasswordForm()}</div>;
};

export default FeedPasswordVerification;
