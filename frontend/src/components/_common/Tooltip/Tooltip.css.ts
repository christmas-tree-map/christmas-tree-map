import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  position: 'absolute',
  bottom: '150%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 100,

  backgroundColor: vars.colors.white,
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  borderRadius: '10px',
  font: vars.fonts.body,

  whiteSpace: 'nowrap',
});

export const Arrow = style({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',

  width: 0,
  height: 0,

  borderLeft: '10px solid transparent',
  borderRight: '10px solid transparent',
  borderTop: `10px solid ${vars.colors.white}`,
});
