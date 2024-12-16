import { Link } from 'react-router-dom';
import { useLayoutVisibilityContext } from '@/contexts/LayoutVisibilityContext';
import { FaTree } from '@react-icons/all-files/fa/FaTree';
import * as S from './NavBar.css';

const NavBar = () => {
  const { isNavBarHidden } = useLayoutVisibilityContext();

  if (isNavBarHidden) return null;

  return (
    <div className={S.Layout}>
      <nav className={S.Bar}>
        <Link to="/" className={S.Link}>
          <FaTree className={S.Icon} />
          <p>지도</p>
        </Link>
      </nav>
      <div className={S.Spacing} />
    </div>
  );
};

export default NavBar;
