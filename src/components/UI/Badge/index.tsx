import React from 'react';
import { useTheme } from '@react-navigation/native';
import { UIBadgeProps } from './types';

import { UIBlock } from '../Block';
import { UIText } from '../Text';

export const UIBadge = ({ value }: UIBadgeProps) => {
  const { colors } = useTheme();
  return (
    <UIBlock color={colors.error} padding={['3xs', 's']} radius={'xl'} isCenter>
      <UIText>{value}</UIText>
    </UIBlock>
  );
};
