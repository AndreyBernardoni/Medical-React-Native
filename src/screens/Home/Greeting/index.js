import React from 'react';

import { UIBlock } from '../../../components/UI/Block';
import { UIText } from '../../../components/UI/Text';

import { TiqueBitPlan } from '../../../components/TiqueBitPlan';

export const HomeGreeting = () => {
  const today =
    new Date().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
    }) +
    ', ' +
    new Date().getFullYear();

  return (
    <UIBlock isRow hAlign="space-between">
      <UIBlock>
        <UIText size="l" semibold>
          Boa tarde!
        </UIText>

        <UIText secondary>{today}</UIText>
      </UIBlock>

      <TiqueBitPlan />
    </UIBlock>
  );
};
