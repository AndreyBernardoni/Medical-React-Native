import React from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';
import { UIIcon } from '../Icon';

import { SPACING } from '../../../constants/spacing';

export const UICheckbox = ({ id, text, isActive, onPress }) => {
  const { colors } = useTheme();

  const activeColor = colors.background.tertiary;
  const inactiveColor = colors.background.secondary;

  const activeTextColor = colors.text.primary;
  const inactiveTextColor = colors.text.primary;

  const activeIcon = 'square-check';
  const inactiveIcon = 'square';

  const activeIconColor = colors.primary;
  const inactiveIconColor = colors.text.secondary;

  return (
    <UIBlock
      isRow
      isBetween
      height={48}
      vAlign="center"
      gap={'m'}
      hPadding={'l'}
      radius={SPACING.extra_small}
      color={isActive ? activeColor : inactiveColor}
      onPress={() => onPress(id)}>
      <UIText
        weight={isActive && 'semibold'}
        color={isActive ? activeTextColor : inactiveTextColor}>
        {text}
      </UIText>

      <UIIcon
        font="fa6"
        name={isActive ? activeIcon : inactiveIcon}
        color={isActive ? activeIconColor : inactiveIconColor}
        size={20}
      />
    </UIBlock>
  );
};
