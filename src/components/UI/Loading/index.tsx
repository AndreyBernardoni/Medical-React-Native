import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { UILoadingProps } from './types';

export const UILoading = ({
  flex = false,
  height,
  color,
  backgroundColor,
  transparent = false,
  disableRadius = false,
  disableMarginHorizontal = false,
  large = false,
  style,
}: UILoadingProps) => {
  const theme = useTheme();

  const _height = height || 148;
  const _color = color || theme.colors.primary;
  const _backgroundColor = transparent
    ? undefined
    : backgroundColor || theme.colors.background;

  return (
    <View
      style={{
        flex: flex ? 1 : undefined,
        height: !flex ? _height : undefined,
        backgroundColor: _backgroundColor,
        borderRadius: disableRadius ? 0 : 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: disableMarginHorizontal ? 0 : 30,
        ...(style as object),
      }}>
      <ActivityIndicator size={large ? 'large' : 'small'} color={_color} />
    </View>
  );
};
