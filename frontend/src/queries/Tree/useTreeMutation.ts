import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { postTree } from '@/apis/tree';
import { TREE_KEYS } from '../queryKeys';

const useTreeMutation = () => {
  const { mutateAsync: addTreeMutation } = useMutation({
    mutationFn: postTree,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TREE_KEYS.TREES] });
    },
  });

  const addTree = async ({
    latitude,
    longitude,
    imageCode,
  }: {
    latitude: number;
    longitude: number;
    imageCode: string;
  }) => {
    const treeId = await addTreeMutation({ latitude, longitude, imageCode });
    return treeId;
  };

  return { addTree };
};

export default useTreeMutation;
