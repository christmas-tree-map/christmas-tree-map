import { styleVariants } from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',

  maxHeight: '400px',
});

export const Label = style({
  color: vars.colors.grey[700],
  font: vars.fonts.label,
});

export const InputBox = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',

  width: '100%',
  height: '44px',
  padding: '0 10px 0 18px',
  borderRadius: '10px',

  background: vars.colors.grey[50],
  font: vars.fonts.body,

  ':focus': {
    border: `1px solid ${vars.colors.grey[700]}`,
  },
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

export const DropdownBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',

  overflow: 'hidden',

  borderRadius: '10px',
  background: vars.colors.grey[50],
  font: vars.fonts.body,
});

export const DropdownLabel = style({
  padding: '10px 18px 0',
  color: vars.colors.primary[800],
  fontSize: vars.fonts.tiny,
});

export const DropdownOptionBox = style({
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
});

export const DropdownOptionBase = style({
  margin: '8px',
  padding: '3px 10px',
  borderRadius: '5px',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: vars.colors.grey[200],
  },
});

export const DropdownOption = styleVariants({
  default: [DropdownOptionBase],
  selected: [DropdownOptionBase, { backgroundColor: vars.colors.grey[200] }],
});

export const NoContentBox = style({
  padding: '10px',
  borderRadius: '10px',
  background: vars.colors.grey[50],
  font: vars.fonts.body,
});
