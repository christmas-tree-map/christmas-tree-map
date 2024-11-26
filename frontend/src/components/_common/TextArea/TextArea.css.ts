import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const LabelText = style({
  font: vars.fonts.label,
  color: vars.colors.grey[700],
});

export const Textarea = style({
  width: '100%',
  minHeight: '100px',
  padding: '11px 10px',
  borderRadius: '10px',

  backgroundColor: vars.colors.grey[50],
  color: vars.colors.grey[900],
  font: vars.fonts.body,
  wordBreak: 'break-all',
});
