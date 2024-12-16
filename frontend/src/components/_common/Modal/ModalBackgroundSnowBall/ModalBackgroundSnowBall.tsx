import * as S from './ModalBackgroundSnowBall.css';

const ModalBackgroundSnowBall = () => {
  return (
    <div className={S.Layout}>
      <div className={S.Container}>
        <div className={S.Ground} />
        <div className={S.Snowglobe}>
          <div className={S.SgBg} />
          <div className={S.GrndSnow}>
            <div className={S.SnowSurface} />
          </div>
          <div className={S.Tree}>
            <div className={S.TreeShadow} />
            <div className={S.BranchBot}>
              <div className={S.BranchBotSnow} />
              <div className={S.BranchShadow} />
            </div>
            <div className={S.BranchMid}>
              <div className={S.BranchMidSnow} />
              <div className={S.BranchShadow} />
            </div>
            <div className={S.BranchTop}>
              <div className={S.BranchTopSnow} />
            </div>
            <div className={S.Star} />
            <div className={S.Baubles} />
          </div>
          <div className={S.SmShadow} />
          <div>
            <div className={S.SnowmanBot} />
            <div className={S.SnowmanTop} />
            <div className={S.Coal} />
            <div className={S.Carrot} />
          </div>
          <div className={S.FallingSnowWrap}>
            <div className={S.FallingSnow}>
              <div className={S.Flakes1}>
                <p>*</p>
              </div>
              <div className={S.Flakes2}>
                <p>*</p>
              </div>
            </div>
          </div>
          <div className={S.SgFg} />
        </div>
      </div>
    </div>
  );
};

export default ModalBackgroundSnowBall;
