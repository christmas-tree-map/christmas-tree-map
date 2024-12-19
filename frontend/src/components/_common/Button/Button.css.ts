import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Base = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '44px',
  borderRadius: '15px',

  font: vars.fonts.button,

  transition: 'all 0.2s ease',
});

export const Layout = styleVariants({
  primary: [
    Base,
    {
      background: vars.colors.primary[800],
      color: vars.colors.white,

      ':hover': { background: vars.colors.primary[900] },
      ':active': { background: vars.colors.primary[900] },
    },
  ],
  secondary: [
    Base,
    {
      background: vars.colors.secondary[700],
      color: vars.colors.white,

      ':hover': { background: vars.colors.secondary[800] },
      ':active': { background: vars.colors.secondary[800] },
    },
  ],
  default: [
    Base,
    {
      background: vars.colors.white,
      color: vars.colors.primary[800],

      ':hover': { color: vars.colors.primary[900] },
      ':active': { color: vars.colors.primary[900] },
    },
  ],
  disabled: [Base, { color: vars.colors.white, background: vars.colors.grey[500] }],
});
