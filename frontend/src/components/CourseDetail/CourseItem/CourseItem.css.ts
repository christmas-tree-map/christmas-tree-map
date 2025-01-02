import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '6px',

  width: '100%',
  height: '108px',
  padding: '10px 20px',
  borderRadius: '15px',

  backgroundColor: vars.colors.grey[50],
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
