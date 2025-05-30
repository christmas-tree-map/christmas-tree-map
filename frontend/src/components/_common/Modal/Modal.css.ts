import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const slideIn = keyframes({
  from: {
    transform: 'translateY(100%)',
    opacity: 0,
  },
  to: {
    transform: 'translateY(0)',
    opacity: 1,
  },
});

const slideOut = keyframes({
  from: {
    transform: 'translateY(0)',
    opacity: 1,
  },
  to: {
    transform: 'translateY(100%)',
    opacity: 0,
  },
});

export const LayoutBase = style({
  position: 'fixed',
  top: 0,
  zIndex: 100,

  width: '100%',
  minWidth: '320px',
  maxWidth: '480px',
  height: '100%',

  animation: `${slideIn} var(--animation-duration, 200ms) ease-out`,
});

export const Layout = styleVariants({
  isOpening: [LayoutBase],
  isClosing: [LayoutBase, { animation: `${slideOut} var(--animation-duration, 200ms) ease-in` }],
});

export const BarContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
  top: '0',
  left: '0',

  width: '100%',
  height: '33px',
  padding: '10px 0',

  borderRadius: '30px 30px 0 0',

  backgroundColor: vars.colors.white,
});

export const Bar = style({
  width: '50px',
  height: '2px',

  borderRadius: '1px',
  backgroundColor: vars.colors.primary[800],
});

export const Backdrop = style({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: 100,

  width: '100%',
  height: '100vh',
});

const ContainerBase = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  position: 'absolute',
  top: '48px',
  zIndex: 200,

  width: '100%',
  height: 'calc(100vh - 48px)',

  padding: '33px 24px 0',

  borderRadius: '30px 30px 0 0',

  boxShadow: '6px 0 30px 0 rgba(0, 0, 0, 0.12), 12px 0px 38px 0 rgba(0, 0, 0, 0.08)',
});

export const Container = styleVariants({
  red: [ContainerBase, { backgroundColor: vars.colors.primary[900] }],
});

export const ContentWrapper = style({
  overflowY: 'scroll',
  msOverflowStyle: 'none' /* 엣지 */,
  scrollbarWidth: 'none' /* 파이어폭스 */,
  WebkitOverflowScrolling: 'touch',

  zIndex: 300,

  width: '100%',
  height: '100%',
  padding: '17px 0 34px',

  /* 크롬, 사파리, 오페라 */
  '::-webkit-scrollbar': {
    display: 'none',
  },
});
