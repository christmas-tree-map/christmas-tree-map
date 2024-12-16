// https://codepen.io/Yash-Flipkart/pen/vYbwGxe
import { StyleRule, globalStyle, keyframes, style } from '@vanilla-extract/css';

const sfanim = keyframes({
  '0%': {
    transform: 'translateY(calc(-100%))',
  },
  '100%': {
    transform: 'translateY(0)',
  },
});

// 상수 정의
const SNOW_COLOR = '#dbe8fc';
const SG_SIZE = '150px';
const TREE_SIZE = '18px';
const STAR_SIZE = '5px';

// 믹스인 정의
const sgBase: StyleRule = {
  width: SG_SIZE,
  height: SG_SIZE,
  borderRadius: '50%',
  position: 'absolute',
  top: '0px',
};

const smallerBase: StyleRule = {
  width: `calc(${SG_SIZE} * 0.95)`,
  height: `calc(${SG_SIZE} * 0.95)`,
  borderRadius: '50%',
  position: 'absolute',
  top: `calc(${SG_SIZE} * 0.025)`,
  left: `calc(${SG_SIZE} * 0.025)`,
};

const snowPattern: StyleRule = {
  background: `
    linear-gradient(135deg, ${SNOW_COLOR} 25%, transparent 25%) calc(${TREE_SIZE} * -0.16) 0,
    linear-gradient(225deg, ${SNOW_COLOR} 25%, transparent 25%) calc(${TREE_SIZE} * -0.16) 0,
    linear-gradient(315deg, ${SNOW_COLOR} 25%, transparent 25%),
    linear-gradient(45deg, ${SNOW_COLOR} 25%, transparent 25%)`,
  backgroundSize: `calc(${TREE_SIZE} * 0.32) calc(${TREE_SIZE} * 0.32)`,
  width: '100%',
  height: '100%',
  position: 'absolute',
};

// 스타일 정의
export const Layout = style({
  position: 'absolute',
  top: 0,
  left: 0,

  zIndex: -1,

  width: '100%',
  height: '100%',
});

export const Container = style({
  position: 'absolute',
  right: '40px',
  bottom: '200px',
  width: '150px',
});

export const Ground = style({
  width: '150px',
  height: '50px',
  position: 'relative',
  top: '180px',
  right: '-4px',
  background: 'radial-gradient(ellipse at center, rgba(1, 1, 1, 1) 0%, rgba(1, 1, 1, 0.5) 20%, rgba(1, 1, 1, 0) 45%)',
});

export const Snowglobe = style({
  width: SG_SIZE,
  height: SG_SIZE,
  margin: 'auto',
  position: 'relative',
});

export const BranchTop = style({
  WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  width: `calc(${TREE_SIZE} * 0.8)`,
  height: `calc(${TREE_SIZE} * 1.5)`,
  backgroundColor: '#62838C',
  position: 'absolute',
  top: `calc(${TREE_SIZE} * 0.1)`,
  left: `calc(${TREE_SIZE} * 0.6)`,
});

export const BranchTopSnow = style(snowPattern);

export const BranchMid = style({
  WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  width: `calc(${TREE_SIZE} * 1.5)`,
  height: `calc(${TREE_SIZE} * 2.3)`,
  backgroundColor: '#2D4959',
  position: 'absolute',
  top: `calc(${TREE_SIZE} * 0.7)`,
  left: `calc(${TREE_SIZE} * 0.25)`,
});

export const BranchMidSnow = style(snowPattern);
export const Star = style({
  width: '0px',
  height: '0px',
  borderRight: `${STAR_SIZE} solid transparent`,
  borderBottom: `calc(${STAR_SIZE} * 0.7) solid gold`,
  borderLeft: `${STAR_SIZE} solid transparent`,
  transform: 'rotate(35deg)',
  position: 'absolute',
  top: '0px',
  left: `calc(${TREE_SIZE} * 0.75)`,
});

// ::before Style
globalStyle(`${Star}::before`, {
  content: "''",
  position: 'absolute',
  height: '0px',
  width: '0px',
  borderBottom: `calc(${STAR_SIZE} * 0.8) solid gold`,
  borderLeft: `calc(${STAR_SIZE} * 0.3) solid transparent`,
  borderRight: `calc(${STAR_SIZE} * 0.3) solid transparent`,
  top: `calc(${STAR_SIZE} * -0.45)`,
  left: `calc(${STAR_SIZE} * -0.65)`,
  transform: 'rotate(-35deg)',
});

// ::after Style
globalStyle(`${Star}::after`, {
  content: "''",
  position: 'absolute',
  height: '0px',
  width: '0px',
  borderRight: `${STAR_SIZE} solid transparent`,
  borderBottom: `calc(${STAR_SIZE} * 0.7) solid gold`,
  borderLeft: `${STAR_SIZE} solid transparent`,
  top: `calc(${STAR_SIZE} * 0.03)`,
  left: `calc(${STAR_SIZE} * -1.05)`,
  transform: 'rotate(-70deg)',
});

export const Tree = style({
  width: `calc(${TREE_SIZE} * 2)`,
  height: `calc(${TREE_SIZE} * 4.1)`,
  position: 'relative',
  left: `calc(${SG_SIZE} * 0.5)`,
  top: `calc(${SG_SIZE} * 0.15)`,
});

export const SgBackground = style({
  ...sgBase,
  background: 'rgba(255, 255, 255, 0.5)',
});

export const SgForeground = style({
  ...sgBase,
  background: `
    linear-gradient(
      135deg,
      rgba(255,255,255,0.8) 0%,
      rgba(246,246,246,0.2) 47%,
      rgba(237,237,237,0) 100%
    )`,
});

export const GrndSnow = style({
  ...smallerBase,
  background: `
    linear-gradient(
      to bottom,
      rgba(255,255,255,0) 68%,
      rgba(240,240,240,1) 68%,
      rgba(235,239,245,1) 79%,
      rgba(197,211,232,1) 100%
    )`,
});

export const SnowSurface = style({
  width: `calc(${SG_SIZE} * 0.89)`,
  height: `calc(${SG_SIZE} * 0.1)`,
  background: '#fff',
  position: 'relative',
  top: `calc(${SG_SIZE} * 0.59)`,
  borderRadius: '50%',
  margin: 'auto',
});

export const BranchBot = style({
  WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  width: `calc(${TREE_SIZE} * 2)`,
  height: `calc(${TREE_SIZE} * 2.5)`,
  backgroundColor: '#142833',
  position: 'absolute',
  top: `calc(${TREE_SIZE} * 1.6)`,
});

export const BranchBotSnow = style(snowPattern);

export const BranchShadow = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  background: 'linear-gradient(to bottom, rgba(18, 67, 79, 1) 0%, rgba(255,255,255,0) 100%)',
  mixBlendMode: 'multiply',
});

export const SgBg = style({
  ...sgBase,
  background: 'rgba(255, 255, 255, 0.5)',
});

export const SgFg = style({
  ...sgBase,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(246,246,246,0.2) 47%, rgba(237,237,237,0) 100%)',
});

export const FallingSnowWrap = style({
  overflow: 'hidden',
  opacity: 0.99,
  height: `calc(${SG_SIZE} * 0.65)`,
  width: SG_SIZE,
  position: 'absolute',
  top: '0px',
});

export const FallingSnow = style({
  ...smallerBase,
  overflow: 'hidden',
  opacity: 0.99,
});

export const Baubles = style({
  width: `calc(${SG_SIZE} * 0.04)`,
  height: `calc(${SG_SIZE} * 0.04)`,
  backgroundColor: 'rgba(191, 17, 49,1)',
  borderRadius: '50%',
  position: 'absolute',
  top: `calc(${SG_SIZE} * 0.1)`,
  left: `calc(${SG_SIZE} * 0.1)`,
  boxShadow: `
    calc(${SG_SIZE} * 0.02) calc(${SG_SIZE} * 0.11) 0px 0px rgba(150, 0, 40,1),
    calc(${SG_SIZE} * -0.02) calc(${SG_SIZE} * 0.2) 0px 0px rgba(206, 0, 55,1)
  `,
});

export const TreeShadow = style({
  width: `calc(${TREE_SIZE} * 4)`,
  height: '20px',
  background:
    'radial-gradient(ellipse at center, rgba(13,84,102,1) 0%, rgba(138,174,188,0) 65%, rgba(206,223,235,0) 100%)',
  position: 'absolute',
  bottom: `calc(${TREE_SIZE} * -0.5)`,
  left: `calc(${TREE_SIZE} * -0.9)`,
});

export const StandCurved = style({
  height: '180px',
  width: '500px',
  borderRadius: '50%',
  border: '100px solid maroon',
  position: 'absolute',
  bottom: '0px',

  backgroundColor: 'maroon',
  boxShadow: `
  0px 5px 15px rgba(0, 0, 0, 0.5), 
  inset 0px 2px 5px rgba(255, 255, 255, 0.3)
`,
});

export const StandCurvedWrap = style({
  width: `calc(${SG_SIZE} * 1.4)`,
  height: `calc(${SG_SIZE} / 3)`,
  position: 'absolute',
  bottom: `calc(${SG_SIZE} * -0.34)`,
  marginLeft: `calc(${SG_SIZE} * -0.2)`,
  clipPath: 'polygon(30% 10%, 70% 10%, 80% 100%, 20% 100%)',
});

export const SmShadow = style({
  width: `calc(${TREE_SIZE} * 2)`,
  height: '20px',
  background:
    'radial-gradient(ellipse at center, rgba(13,84,102,0.4) 0%, rgba(138,174,188,0) 65%, rgba(206,223,235,0) 100%)',
  position: 'absolute',
  bottom: `calc(${TREE_SIZE} * 2.5)`,
  left: `calc(${TREE_SIZE} * 1.8)`,
});

export const SnowmanTop = style({
  background: `linear-gradient(to bottom, rgba(255,255,255,1) 0%, ${SNOW_COLOR} 100%)`,
  width: `calc(${SG_SIZE} * 0.1)`,
  height: `calc(${SG_SIZE} * 0.1)`,
  borderRadius: '50%',
  position: 'absolute',
  bottom: `calc(${SG_SIZE} * 0.46)`, // 눈사람 몸통 위에 배치
  left: `calc(${SG_SIZE} * 0.27)`, // 화면 중앙에 위치
});

export const SnowmanBot = style({
  background: `linear-gradient(to bottom, rgba(255,255,255,1) 0%, ${SNOW_COLOR} 100%)`,
  width: `calc(${SG_SIZE} * 0.15)`,
  height: `calc(${SG_SIZE} * 0.15)`,
  borderRadius: '50%',
  position: 'absolute',
  bottom: `calc(${SG_SIZE} * 0.33)`,
  left: `calc(${SG_SIZE} * 0.25)`,
});

export const Coal = style({
  width: '2px',
  height: '2px',
  borderRadius: '50%',
  position: 'absolute',
  boxShadow: `
      45px -1px 0px 0px black, 
      51px -2px 0px 0px black, 
      45px 3px 0px 0px black,
      47px 4px 0px 0px black,
      49px 4px 0px 0px black,
      51px 2px 0px 0px black,
      50px 10px 0px 0px black,
      51px 14px 0px 0px black,
      50px 19px 0px 0px black
  `,
});

export const Carrot = style({
  width: '0px',
  height: '0px',
  borderLeft: '7px solid #f98e13',
  borderTop: '0px solid transparent',
  borderBottom: '2px solid transparent',
  position: 'absolute',
  left: '49px',
  top: '74px',
});

export const Flakes1 = style({
  width: SG_SIZE,
  height: `calc(${SG_SIZE} * 2)`,
  position: 'absolute',
  top: '0px',
  color: '#fff',
  opacity: 0.5,
  animation: `${sfanim} linear 30s infinite`,
  textShadow: `
    303px 117px, 32px 89px, 323px 119px, 98px 183px, 
    126px 235px, 0px 171px, 380px 61px, 269px 17px,
    0px 151px, 121px 344px, 229px 136px, 237px 280px,
    303px 30px, 211px 314px, 378px 285px, 10px 287px,
    93px 345px, 292px 324px, 223px 292px, 156px 160px,
    253px 58px, 205px 195px, 145px 106px, 79px 312px,
    182px 359px, 279px 99px, 349px 124px, 5px 33px,
    216px 147px, 388px 117px, 70px 295px, 149px 318px,
    96px 66px, 129px 217px, 138px 218px, 241px 310px,
    231px 368px, 18px 327px, 173px 213px, 118px 10px,
    246px 208px, 159px 244px, 268px 376px, 167px 262px,
    85px 238px, 277px 47px, 386px 192px, 259px 364px,
    325px 327px, 279px 201px
  `,
});

export const Flakes2 = style({
  width: SG_SIZE,
  height: `calc(${SG_SIZE} * 2)`,
  position: 'absolute',
  top: '0px',
  color: '#fff',
  animation: `${sfanim} linear 15s infinite`,
  textShadow: `
    375px 485px, 11px 689px, 254px 784px, 5px 686px,
    266px 705px, 388px 698px, 180px 707px, 36px 413px,
    74px 695px, 238px 690px, 384px 635px, 1px 694px,
    45px 538px, 131px 750px, 258px 520px, 157px 705px,
    96px 749px, 325px 719px, 132px 688px, 167px 511px,
    303px 408px, 340px 620px, 394px 428px, 187px 748px,
    217px 624px, 356px 630px, 33px 758px, 238px 762px,
    357px 586px, 253px 798px, 68px 786px, 164px 662px,
    119px 598px, 221px 557px, 126px 537px, 282px 503px,
    11px 455px, 219px 632px, 60px 597px, 41px 529px,
    247px 451px, 217px 644px, 304px 400px, 214px 421px,
    287px 757px, 76px 404px, 376px 735px, 169px 572px,
    245px 790px, 66px 717px
  `,
});
