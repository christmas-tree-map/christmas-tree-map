import { styleVariants } from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const ComboBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',

  borderRadius: '10px',
  background: vars.colors.grey[50],
  font: vars.fonts.body,
});

export const ComboBoxLabel = style({
  padding: '10px 18px 0',
  color: vars.colors.primary[800],
  fontSize: vars.fonts.tiny,
});

export const ComboBoxOptionBox = style({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',

  width: '100%',
  maxHeight: '200px',

  // Chrome, Edge, Safari
  '::-webkit-scrollbar': {
    width: '10px',
  },

  '::-webkit-scrollbar-thumb': {
    background: `${vars.colors.grey[300]}`,
    border: `2px solid ${vars.colors.grey[300]}`,
    borderRadius: '12px 12px 12px 12px',
  },

  '::-webkit-scrollbar-track': {
    background: `${vars.colors.grey[100]}`,
  },

  // Firefox
  scrollbarWidth: 'thin',
  scrollbarColor: `${vars.colors.grey[300]}`,
});

export const ComboBoxOptionBase = style({
  margin: '8px',
  padding: '3px 10px',
  borderRadius: '5px',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: vars.colors.grey[200],
  },
});

export const ComboBoxOption = styleVariants({
  default: [ComboBoxOptionBase],
  selected: [ComboBoxOptionBase, { backgroundColor: vars.colors.grey[200] }],
});

export const NoContentBox = style({
  padding: '18px',
  borderRadius: '10px',
  background: vars.colors.grey[50],
  font: vars.fonts.body,
});
