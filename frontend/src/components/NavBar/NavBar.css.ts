import { style } from '@vanilla-extract/css';

export const Layout = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  position: 'fixed',
  bottom: 0,
  left: 0,

  width: '100%',
  height: '92px',
  padding: '13px 16px',

  backgroundColor: '#ffffff',
});
