import { style } from '@vanilla-extract/css';

export const Layout = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 100,

  width: '100%',
  height: '60px',

  backgroundColor: '#ffffff',
});
