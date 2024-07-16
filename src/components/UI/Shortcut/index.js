import React from 'react';
import { UIBlock } from '../Block';
import { UIIcon } from '../Icon';
import { UIText } from '../Text';

export const UIShortcut = ({ icon, title, onPress }) => {
  return (
    <UIBlock isRow isBetween vAlign="center" onPress={onPress}>
      <UIBlock isRow isCenter gap="m">
        <UIIcon name={icon} size={18} />
        <UIText>{title}</UIText>
      </UIBlock>

      <UIIcon name="chevron-right" size={16} />
    </UIBlock>
  );
};
