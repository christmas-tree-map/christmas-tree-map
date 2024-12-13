import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'fixed',
  bottom: '112px',
  right: '20px',
  zIndex: 300,

  width: '45px',
  height: '45px',
  borderRadius: '50%',

  backgroundColor: vars.colors.primary[800],
  filter: 'drop-shadow(0px 3px 3px #00000040)',
});

export const EditIcon = style({
  width: '18px',
  height: '18px',
});
