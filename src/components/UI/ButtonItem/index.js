import React from 'react';
import { useTheme } from '@react-navigation/native';

import { UIText } from '../Text';
import { UIIcon } from '../Icon';
import { UIBlock } from '../Block';

export const UIButtonItem = ({ label, value, color, icon, onPress }) => {
  const { colors } = useTheme();

  return (
    <UIBlock isRow isBetween onPress={onPress}>
      <UIText>{label}</UIText>

      <UIBlock isRow isCenter gap={'xs'}>
        <UIText weight="semibold" color={color}>
          {value}
        </UIText>

        <UIIcon
          name={icon || 'chevron-right'}
          size={18}
          color={colors.text.quaternary}
        />
      </UIBlock>
    </UIBlock>
  );
};
