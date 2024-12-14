import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  width: '100%',
  padding: '27px 12px',
  borderRadius: '20px',

  background: vars.colors.white,
});

export const SelectPinBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',

  padding: '15px 31px',
  borderRadius: '10px',
  border: `1px solid ${vars.colors.grey[400]}`,

  background: vars.colors.white,

  ':active': {
    background: vars.colors.grey[50],
  },
});

export const MapIconWrapper = style({
  minWidth: '37px',
  height: '44px',
});

export const MapIcon = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const SelectPinText = style({
  fontSize: vars.fonts.label,
  color: vars.colors.grey[700],
});

export const ImageUploadBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const LabelText = style({
  font: vars.fonts.label,
  color: vars.colors.grey[700],
});

export const UploadedImage = style({
  width: '100%',
  aspectRatio: 1,
  padding: '30px',
  borderRadius: '10px',

  background: vars.colors.grey[50],
});
