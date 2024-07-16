import { UIHeaderProps } from './types';

import React from 'react';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { UIText } from '../Text';
import { UIBlock } from '../Block';
import { UIIcon } from '../Icon';

export const UIHeader = ({
  title,
  description,
  rightComponent,
  onBack,
}: UIHeaderProps) => {
  const navigation = useNavigation();

  const onBackPress = useCallback(() => {
    if (onBack) {
      return onBack();
    }

    navigation.goBack();
  }, [navigation, onBack]);

  return (
    <UIBlock gap={'m'}>
      <UIBlock
        onPress={onBackPress}
        isRow
        hAlign={rightComponent ? 'between' : undefined}
        gap={30}>
        <UIIcon name="arrow-left" />
        {rightComponent}
      </UIBlock>

      <UIBlock gap={'s'}>
        <UIText size="xl" bold>
          {title}
        </UIText>

        {description && <UIText tertiary>{description}</UIText>}
      </UIBlock>
    </UIBlock>
  );
};
