import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',

  borderRadius: '4px',

  backgroundColor: vars.colors.white,
});

export const menuText = style({
  padding: '12px 16px',
  font: vars.fonts.small,
  color: vars.colors.grey[500],
  cursor: 'pointer',
});
