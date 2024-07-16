import { UIBlock } from '../../../components/UI/Block';
import { UIText } from '../../../components/UI/Text';
import { SPACING } from '../../../constants/spacing';
import React from 'react';
import { useTheme } from '@react-navigation/native';

export const Info = ({ isRow, label, value }) => {
  const { colors } = useTheme();

  if (isRow) {
    return (
      <UIBlock gap={SPACING.semi_tiny}>
        <UIText color={colors.text.tertiary}>{label}</UIText>
        <UIText>{value}</UIText>
      </UIBlock>
    );
  }

  return (
    <UIBlock gap={SPACING.semi_tiny}>
      <UIText size="xs" tertiary>
        {label}
      </UIText>

      <UIText>{value}</UIText>
    </UIBlock>
  );
};
