import { Outlet } from 'react-router-dom';
import Header from '@/components/_common/Header/Header';
import NavBar from '@/components/_common/NavBar/NavBar';

interface LayoutProps {
  title?: string;
}

const Layout = ({ title = '' }: LayoutProps) => {
  return (
    <>
      <Header title={title} />
      <Outlet />
      <NavBar />
    </>
  );
};

export default Layout;
