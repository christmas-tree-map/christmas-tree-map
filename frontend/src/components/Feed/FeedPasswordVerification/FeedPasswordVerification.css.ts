import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  padding: '35px 12px',
  borderRadius: '20px',
  background: vars.colors.white,
});

export const Divider = style({
  height: '24px',
});
