import { Outlet } from 'react-router-dom';
import Header from '@/components/_common/Header/Header';
import NavBar from '@/components/_common/NavBar/NavBar';
import GlobalErrorBoundary from '../Error/ErrorBoundary/GlobalErrorBoundary';

interface LayoutProps {
  title?: string;
  backgroundColor?: 'transparent' | 'white';
  isSticky?: boolean;
}

const Layout = ({ title = '', backgroundColor = 'transparent', isSticky = false }: LayoutProps) => {
  return (
    <GlobalErrorBoundary>
      <Header title={title} backgroundColor={backgroundColor} />
      <Outlet />
      <NavBar isSticky={isSticky} />
    </GlobalErrorBoundary>
  );
};

export default Layout;
