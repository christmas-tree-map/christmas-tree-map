import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '4px',

  padding: '0 10px',
});

export const CountText = style({
  fontStyle: vars.fonts.body,
  lineHeight: 1.6,
});
