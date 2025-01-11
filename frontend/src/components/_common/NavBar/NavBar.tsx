import { Link } from 'react-router-dom';
import { useLayoutVisibilityContext } from '@/contexts/LayoutVisibilityContext';
import { FaTree } from '@react-icons/all-files/fa/FaTree';
import { IoIosNavigate } from '@react-icons/all-files/io/IoIosNavigate';
import { IoMdHome } from '@react-icons/all-files/io/IoMdHome';
import * as S from './NavBar.css';

const NavBar = () => {
  const { isNavBarHidden } = useLayoutVisibilityContext();

  if (isNavBarHidden) return null;

  return (
    <div className={S.Layout}>
      <nav className={S.Bar}>
        <Link to="/map" className={S.Link}>
          <FaTree className={S.Icon} />
          <p>지도</p>
        </Link>
        <Link to="/" className={S.Link}>
          <IoMdHome className={S.Icon} />
          <p>홈</p>
        </Link>
        <Link to="/course" className={S.Link}>
          <IoIosNavigate className={S.Icon} />
          <p>지도</p>
        </Link>
      </nav>
      <div className={S.Spacing} />
    </div>
  );
};

export default NavBar;
