import { NavLink } from 'react-router-dom';
import { useLayoutVisibilityContext } from '@/contexts/LayoutVisibilityContext';
import { FaTree } from '@react-icons/all-files/fa/FaTree';
import { IoIosNavigate } from '@react-icons/all-files/io/IoIosNavigate';
import { IoMdHome } from '@react-icons/all-files/io/IoMdHome';
import * as S from './NavBar.css';

interface NavBarProps {
  isSticky: boolean;
}

const NavBar = ({ isSticky }: NavBarProps) => {
  const { isNavBarHidden } = useLayoutVisibilityContext();

  if (isNavBarHidden) return null;

  return (
    <>
      <div className={S.Layout[isSticky ? 'sticky' : 'default']}>
        <nav className={S.Bar[isSticky ? 'sticky' : 'default']}>
          <NavLink to="/map" className={({ isActive }) => S.Link[isActive ? 'active' : 'default']}>
            <FaTree className={S.Icon} />
            <p>지도</p>
          </NavLink>
          <NavLink to="/" className={({ isActive }) => S.Link[isActive ? 'active' : 'default']}>
            <IoMdHome className={S.Icon} />
            <p>홈</p>
          </NavLink>
          <NavLink to="/course" className={({ isActive }) => S.Link[isActive ? 'active' : 'default']}>
            <IoIosNavigate className={S.Icon} />
            <p>코스</p>
          </NavLink>
        </nav>
        <div className={S.Spacing[isSticky ? 'sticky' : 'default']} />
      </div>
      {isSticky && <div className={S.Blank}></div>}
    </>
  );
};

export default NavBar;
