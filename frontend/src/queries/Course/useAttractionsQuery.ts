import { useQuery } from '@tanstack/react-query';
import { getAttractions } from '@/apis/course';
import { COURSE_KEYS } from '@/queries/queryKeys';

const useAttractionsQuery = (latitude: number, longitude: number) => {
  const { data, ...rest } = useQuery({
    queryKey: [COURSE_KEYS.ATTRACTIONS, { latitude, longitude }],
    queryFn: () => getAttractions({ latitude, longitude }),
  });

  return { attractionList: data ?? [], ...rest };
};

export default useAttractionsQuery;
