import React from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../../../components/UI/Block';
import { UIText } from '../../../components/UI/Text';
import { UIIcon } from '../../../components/UI/Icon';

import { SPACING } from '../../../constants/spacing';

export const MenuBanner = () => {
  const { colors } = useTheme();

  return (
    <UIBlock
      isRow
      color={colors.plans.banner.background}
      padding={'m'}
      gap={'m'}
      vAlign="center"
      radius={SPACING.extra_small}
      onPress={() => {}}>
      <UIBlock
        align="center"
        height={45}
        width={45}
        radius={45}
        border={4}
        borderColor={colors.plans.banner.border}
        color={colors.plans.banner.backgroundSecondary}>
        <UIIcon
          font="fa6"
          name="crown"
          size={20}
          color={colors.plans.banner.icon}
        />
      </UIBlock>

      <UIBlock isFlex gap={'2xs'}>
        <UIText color={colors.plans.banner.title} semibold>
          Conhecer planos
        </UIText>
        <UIText size="s" color={colors.plans.banner.subtitle}>
          Faça seu teste gratuíto
        </UIText>
      </UIBlock>

      <UIIcon name="chevron-right" size={20} color="#B25521" />
    </UIBlock>
  );
};
