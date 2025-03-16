import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const LayoutBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 100,

  width: '100%',
  minWidth: '320px',
  maxWidth: '480px',
  height: '48px',
  padding: '0 16px',
});

export const Layout = styleVariants({
  transparent: [LayoutBase, { backgroundColor: 'transparent' }],
  white: [LayoutBase, { backgroundColor: vars.colors.white }],
});

export const ButtonBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '35px',
  height: '35px',
  borderRadius: '35px',

  backgroundColor: vars.colors.white,
  color: vars.colors.grey[800],

  transition: '0.2s all ease',

  cursor: 'pointer',

  ':hover': {
    color: vars.colors.primary[800],
  },

  ':active': {
    color: vars.colors.primary[800],
  },
});

export const Button = styleVariants({
  transparent: [ButtonBase, { filter: 'drop-shadow(0px 3px 3px #00000040)' }],
  white: [ButtonBase, { filter: 'none' }],
});

export const TitleText = style({
  flex: 1,
  font: vars.fonts.body,
  textAlign: 'center',
});
