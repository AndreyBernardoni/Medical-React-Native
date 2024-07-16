import React from 'react';

import { UIText } from '../../../components/UI/Text';
import { UIBlock } from '../../../components/UI/Block';
import { UISkeleton } from '../../../components/Skeleton';

import { useStatusStore } from '../../../stores/statusStore';

export const HomeInfo = () => {
  const homeData = useStatusStore().data;

  return (
    <UIBlock gap={'2xs'}>
      <UIBlock isRow gap={'s'}>
        <UISkeleton
          loading={!homeData?.totals}
          height={22}
          width={240}
          borderRadius={6}>
          <UIText bold>{homeData?.totals?.today_birthdays}</UIText>
          <UIText secondary>Aniversários hoje</UIText>
        </UISkeleton>
      </UIBlock>

      <UIBlock isRow gap={'s'}>
        <UISkeleton
          loading={!homeData?.totals}
          height={22}
          width={240}
          borderRadius={6}>
          <UIText bold>{homeData?.totals?.today_sentiments}</UIText>
          <UIText secondary>Responderam sentimentos</UIText>
        </UISkeleton>
      </UIBlock>
    </UIBlock>
  );
};
