import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  position: 'relative',
});

export const Container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',

  font: vars.fonts.body,
});

export const TypeText = style({
  fontWeight: 'bold',
});

export const Link = style({
  font: vars.fonts.tiny,
  color: vars.colors.grey[400],
});
