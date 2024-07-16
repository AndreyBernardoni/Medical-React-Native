import React from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';
import { UIIcon } from '../Icon';

import { SPACING } from '../../../constants/spacing';

export const UIRadio = ({ label, value, isActive, onPress, ...props }) => {
  const { colors } = useTheme();

  return (
    <UIBlock
      isRow
      gap={'m'}
      hPadding={'l'}
      height={48}
      radius={SPACING.extra_small}
      borderColor={colors.primary}
      border={isActive && 1}
      vAlign="center"
      onPress={() => onPress(value)}
      {...props}>
      <UIIcon
        font="fa6"
        name={isActive ? 'circle-dot' : 'circle'}
        color={isActive ? colors.primary : colors.text.tertiary}
        size={20}
      />
      <UIText
        weight={isActive && 'semibold'}
        color={isActive ? colors.text.primary : colors.text.secondary}>
        {label}
      </UIText>
    </UIBlock>
  );
};
