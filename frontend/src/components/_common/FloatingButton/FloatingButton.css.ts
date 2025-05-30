import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'fixed',
  bottom: '112px',
  right: 'calc((100% - 320px) / 2 + 16px)',
  zIndex: 100,

  width: '45px',
  height: '45px',
  borderRadius: '50%',

  backgroundColor: vars.colors.primary[800],
  filter: 'drop-shadow(0px 3px 3px #00000040)',

  '@media': {
    '(min-width: 481px)': { right: 'calc((100% - 480px) / 2 + 16px)' },
    '(min-width: 320px) and (max-width: 480px)': { right: '16px' },
  },
});

export const EditIcon = style({
  width: '18px',
  height: '18px',
});
