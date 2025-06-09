import FeedList from '@/components/Feed/FeedList/FeedList';
import FeedPasswordVerification from '@/components/Feed/FeedPasswordVerification/FeedPasswordVerification';
import FeedSubmit from '@/components/Feed/FeedSubmit/FeedSubmit';

const useModalContent = (modalType: string | null) => {
  switch (modalType) {
    case 'feeds':
      return <FeedList />;
    case 'submit':
      return <FeedSubmit />;
    case 'password':
      return <FeedPasswordVerification />;
    default:
      return null;
  }
};

export default useModalContent;
