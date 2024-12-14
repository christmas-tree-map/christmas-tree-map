import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoMdMenu } from '@react-icons/all-files/io/IoMdMenu';
import * as S from './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={S.Layout}>
      <button className={S.Button} onClick={() => navigate(-1)}>
        <IoIosArrowBack />
      </button>
      <button className={S.Button}>
        <IoMdMenu />
      </button>
    </header>
  );
};

export default Header;
