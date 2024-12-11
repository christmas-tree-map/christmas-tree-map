import { Link } from 'react-router-dom';
import TreeIcon from '@/assets/tree-icon.png';
import * as S from './NavBar.css';

const NavBar = () => {
  return (
    <div className={S.Layout}>
      <nav className={S.Bar}>
        <Link to="/" className={S.Link}>
          <img src={TreeIcon} className={S.Image} />
          <p>지도</p>
        </Link>
      </nav>
      <div className={S.Spacing} />
    </div>
  );
};

export default NavBar;
