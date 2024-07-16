import { Theme } from '@react-navigation/native';

export const _custom_themes = {
  light: {
    dark: false,
    colors: {
      background: {
        primary: '#fff',
        secondary: '#eee',
        tertiary: '#ccc',
        quaternary: '#fbfbfb',
      },
      text: {
        primary: '#000',
        secondary: '#333',
        tertiary: '#666',
        quaternary: '#999',
        dark: '#fff',
      },
      plans: {
        free: {
          border: '#23C6AF',
          background: '#4DD2C3',
          text: '#fff',
        },
        banner: {
          background: '#FF7A2F',
          border: '#B25521',
          backgroundSecondary: '#CC6226',
          icon: '#FFCC66',
          title: '#fff',
          subtitle: '#fff',
        },
      },
      warning: {
        text: '#fff',
        primary: '#F13737',
        secondary: '#FF662F',
        tertiary: '#FFB82F',
      },
      primary: '#23C6AF',
      success: '#31C215',
      error: '#F13737',
      white: '#fff',
      black: '#000',
      purple: '#64008C',
    },
  },

  dark: {
    dark: true,
    colors: {
      background: {
        primary: '#191919',
        secondary: '#222',
        tertiary: '#333',
      },
      text: {
        primary: '#fff',
        secondary: '#bbb',
        tertiary: '#999',
        quaternary: '#666',
        dark: '#333',
      },
      plans: {
        free: {
          border: '#23C6AF',
          background: '#23C6AF',
          text: '#fff',
        },
        banner: {
          background: '#FF7A2F',
          border: '#B25521',
          backgroundSecondary: '#CC6226',
          icon: '#FFCC66',
          title: '#fff',
          subtitle: '#fff',
        },
      },
      warning: {
        text: '#fff',
        primary: '#F13737',
        secondary: '#FF662F',
        tertiary: '#FFB82F',
      },
      primary: '#23C6AF',
      success: '#31C215',
      error: '#F13737',
      white: '#fff',
      black: '#000',
    },
  },
};

export type CustomThemeProps = (
  | typeof _custom_themes.light
  | typeof _custom_themes.dark
) &
  Theme;
