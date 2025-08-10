import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const LoadingBase = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Loading = styleVariants({
  fullScreen: [LoadingBase, { position: 'fixed', top: 0, left: 0 }],
  default: [LoadingBase, { position: 'relative' }],
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const SpinnerBase = style({
  width: '56px',
  height: '56px',
  border: '4px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '50%',
  animation: `${spin} 0.9s linear infinite`,
});

export const Spinner = styleVariants({
  primary: [
    SpinnerBase,
    {
      borderTop: `4px solid ${vars.colors.primary[800]}`,
    },
  ],
  secondary: [
    SpinnerBase,
    {
      borderTop: `4px solid ${vars.colors.secondary[800]}`,
    },
  ],
});
