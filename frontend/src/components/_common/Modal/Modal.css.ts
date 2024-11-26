import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const ModalLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'scroll',

  position: 'fixed',
  top: '100px',
  left: '0',

  width: '100%',
  minHeight: '-webkit-fill-available',

  padding: '50px 36px',
  marginBottom: '92px',

  borderRadius: '30px 30px 0 0',

  boxShadow: '6px 0 30px 0 rgba(0, 0, 0, 0.12), 12px 0px 38px 0 rgba(0, 0, 0, 0.08)',
  backgroundColor: vars.colors.white,
});

export const BarContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
  top: '0',
  left: '0',

  width: '100%',
  height: '33px',
  padding: '10px 0',
});

export const Bar = style({
  width: '50px',
  height: '2px',

  borderRadius: '1px',
  backgroundColor: vars.colors.primary[800],
});
