import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const TypeText = style({
  marginBottom: '4px',

  font: vars.fonts.body,
  fontWeight: 'bold',
});

export const TimeContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',

  paddingLeft: '50px',

  font: vars.fonts.tiny,
});

export const LineContainer = style({
  position: 'relative',
  height: '50px',
});

export const Line = style({
  position: 'relative',

  height: '100%',
  borderLeft: `1px dashed ${vars.colors.primary[100]}`,
});

export const Icon = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
