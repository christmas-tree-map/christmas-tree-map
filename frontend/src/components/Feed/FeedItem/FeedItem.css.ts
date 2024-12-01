import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',

  width: '100%',
});

export const Header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',
});

export const BodyText = style({
  font: vars.fonts.body,
  wordBreak: 'break-all',
});

export const CreatedAtText = style({
  font: vars.fonts.tiny,
  color: vars.colors.grey[500],
});

export const Image = style({
  width: '100%',
  aspectRatio: '1',
  objectFit: 'cover',
});

export const LikeCountText = style([
  BodyText,
  {
    textAlign: 'right',
  },
]);
