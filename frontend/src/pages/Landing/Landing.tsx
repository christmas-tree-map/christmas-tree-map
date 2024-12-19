import { Link } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import SnowAnimation from '@/components/Landing/SnowAnimation/SnowAnimation';
import * as S from './Landing.css';

const Landing = () => {
  return (
    <div className={S.Layout}>
      <div className={S.Container}>
        <div className={S.Circle} />
        <SnowAnimation />
        <div className={S.TitleContainer}>
          <p className={S.TitleWrapper}>메리 크리스마스?</p>
          <br />
          <p className={S.TitleWrapperDelayed}>
            <span>오늘부터</span> 메리, 트리스마스!
          </p>
        </div>
      </div>
      <div className={S.ButtonContainer}>
        <p className={S.Text}>
          메리 트리스마스와 함께
          <br />
          낭만적인 크리스마스를 만들어 보세요!
        </p>
        <Link to="/map">
          <Button color="primary">시작하기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
