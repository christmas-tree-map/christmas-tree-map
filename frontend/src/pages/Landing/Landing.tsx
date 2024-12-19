import { Link } from 'react-router-dom';
import Button from '@/components/_common/Button/Button';
import SnowAnimation from '@/components/Landing/SnowAnimation/SnowAnimation';
import Garland from '@/assets/garland.svg';
import Snowman from '@/assets/snowman.svg';
import * as S from './Landing.css';

const Landing = () => {
  return (
    <div className={S.Layout}>
      <div className={S.Container}>
        <div className={S.Circle} />
        <img className={S.GarlandImage} src={Garland} />
        <img className={S.SnowmanImage} src={Snowman} />
        <SnowAnimation />
        <div className={S.TitleContainer}>
          <p className={S.Title['default']}>메리 크리스마스?</p>
          <br />
          <p className={S.Title['delayed']}>
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
          <Button color="secondary">시작하기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
