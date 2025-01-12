import { Outlet } from 'react-router-dom';
import Header from '@/components/_common/Header/Header';
import NavBar from '@/components/_common/NavBar/NavBar';

interface LayoutProps {
  isSticky?: boolean;
}

const Layout = ({ isSticky = false }: LayoutProps) => {
  return (
    <>
      <Header />
      <Outlet />
      <NavBar isSticky={isSticky} />
    </>
  );
};

export default Layout;
