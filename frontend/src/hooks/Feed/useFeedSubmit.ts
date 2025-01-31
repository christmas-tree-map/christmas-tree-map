import { useState } from 'react';
import { Location, NavigateFunction } from 'react-router-dom';
import useFeedMutation from '@/queries/Feed/useFeedMutation';
import useTreeMutation from '@/queries/Tree/useTreeMutation';
import useTreesQuery from '@/queries/Tree/useTreesQuery';
import { validateContent, validatePassword } from '@/utils/validate';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';

interface UseFeedSubmitProps {
  imageFile: File | null;
  location: Location;
  navigate: NavigateFunction;
}

const useFeedSubmit = ({ imageFile, location, navigate }: UseFeedSubmitProps) => {
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const center: { latitude: number; longitude: number } = location.state?.center ?? {
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  };

  const [isContentError, setIsContentError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const { addFeedMutation } = useFeedMutation();
  const { addTree } = useTreeMutation();
  const { trees } = useTreesQuery(center);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;

    if (!validateContent(content)) {
      setIsContentError(true);
    } else {
      setIsContentError(false);
    }

    setContent(content);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    if (!validatePassword(password)) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }

    setPassword(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageFile || isPasswordError || isContentError) return;

    // 주변 트리 탐색 후 트리가 있다면 가장 가까운 트리 ID에 피드 제출
    let currentTreeId = trees.length > 0 ? trees[0].id : 0;

    if (!trees || trees.length === 0 || currentTreeId === 0) {
      currentTreeId = await addTree({
        latitude: center.latitude,
        longitude: center.longitude,
        imageCode: 'TREE_01',
      });
    }

    await addFeedMutation({
      imageFile,
      treeId: currentTreeId,
      content,
      password,
    });
  };

  const handleSelectMarkerClick = () => navigate('/map/select');

  return {
    content,
    password,
    center,
    isContentError,
    isPasswordError,
    handleContentChange,
    handlePasswordChange,
    handleSubmit,
    handleSelectMarkerClick,
  };
};

export default useFeedSubmit;
