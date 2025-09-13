import { style, styleVariants } from '@vanilla-extract/css';
import { MODAL_LAYER } from '@/constants/layerLevel';
import { vars } from '@/styles/theme.css';

export const DelayedButtonBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2px',

  width: '128px',
  height: '40px',
  padding: '10px',
  borderRadius: '15px',

  backgroundColor: vars.colors.white,
  filter: 'drop-shadow(0px 4px 4px #00000040)',
  font: vars.fonts.label,
});

export const DelayedButtonStyle = styleVariants({
  top: [DelayedButtonBase, { position: 'fixed', left: '50%', top: '100px', transform: 'translateX(-50%)' }],
  bottom: [
    DelayedButtonBase,
    {
      position: 'fixed',
      left: '50%',
      bottom: '100px',
      transform: 'translateX(-50%)',
    },
  ],
});

export const layerLevel = styleVariants({
  base: { zIndex: 1 },
  modal: { zIndex: MODAL_LAYER.content },
});
