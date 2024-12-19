import { Outlet } from 'react-router-dom';
import Header from '@/components/_common/Header/Header';
import NavBar from '@/components/_common/NavBar/NavBar';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <NavBar />
    </>
  );
};

export default Layout;
