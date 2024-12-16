import { createContext, useContext, useState, useCallback } from 'react';

interface LayoutVisibilityContextValue {
  hideNavBar: () => void;
  showNavBar: () => void;
  isNavBarHidden: boolean;
}

const LayoutVisibilityContext = createContext<LayoutVisibilityContextValue | null>(null);

export const LayoutVisibilityProvider = ({ children }: React.PropsWithChildren) => {
  const [isNavBarHidden, setIsNavBarHidden] = useState(false);

  const hideNavBar = useCallback(() => setIsNavBarHidden(true), []);
  const showNavBar = useCallback(() => setIsNavBarHidden(false), []);

  return (
    <LayoutVisibilityContext.Provider value={{ hideNavBar, showNavBar, isNavBarHidden }}>
      {children}
    </LayoutVisibilityContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLayoutVisibilityContext = () => {
  const context = useContext(LayoutVisibilityContext);
  if (!context) {
    throw new Error('useLayoutVisibilityContext must be used within a LayoutVisibilityProvider');
  }
  return context;
};
