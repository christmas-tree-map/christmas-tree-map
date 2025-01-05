import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const Label = style({
  color: vars.colors.grey[700],
  font: vars.fonts.label,
});

export const InputBoxBase = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',

  width: '100%',
  height: '44px',
  padding: '0 10px',
  borderRadius: '10px',

  background: vars.colors.grey[50],
  font: vars.fonts.body,
});

export const InputBox = styleVariants({
  default: [InputBoxBase, { ':focus-within': { border: `1px solid ${vars.colors.grey[700]}` } }],
  error: [InputBoxBase, { border: `1px solid ${vars.colors.primary[800]}` }],
});

export const Input = style({
  width: '100%',
});

export const Button = style({
  width: '25px',
  height: '25px',
});

export const ErrorMessage = style({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
});

export const ErrorMessageText = style({
  color: vars.colors.primary[800],
  font: vars.fonts.label,
});
