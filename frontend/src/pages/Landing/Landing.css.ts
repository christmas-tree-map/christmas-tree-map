import { globalStyle, keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  width: '100vw',
  height: '100vh',
});

export const Container = style({
  position: 'relative',

  width: '100vw',
  height: '60vh',

  overflow: 'hidden',
});

export const Circle = style({
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '120vh',
  height: '120vh',
  borderRadius: '50%',

  background: `radial-gradient(circle, #FF7F7F, ${vars.colors.primary[500]}, ${vars.colors.primary[800]})`,
});

export const TitleContainer = style({
  position: 'absolute',
  top: '40%',
  zIndex: 1,

  padding: '0 30px',

  font: 'bold 28px Pretendard',
  color: vars.colors.white,
  lineHeight: '1.2',
  whiteSpace: 'nowrap',
});

globalStyle(`${TitleContainer} span`, { opacity: 0.6 });

const slide = keyframes({
  '0%': { width: '0' },
  '100%': { width: '100%' },
});

const TitleBase = style({
  display: 'inline-block',
  overflow: 'hidden',

  width: '0',

  animation: `${slide} 1s ease-in-out forwards`,
});

export const Title = styleVariants({
  default: [TitleBase],
  delayed: [TitleBase, { animationDelay: '1.2s' }],
});

const glow = keyframes({
  '0%': { filter: 'brightness(1)' },
  '50%': { filter: 'brightness(2.5)' },
  '100%': { filter: 'brightness(1)' },
});

export const GarlandImage = style({
  position: 'absolute',
  top: '-4%',
  left: '-10%',

  width: '300px',

  animation: `${glow} 4s ease infinite`,
});

export const SnowmanImage = style({
  position: 'absolute',
  bottom: '-5%',
  right: '-5%',

  width: '250px',
  height: '250px',

  zIndex: 1,
});

export const ButtonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',

  padding: '30px',
});

export const Text = style({
  font: vars.fonts.tiny,
  color: vars.colors.grey[600],
  textAlign: 'center',
  lineHeight: '1.6',
});
