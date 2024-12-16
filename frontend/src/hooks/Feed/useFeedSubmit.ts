import { useState } from 'react';
import { Location, NavigateFunction } from 'react-router-dom';
import useFeedMutation from '@/queries/Feed/useFeedMutation';
import useTreeMutation from '@/queries/Tree/useTreeMutation';
import useTreesQuery from '@/queries/Tree/useTreesQuery';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';

interface UseFeedSubmitProps {
  imageFile: File;
  location: Location;
  navigate: NavigateFunction;
}

const useFeedSubmit = ({ imageFile, location, navigate }: UseFeedSubmitProps) => {
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [treeId, setTreeId] = useState<number>(location.state?.treeId ?? 0);
  const center: { latitude: number; longitude: number } = location.state?.center ?? {
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  };

  const { addFeedMutation } = useFeedMutation();
  const { addTree } = useTreeMutation();
  const { trees } = useTreesQuery(center);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let currentTreeId = treeId;

    if (!trees || trees.length === 0 || treeId === 0) {
      currentTreeId = await addTree({
        latitude: center.latitude,
        longitude: center.longitude,
        imageCode: 'TREE_01',
      });
      setTreeId(currentTreeId);
    }

    await addFeedMutation({
      imageFile,
      treeId: currentTreeId,
      content,
      password,
    });
  };

  const handleSelectMarkerClick = () => navigate('/select');

  return {
    content,
    password,
    handleContentChange,
    handlePasswordChange,
    handleSubmit,
    handleSelectMarkerClick,
  };
};

export default useFeedSubmit;
