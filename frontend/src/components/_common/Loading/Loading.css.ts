import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Loading = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
