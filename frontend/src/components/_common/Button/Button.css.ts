import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Base = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '45px',
  borderRadius: '15px',

  font: vars.fonts.button,
});

export const Layout = styleVariants({
  primary: [Base, { color: vars.colors.white, background: vars.colors.primary[800] }],
  secondary: [Base, { color: vars.colors.white, background: vars.colors.secondary[700] }],
  default: [Base, { color: vars.colors.primary[800], background: vars.colors.white }],
});
