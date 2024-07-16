import { WarningProps } from './types';

import React from 'react';
import { UIBlock } from '../../../../components/UI/Block';
import { UIText } from '../../../../components/UI/Text';

import { _custom_themes } from '../../../../constants/themes';

export const Warning = ({ value, color }: WarningProps) => {
  const { colors } = _custom_themes.light;

  const offsetLeft = -24 / 4;

  return (
    <UIBlock
      isCenter
      height={24}
      width={24}
      radius={24}
      margin={[0, 0, 0, offsetLeft]}
      color={color}>
      <UIText size="xs" bold color={colors.warning.text}>
        {value}
      </UIText>
    </UIBlock>
  );
};
