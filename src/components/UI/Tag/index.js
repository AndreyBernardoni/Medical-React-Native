import React, { memo } from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';
import { UIIcon } from '../Icon';
import { SPACING } from '../../../constants/spacing';

export const UITag = memo(({ id, text, color, onRemove }) => {
  const { colors } = useTheme();

  return (
    <UIBlock
      isRow
      isCenter
      gap={'xs'}
      color={color}
      radius={SPACING.semi_huge}
      height={SPACING.semi_huge}
      lPadding="s"
      rPadding="xs">
      <UIText size="s" black>
        {text}
      </UIText>

      <UIBlock
        onPress={() => onRemove(id)}
        isSquare
        radius={SPACING.large}
        align="center">
        <UIIcon font="fa6" name="xmark" size={16} color={colors.white} />
      </UIBlock>
    </UIBlock>
  );
});
