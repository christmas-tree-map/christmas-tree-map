import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 100,

  width: '100%',
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
  color: vars.colors.primary[800],
  filter: 'drop-shadow(0px 3px 3px #00000040)',
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
