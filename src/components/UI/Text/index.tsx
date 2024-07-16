import { UITextProps } from './types';

import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const _text_sizes = {
  '2xs': {
    fontSize: 10,
    lineHeight: 14,
  },
  xs: {
    fontSize: 12,
    lineHeight: 16,
  },
  s: {
    fontSize: 14,
    lineHeight: 18,
  },
  m: {
    fontSize: 16,
    lineHeight: 22,
  },
  l: {
    fontSize: 18,
    lineHeight: 24,
  },
  xl: {
    fontSize: 20,
    lineHeight: 24,
  },
  '2xl': {
    fontSize: 24,
    lineHeight: 30,
  },
  '3xl': {
    fontSize: 30,
    lineHeight: 36,
  },
  '4xl': {
    fontSize: 36,
    lineHeight: 42,
  },
  '5xl': {
    fontSize: 48,
    lineHeight: 54,
  },
};

const _text_weights = {
  regular: '400',
  semibold: '600',
  bold: '800',
};

const _text_aligns = {
  left: 'left',
  center: 'center',
  right: 'right',
};

export const UIText = ({
  weight = 'regular',
  size = 'm',
  align = 'left',
  primary = false,
  secondary = false,
  tertiary = false,
  black = false,
  bold = false,
  semibold = false,
  spacing,
  color,
  style,
  children,
}: UITextProps) => {
  const { colors } = useTheme();

  const _weight = bold
    ? 'bold'
    : semibold
    ? 'semibold'
    : _text_weights[weight] || weight || 'regular';

  const _color =
    (black && colors.black) ||
    (primary && colors.primary) ||
    (secondary && colors.text.secondary) ||
    (tertiary && colors.text.tertiary) ||
    colors.text.primary;

  const _style = {
    color: color || _color,
    fontSize: _text_sizes[size].fontSize,
    lineHeight: _text_sizes[size].lineHeight,
    fontWeight: _weight,
    textAlign: _text_aligns[align],
    letterSpacing: spacing,
    fontFamily: 'WorkSans-Regular',
  };

  return <Text style={[_style, style]}>{children}</Text>;
};
