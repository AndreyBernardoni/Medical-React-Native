import React, { memo, useCallback, useState } from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';
import { UIIcon } from '../Icon';
import { UIBool } from '../Bool';

import { SPACING } from '../../../constants/spacing';

export const UICardExpandable = memo(
  ({ title, subtitle, content, onDetails, onApprove, onReject }) => {
    const { colors } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    const onExpand = useCallback(
      () => setIsExpanded(!isExpanded),
      [isExpanded],
    );

    return (
      <UIBlock
        ui="card de pendencia"
        isFlex
        color={colors.background.secondary}
        radius={SPACING.small}>
        <UIBlock
          ui="header do card de pendencia clica para expandir"
          isRow
          isBetween
          padding={'s'}
          hPadding={'m'}
          onPress={onExpand}>
          <UIText>{title}</UIText>
          <UIIcon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} />
        </UIBlock>

        <UIBool ui="se card expandido" condition={isExpanded}>
          <UIBlock gap={'s'} padding={'m'}>
            {content}
          </UIBlock>
        </UIBool>
      </UIBlock>
    );
  },
);
