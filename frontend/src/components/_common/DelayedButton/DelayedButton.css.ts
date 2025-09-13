import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const DelayedButtonStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2px',

  position: 'fixed',
  left: '50%',
  bottom: '100px',
  transform: 'translateX(-50%)',

  width: '128px',
  height: '40px',
  padding: '10px',
  borderRadius: '15px',

  backgroundColor: vars.colors.white,
  filter: 'drop-shadow(0px 4px 4px #00000040)',
  font: vars.fonts.label,
});
