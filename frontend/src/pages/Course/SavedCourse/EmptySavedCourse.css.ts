import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const EmptySavedCourse = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const EmptySavedCourseText = style({
  font: vars.fonts.body,
  color: vars.colors.black,
});

export const ButtonContainer = style({
  width: '100%',
  margin: '16px 0 0 0',
});
