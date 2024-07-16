import React from 'react';

import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { UIArrowTopProps } from './types';

export const UIArrowToTop = ({ onPress, isVisible }: UIArrowTopProps) => {
  const { colors } = useTheme();
  if (!isVisible) {
    return false;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 32,
        right: 30,
        backgroundColor: colors.primary,
        height: 56,
        width: 56,
        borderRadius: 56,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Feather name="arrow-up" size={32} color={colors.text} />
    </TouchableOpacity>
  );
};
