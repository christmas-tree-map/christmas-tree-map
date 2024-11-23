import { style } from '@vanilla-extract/css';

export const floatingButtonStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'fixed',
  bottom: '20px',
  right: '20px',

  width: '45px',
  height: '45px',
  padding: '4px 5px',
  borderRadius: '50%',

  backgroundColor: 'red',
});
