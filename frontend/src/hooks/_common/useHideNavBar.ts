import { useEffect } from 'react';
import { useLayoutVisibilityContext } from '@/contexts/LayoutVisibilityContext';

const useHideNavBar = () => {
  const { hideNavBar, showNavBar } = useLayoutVisibilityContext();

  useEffect(() => {
    hideNavBar();

    return () => {
      showNavBar();
    };
  }, [hideNavBar, showNavBar]);
};

export default useHideNavBar;
