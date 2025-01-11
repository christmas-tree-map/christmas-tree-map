import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

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
