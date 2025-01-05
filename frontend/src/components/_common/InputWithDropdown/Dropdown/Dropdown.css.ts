import { styleVariants } from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

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
  padding: '10px',
  color: vars.colors.primary[800],
  fontSize: vars.fonts.tiny,
});

export const DropdownOptionBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',

  width: '100%',
});

export const DropdownOptionBase = style({
  padding: '10px',
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
