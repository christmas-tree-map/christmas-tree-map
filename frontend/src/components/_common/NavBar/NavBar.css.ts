import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Base = style({
  position: 'fixed',
  bottom: 0,
  zIndex: 100,

  width: '100%',
  minWidth: '320px',
  maxWidth: '480px',
});

export const Layout = styleVariants({
  sticky: [Base],
  default: [Base, { left: '50%', transform: 'translateX(-50%)', padding: '0 16px' }],
});

export const BarBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',

  width: '100%',
  height: '58px',
  padding: '0px 40px',

  backgroundColor: '#ffffff',
  color: vars.colors.grey[800],
});

export const Bar = styleVariants({
  sticky: [BarBase, { borderRadius: '15px 15px 0 0', boxShadow: '0 -6px 6px rgba(0, 0, 0, 0.08)' }],
  default: [BarBase, { borderRadius: '58px', filter: 'drop-shadow(0px 3px 3px #00000040)' }],
});

export const LinkBase = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3px',

  font: vars.fonts.tiny,
});

export const Link = styleVariants({
  active: [LinkBase, { color: vars.colors.primary[800] }],
  default: [
    LinkBase,
    {
      transition: '0.2s all ease',

      ':hover': {
        color: vars.colors.primary[800],
      },

      ':active': {
        color: vars.colors.primary[800],
      },
    },
  ],
});

export const Icon = style({
  width: '22px',
  height: '22px',
});

export const SpacingBase = style({
  height: '34px',
});

export const Spacing = styleVariants({
  sticky: [SpacingBase, { backgroundColor: vars.colors.white }],
  default: [SpacingBase],
});

export const Blank = style({
  height: '92px',
});
