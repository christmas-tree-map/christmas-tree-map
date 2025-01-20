import * as S from './SnowAnimation.css';

const SnowAnimation = () => {
  return (
    <div className={S.Layout}>
      {S.SnowFlakes.map((className, index) => (
        <div key={index} className={className} />
      ))}
    </div>
  );
};

export default SnowAnimation;
