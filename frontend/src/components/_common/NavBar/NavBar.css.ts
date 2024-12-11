import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '9px',

  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 100,

  width: '100%',
  padding: '0 20px',
});

export const Bar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '49px',
  borderRadius: '49px',

  backgroundColor: '#ffffff',
  color: vars.colors.primary[800],
});

export const Link = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3px',

  font: vars.fonts.tiny,
});

export const Image = style({
  width: '24px',
  height: '24px',
});

export const Spacing = style({
  height: '34px',
});
