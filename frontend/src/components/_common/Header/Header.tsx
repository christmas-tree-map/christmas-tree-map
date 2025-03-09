import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
// import { IoMdMenu } from '@react-icons/all-files/io/IoMdMenu';
import * as S from './Header.css';

interface HeaderProp {
  title?: string;
  backgroundColor: 'transparent' | 'white';
}

const Header = ({ title = '', backgroundColor }: HeaderProp) => {
  const navigate = useNavigate();

  return (
    <header className={S.Layout[backgroundColor]}>
      <button className={S.Button} onClick={() => navigate(-1)}>
        <IoIosArrowBack />
      </button>
      <p className={S.TitleText}>{title}</p>
      {/* 아직 사용하지 않는 더보기 버튼 주석처리 */}
      {/* <button className={S.Button}>
        <IoMdMenu />
      </button> */}
    </header>
  );
};

export default Header;
