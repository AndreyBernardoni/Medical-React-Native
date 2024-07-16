import { UICheckCardProps } from './types';

import React, { memo, useCallback, useState } from 'react';
import { useTheme } from '@react-navigation/native';

import { SPACING } from '../../../constants/spacing';

import { UIBlock, UIRow } from '../Block';
import { UIText } from '../Text';
import { UIIcon } from '../Icon';
import { UIBool } from '../Bool';
import { UICheck } from '../Check';

export const UICheckCard = memo(
  ({ title, subtitle, content, isChecked, onCheck }: UICheckCardProps) => {
    const { colors } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    const onExpand = useCallback(
      () => setIsExpanded(!isExpanded),
      [isExpanded],
    );

    return (
      <UIRow gap={'m'}>
        <UIBlock tPadding={'xs'}>
          <UICheck isChecked={isChecked} onChange={onCheck} />
        </UIBlock>

        <UIBlock
          isFlex
          color={colors.background.secondary}
          radius={SPACING.small}>
          <UIBlock
            isRow
            isBetween
            padding={'s'}
            hPadding={'m'}
            onPress={onExpand}>
            <UIText>{title}</UIText>
            <UIIcon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={16}
            />
          </UIBlock>

          <UIBool name="se card expandido" condition={isExpanded}>
            <UIBlock gap={'s'} padding={'m'}>
              {content}
            </UIBlock>
          </UIBool>
        </UIBlock>
      </UIRow>
    );
  },
);
