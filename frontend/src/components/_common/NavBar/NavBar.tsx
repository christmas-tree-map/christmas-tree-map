import { Link } from 'react-router-dom';
import { FaTree } from '@react-icons/all-files/fa/FaTree'
import * as S from './NavBar.css';

const NavBar = () => {
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
