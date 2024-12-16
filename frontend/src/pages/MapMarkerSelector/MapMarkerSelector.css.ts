import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  width: '100vw',
  height: '100vh',
});

export const ToolTip = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: 1,

  transform: 'translate(-50%, -270%)',

  backgroundColor: vars.colors.grey[800],
  padding: '10px 8px',
  borderRadius: '5px',
});

export const ToolTipText = style({
  color: vars.colors.white,
  whiteSpace: 'nowrap',

  font: vars.fonts.tiny,
});

export const MarkerSelector = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: 1,

  width: '50px',

  transform: 'translate(-50%, -100%)',
});

export const ButtonBox = style({
  position: 'absolute',
  bottom: '34px',
  zIndex: 1,

  width: '100%',
  padding: '0 16px',
});
