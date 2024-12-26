import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 100,

  width: '100%',
  minWidth: '320px',
  maxWidth: '480px',
  padding: '0 16px',
});

export const Bar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '58px',
  borderRadius: '58px',

  backgroundColor: '#ffffff',
  color: vars.colors.grey[800],
  filter: 'drop-shadow(0px 3px 3px #00000040)',
});

export const Link = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3px',

  font: vars.fonts.tiny,

  transition: '0.2s all ease',

  ':hover': {
    color: vars.colors.primary[800],
  },

  ':active': {
    color: vars.colors.primary[800],
  },
});

export const Icon = style({
  width: '22px',
  height: '22px',
});

export const Spacing = style({
  height: '34px',
});
