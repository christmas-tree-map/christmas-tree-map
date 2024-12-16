import { style } from '@vanilla-extract/css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',

  height: '1px',

  boxShadow: '6px 0 30px 0 rgba(0, 0, 0, 0.12), 12px 0px 38px 0 rgba(0, 0, 0, 0.08)',
});
