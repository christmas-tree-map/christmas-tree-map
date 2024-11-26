import { style } from '@vanilla-extract/css';

export const Layout = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1,

  width: '100%',
  height: '48px',
  padding: '13px 16px',

  backgroundColor: '#ffffff',
});

export const Spacer = style({
  width: '100%',
  height: '48px',
});
