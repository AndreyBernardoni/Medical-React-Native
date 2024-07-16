import { UIIconProps } from './types';

import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const UIIcon = ({
  name,
  color,
  size,
  font,
  primary,
  secondary,
  tertiary,
  quaternary,
  onPress,
}: UIIconProps) => {
  const { colors } = useTheme();

  const iconColor =
    (primary && colors.primary) ||
    (secondary && colors.text.secondary) ||
    (tertiary && colors.text.tertiary) ||
    (quaternary && colors.text.quaternary) ||
    color ||
    colors.text.primary;

  const iconName = name || 'alert-circle';
  const iconSize = size || 24;

  const Icon = React.useMemo(() => {
    switch (font) {
      case 'fa6':
        return FontAwesome6;
      default:
        return Feather;
    }
  }, [font]);

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
    );
  }

  return <Icon name={iconName} size={iconSize} color={iconColor} />;
};
