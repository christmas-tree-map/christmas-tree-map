import { Outlet } from 'react-router-dom';
import Header from '@/components/_common/Header/Header';
import NavBar from '@/components/_common/NavBar/NavBar';

interface LayoutProps {
  title?: string;
  isSticky?: boolean;
}

const Layout = ({ title = '', isSticky = false }: LayoutProps) => {
  return (
    <>
      <Header title={title} />
      <Outlet />
      <NavBar isSticky={isSticky} />
    </>
  );
};

export default Layout;
