import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { MODAL_LAYER } from '@/constants/layerLevel';
import { vars } from '@/styles/theme.css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const DelayedButtonBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2px',

  height: '40px',
  padding: '10px 14px',
  borderRadius: '15px',

  backgroundColor: vars.colors.white,
  filter: 'drop-shadow(0px 4px 4px #00000040)',
  font: vars.fonts.label,

  animation: `${fadeIn} 0.2s ease-in`,
  cursor: 'pointer',
});

export const DelayedButtonStyle = styleVariants({
  top: [DelayedButtonBase, { position: 'fixed', left: '50%', top: '60px', transform: 'translateX(-50%)' }],
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

// Loading
const pulse = keyframes({
  '0%, 80%, 100%': { opacity: 0.3, backgroundColor: vars.colors.grey[400] },
  '40%': { opacity: 1, backgroundColor: vars.colors.primary[500] },
});

export const loadingWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6px',
});

export const dot = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: vars.colors.grey[600],
  animation: `${pulse} 1.4s infinite ease-in-out`,
  selectors: {
    '&:nth-child(1)': { animationDelay: '0s' },
    '&:nth-child(2)': { animationDelay: '0.2s' },
    '&:nth-child(3)': { animationDelay: '0.4s' },
  },
});
