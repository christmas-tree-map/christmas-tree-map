import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Base = style({
  display: 'flex',
  alignItems: 'center',
  gap: '19px',

  width: '100%',
  height: '108px',
  padding: '10px 20px',
  borderRadius: '15px',
});

export const Layout = styleVariants({
  white: [Base, { backgroundColor: vars.colors.white }],
  grey: [Base, { backgroundColor: vars.colors.grey[50] }],
});

export const Container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '6px',
});

export const Image = style({
  width: '88px',
  minHeight: '88px',
  border: 'none',
  borderRadius: '15px',

  background: vars.colors.grey[400],

  objectFit: 'cover',
});

export const Title = style({
  font: vars.fonts.body,
  fontWeight: 'bold',
});

export const InfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',

  font: vars.fonts.small,
});

export const PhoneText = style({
  color: vars.colors.grey[400],
});
