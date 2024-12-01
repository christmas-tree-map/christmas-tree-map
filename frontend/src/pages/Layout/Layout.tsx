import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import NavBar from '@/components/NavBar/NavBar';

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
