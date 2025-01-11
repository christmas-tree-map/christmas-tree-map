import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  height: '100vh',
});

export const Container = style({
  padding: '106px 16px 91px',
});

export const Title = style({
  font: vars.fonts.body,
  fontWeight: 'bold',
});

export const SubTitle = style({
  color: vars.colors.grey[400],
  font: vars.fonts.tiny,
});

export const PlaceSection = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  gap: '25px',
});

export const PlaceHeader = style({
  textAlign: 'center',
});

export const PlaceItemBox = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '19px',

  width: '100%',
});

export const PlaceImage = style({
  width: '88px',
  minHeight: '88px',
  aspectRatio: 1,
  objectFit: 'cover',

  background: vars.colors.grey[400],

  borderRadius: '15px',
  border: 'none',
});

export const PlaceContentBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const PlaceName = style({
  font: vars.fonts.body,
  fontWeight: 'bold',
});

export const PlaceAddress = style({
  font: vars.fonts.small,
});

export const PlacePhone = style({
  color: vars.colors.grey[400],
  font: vars.fonts.small,
});

export const PlaceContentDetailBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});
