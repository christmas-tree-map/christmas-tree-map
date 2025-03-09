import { Outlet } from 'react-router-dom';
import Header from '@/components/_common/Header/Header';
import NavBar from '@/components/_common/NavBar/NavBar';

interface LayoutProps {
  title?: string;
  backgroundColor?: 'transparent' | 'white';
  isSticky?: boolean;
}

const Layout = ({ title = '', backgroundColor = 'transparent', isSticky = false }: LayoutProps) => {
  return (
    <>
      <Header title={title} backgroundColor={backgroundColor} />
      <Outlet />
      <NavBar isSticky={isSticky} />
    </>
  );
};

export default Layout;
