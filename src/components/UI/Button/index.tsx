import { UIButtonProps } from './types';

import React from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';
import { UIIcon } from '../Icon';

export const UIButton = ({
  isFlex,
  isOutline,
  isBlank,
  color,
  text,
  textColor,
  icon,
  iconComponent,
  onPress,
}: UIButtonProps) => {
  const { colors } = useTheme();

  const baseColor = React.useMemo(
    () => color || colors.primary,
    [color, colors.primary],
  );

  const baseTextColor = React.useMemo(
    () => textColor || colors.text.primary,
    [textColor, colors.text.primary],
  );

  if (isOutline) {
    return (
      <UIBlock
        isRow
        isFlex={isFlex}
        gap={'s'}
        vPadding={'m'}
        radius={'xl'}
        vAlign="center"
        hAlign="center"
        border={2}
        borderColor={baseColor}
        onPress={onPress}>
        {icon && <UIIcon name={icon} size={16} color={baseColor} />}
        {iconComponent && iconComponent}

        <UIText
          color={textColor || baseColor}
          weight="semibold"
          align={!icon && !iconComponent && 'center'}>
          {text}
        </UIText>
      </UIBlock>
    );
  }

  if (isBlank) {
    return (
      <UIBlock
        isRow
        isFlex={isFlex}
        gap={'s'}
        vPadding={'m'}
        vAlign="center"
        hAlign="center"
        onPress={onPress}>
        {icon && <UIIcon name={icon} size={16} color={baseColor} />}
        {iconComponent && iconComponent}

        <UIText
          color={textColor || baseColor}
          weight="semibold"
          align={!icon && !iconComponent && 'center'}>
          {text}
        </UIText>
      </UIBlock>
    );
  }

  return (
    <UIBlock
      isRow
      isFlex={isFlex}
      gap={'s'}
      vPadding={'m'}
      radius={'xl'}
      vAlign="center"
      hAlign="center"
      color={baseColor}
      onPress={onPress}>
      {icon && (
        <UIIcon name={icon} size={16} color={textColor || baseTextColor} />
      )}

      {iconComponent && iconComponent}

      <UIText
        color={textColor || baseTextColor}
        weight="semibold"
        align={!icon && !iconComponent && 'center'}>
        {text}
      </UIText>
    </UIBlock>
  );
};
