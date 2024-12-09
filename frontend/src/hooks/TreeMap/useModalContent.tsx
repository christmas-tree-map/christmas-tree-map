import FeedList from '@/components/Feed/FeedList/FeedList';
import FeedSubmit from '@/components/Feed/FeedSubmit/FeedSubmit';

const useModalContent = (modalType: string | null) => {
  switch (modalType) {
    case 'feeds':
      return <FeedList />;
    case 'submit':
      return <FeedSubmit />;
    default:
      return null;
  }
};

export default useModalContent;
