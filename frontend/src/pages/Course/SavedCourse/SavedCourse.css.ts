import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '48px 16px 112px',
});

export const CoursesContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '10px',
});

export const CourseContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const CourseDetailContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '15px',
  background: vars.colors.grey[100],

  ':active': {
    background: vars.colors.grey[200],
  },
});

export const CourseDetailTitle = style({
  font: vars.fonts.label,
  fontWeight: 'bold',
  color: vars.colors.black,
});

export const CourseDetailSubTitle = style({
  font: vars.fonts.label,
  color: vars.colors.black,
});

export const CourseDetailText = style({
  margin: '3px 0 0',
  font: vars.fonts.tiny,
  color: vars.colors.grey[400],
});
