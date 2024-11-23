import { style } from '@vanilla-extract/css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',

  width: '100%',
});

export const ImageUploadBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const Label = style({}); // 추후 스타일 코드 추가
