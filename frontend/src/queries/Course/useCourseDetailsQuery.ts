import { useQuery } from '@tanstack/react-query';
import { getCourseDetails } from '@/apis/course';
import { COURSE_KEYS } from '@/queries/queryKeys';
import { DEFAULT_COURSE_DETAILS } from '@/constants/course';

const useCourseDetailsQuery = (latitude: string, longitude: string) => {
  const { data, refetch } = useQuery({
    queryKey: [COURSE_KEYS.DETAIL, { latitude, longitude }],
    queryFn: () => getCourseDetails(latitude, longitude),
  });

  return { courseDetails: data ?? DEFAULT_COURSE_DETAILS, refetch };
};

export default useCourseDetailsQuery;
