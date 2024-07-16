import React from 'react';
import { UIHeader } from '../../components/UI/Header';
import { UIScroll } from '../../components/UI/Scroll';
import { UIBlock } from '../../components/UI/Block';
import { SPACING } from '../../constants/spacing';

export const PlansScreen = () => {
  return (
    <UIScroll isSafe>
      <UIBlock gap={SPACING.medium} padding={SPACING.large}>
        <UIHeader
          title={'Planos'}
          description={'Conheça os planos feitos para te ajudar.'}
        />
      </UIBlock>
    </UIScroll>
  );
};
