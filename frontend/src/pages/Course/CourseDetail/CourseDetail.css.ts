import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const Layout = style({
  padding: '48px 16px 112px',
});

export const Title = style({
  font: vars.fonts.medium,
});

export const MapContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',

  width: '100%',
  height: '180px',
  marginTop: '10px',
  marginBottom: '32px',
  padding: '10px 22px',
  borderRadius: '15px',

  backgroundColor: vars.colors.secondary[50],
});

export const CourseMapContainer = style({
  width: '100%',
  height: '100%',
  borderRadius: '15px',
  overflow: 'hidden',
});

export const TitleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const RefreshButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2px',

  position: 'fixed',
  left: '50%',
  bottom: '100px',
  transform: 'translateX(-50%)',

  width: '128px',
  height: '40px',
  padding: '10px',
  borderRadius: '15px',

  backgroundColor: vars.colors.white,
  filter: 'drop-shadow(0px 4px 4px #00000040)',
  font: vars.fonts.label,
});

export const RefreshText = style({
  paddingTop: '2px',
});

export const DetailButton = style({
  color: vars.colors.grey[500],
});

export const SaveButton = style({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
});
