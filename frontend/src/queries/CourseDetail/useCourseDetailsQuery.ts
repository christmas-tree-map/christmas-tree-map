import { useQuery } from '@tanstack/react-query';
import { getCourseDetails } from '@/apis/course';
import { COURSE_KEYS } from '@/queries/queryKeys';

const DEFAULT_COURSE_DETAILS = { lunch: null, cafe: null, attraction: null, dinner: null };

const useCourseDetailsQuery = (latitude: string, longitude: string) => {
  const { data } = useQuery({
    queryKey: [COURSE_KEYS.DETAIL, latitude, longitude],
    queryFn: () => getCourseDetails(latitude, longitude),
  });

  return { courseDetails: data ?? DEFAULT_COURSE_DETAILS };
};

export default useCourseDetailsQuery;
