import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  position: 'relative',

  width: '100%',
  height: '100vh',
  overflowX: 'hidden',
});

export const Container = style({
  padding: '106px 16px 100px',
});

export const Circle = style({
  position: 'absolute',
  top: '48px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  zIndex: -1,

  width: '600px',
  height: '220px',
  borderRadius: '0 0 50% 50%',
  background: vars.colors.secondary[400],
});

export const Title = style({
  font: vars.fonts.body,
  fontWeight: 'bold',
});

export const SubTitle = style({
  color: vars.colors.grey[400],
  font: vars.fonts.tiny,
});

export const FormSection = style({
  position: 'relative',
  marginBottom: '114px',
});

export const PlaceSection = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  gap: '25px',
});

export const PlaceHeader = style({
  textAlign: 'center',
});

export const CourseBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  position: 'absolute',
  right: 0,
  top: 0,
  padding: '4px 10px',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  font: vars.fonts.small,
  color: vars.colors.black,

  ':active': {
    backgroundColor: vars.colors.grey[50],
    opacity: 0.5,
  },
});
