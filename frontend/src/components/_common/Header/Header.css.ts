import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,

  width: '100%',
  height: '48px',
  padding: '0 16px',
});

export const Button = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '35px',
  height: '35px',
  borderRadius: '35px',

  backgroundColor: vars.colors.white,
  color: vars.colors.primary[800],
});
