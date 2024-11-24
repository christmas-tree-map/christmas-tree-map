import { style } from '@vanilla-extract/css';

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

export const Body = style({
  fontSize: '16px',
  wordBreak: 'break-all',
});

export const CreatedAt = style({
  fontSize: '12px',
  color: 'gray', // 임시 색상
});

export const Image = style({
  width: '100%',
  aspectRatio: '1',
  objectFit: 'cover',
});

export const LikeCount = style([
  Body,
  {
    textAlign: 'right',
  },
]);
