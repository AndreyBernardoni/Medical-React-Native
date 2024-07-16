import React from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';

import { SPACING } from '../../../constants/spacing';
import { UIIcon } from '../Icon';

export const UISelectInput = ({ text, onPress }) => {
  const { colors } = useTheme();

  return (
    <UIBlock
      isRow
      hPadding={'l'}
      hAlign="space-between"
      vAlign="center"
      height={SPACING.massive}
      radius={SPACING.massive}
      color={colors.background.secondary}
      onPress={onPress}>
      <UIText>{text}</UIText>

      <UIIcon
        font="fa6"
        name="caret-down"
        size={16}
        color={colors.text.secondary}
      />
    </UIBlock>
  );
};
