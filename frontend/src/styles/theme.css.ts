import { createGlobalTheme, createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  colors: {
    // primary, 붉은 색
    primary: {
      50: null,
      100: null,
      200: null,
      300: null,
      400: null,
      500: null,
      600: null,
      700: null,
      800: null,
      900: null,
    },
    // secondary, 초록 색
    secondary: {
      50: null,
      100: null,
      200: null,
      300: null,
      400: null,
      500: null,
      600: null,
      700: null,
      800: null,
      900: null,
    },

    // grey, 회색
    grey: {
      50: null,
      100: null,
      200: null,
      300: null,
      400: null,
      500: null,
      600: null,
      700: null,
      800: null,
      900: null,
    },
    white: null,
  },
  fonts: {
    body: null,
    label: null,
    button: null,
    tiny: null,
  },
});

createGlobalTheme(':root', vars, {
  colors: {
    primary: {
      50: '#FEEBEE',
      100: '#FDCDD3',
      200: '#EC9A9C',
      300: '#E17376',
      400: '#EB5254',
      500: '#F0423C',
      600: '#E1383A',
      700: '#CF2F34',
      800: '#C2282D',
      900: '#B31D22',
    },
    secondary: {
      50: '#E7F4E7',
      100: '#C6E4C4',
      200: '#A1D29F',
      300: '#7CC278',
      400: '#5FB55B',
      500: '#43A83E',
      600: '#3A9A36',
      700: '#2E882B',
      800: '#237721',
      900: '#09590D',
    },
    grey: {
      50: '#F8F8F8',
      100: '#F1F1F1',
      200: '#E6E6E6',
      300: '#D6D6D6',
      400: '#B2B2B2',
      500: '#919191',
      600: '#696969',
      700: '#565656',
      800: '#383838',
      900: '#181818',
    },
    white: '#FFFFFF',
  },
  fonts: {
    body: '16px Pretendard',
    label: '14px Pretendard',
    button: 'bold 12px Pretendard',
    tiny: '12px Pretendard',
  },
});
