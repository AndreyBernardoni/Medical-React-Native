import React from 'react';
import { useTheme } from '@react-navigation/native';
import { UIIcon } from '../Icon';
import { UICheckProps } from './types';

export const UICheck = ({ isChecked, onChange }: UICheckProps) => {
  const { colors } = useTheme();

  return (
    <UIIcon
      size={20}
      color={isChecked ? colors.primary : colors.text.secondary}
      name={isChecked ? 'check-square' : 'square'}
      onPress={onChange}
    />
  );
};
