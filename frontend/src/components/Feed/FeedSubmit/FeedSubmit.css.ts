import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',

  width: '100%',
});

export const ImageUploadBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const Label = style({
  font: vars.fonts.label,
});
