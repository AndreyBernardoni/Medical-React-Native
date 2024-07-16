import React from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';

import { SPACING } from '../../../constants/spacing';

export const UITabs = ({ tab, tabs, isOutline, onChange }) => {
  const { colors } = useTheme();

  if (isOutline) {
    return (
      <UIBlock isRow>
        {tabs?.map(({ label, value }, index) => {
          const isSelected = value === tab;

          return (
            <UIBlock
              key={index}
              isFlex
              align="center"
              bPadding="s"
              border={[0, 0, 0, 3]}
              borderColor={isSelected && colors.primary}
              onPress={() => onChange(value)}>
              <UIText weight={isSelected && 'semibold'}>{label}</UIText>
            </UIBlock>
          );
        })}
      </UIBlock>
    );
  }

  return (
    <UIBlock
      isRow
      height={SPACING.semi_massive}
      radius={8}
      color={colors.background.secondary}>
      {tabs?.map(({ label, value }, index) => {
        const isSelected = value === tab;

        return (
          <UIBlock
            key={index}
            isFlex
            align="center"
            color={
              isSelected
                ? colors.background.tertiary
                : colors.background.secondary
            }
            radius={8}
            onPress={() => onChange(value)}>
            <UIText
              weight={isSelected && 'semibold'}
              color={!isSelected && colors.text.secondary}>
              {label}
            </UIText>
          </UIBlock>
        );
      })}
    </UIBlock>
  );
};
