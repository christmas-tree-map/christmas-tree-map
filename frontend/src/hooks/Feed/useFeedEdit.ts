import { useState } from 'react';
import useFeedMutation from '@/queries/Feed/useFeedMutation';
import { validateContent } from '@/utils/validate';

interface UseFeedEditProps {
  feedId: string;
  treeId: string;
  initialImageFile: File | null;
  initialContent: string;
}

const useFeedEdit = ({ feedId, treeId, initialImageFile, initialContent }: UseFeedEditProps) => {
  const imageFile = initialImageFile;
  const [content, setContent] = useState(initialContent);
  const [isContentError, setIsContentError] = useState(!content);

  const { updateFeedMutation } = useFeedMutation();

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;

    if (!validateContent(content)) {
      setIsContentError(true);
    } else {
      setIsContentError(false);
    }

    setContent(content);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isContentError) return;

    // 수정 시 트리 id 고정, 위치도 변경되지 않음
    await updateFeedMutation({
      feedId,
      treeId,
      imageFile,
      content,
    });
  };

  return {
    content,
    isContentError,
    handleContentChange,
    handleSubmit,
  };
};

export default useFeedEdit;
