import { globalStyle, keyframes, style } from '@vanilla-extract/css';
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

  backgroundColor: vars.colors.primary[700],
});

export const TitleContainer = style({
  position: 'absolute',
  top: '40%',

  padding: '0 30px',

  font: 'bold 26px Pretendard',
  color: vars.colors.white,
  lineHeight: '1.2',
  whiteSpace: 'nowrap',
});

globalStyle(`${TitleContainer} span`, {
  opacity: 0.6,
});

const animationKeyframes = keyframes({
  '0%': { width: '0' },
  '100%': { width: '100%' },
});

export const TitleWrapper = style({
  display: 'inline-block',
  overflow: 'hidden',

  width: '0',

  animation: `${animationKeyframes} 1s ease-in-out forwards`,
});

export const TitleWrapperDelayed = style([TitleWrapper, { animationDelay: '1.2s' }]);

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
