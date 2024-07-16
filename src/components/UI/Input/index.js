import React from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';
import { UIIcon } from '../Icon';

import { SPACING } from '../../../constants/spacing';

export const UIInput = ({ type = 'select', text, onPress }) => {
  const { colors } = useTheme();

  if (type === 'select') {
    return (
      <UIBlock
        isRow
        hAlign="space-between"
        vAlign="center"
        height={48}
        radius={48}
        hPadding={SPACING.large}
        color={colors.background.secondary}
        onPress={onPress}>
        <UIText>{text}</UIText>

        <UIIcon
          font="fa6"
          name="chevron-down"
          size={14}
          color={colors.text.secondary}
        />
      </UIBlock>
    );
  }

  return <UIText>{text}</UIText>;
};
