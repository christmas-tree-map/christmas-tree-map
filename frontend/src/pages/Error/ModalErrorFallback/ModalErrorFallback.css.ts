import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',

  width: '100%',
  height: '100%',
  padding: '40px 0',
});

export const TitleText = style({
  color: vars.colors.white,
  fontSize: vars.fonts.body,
  fontFamily: 'inherit',
});
