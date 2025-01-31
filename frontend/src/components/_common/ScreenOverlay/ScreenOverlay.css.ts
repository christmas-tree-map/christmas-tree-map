import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  position: 'fixed',
  top: 0,
  zIndex: 100,

  width: '100%',
  minWidth: '320px',
  maxWidth: '480px',
  height: '100%',
});

export const Header = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'relative',

  width: '100%',
  height: '48px',

  backgroundColor: vars.colors.white,
  font: vars.fonts.body,
});

export const CloseButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
  right: '16px',
});

export const Container = style({
  width: '100%',
  height: 'calc(100% - 48px)',

  backgroundColor: vars.colors.white,
});
