import React from 'react';

import { TiqueBitPlan } from '../../../components/TiqueBitPlan';

import { UIBlock } from '../../../components/UI/Block';
import { UIText } from '../../../components/UI/Text';
import { useUserStore } from '../../../stores/userStore';
import { useEmployersStore } from '../../../stores/employersStore';

export const MenuInfo = () => {
  const userData = useUserStore().data;
  const employerData = useEmployersStore().data;

  return (
    <UIBlock isRow hAlign="space-between">
      <UIBlock gap={'xs'}>
        <UIText semibold>{employerData?.name}</UIText>

        <UIBlock gap={'3xs'}>
          <UIText secondary>{userData?.full_name}</UIText>
          <UIText tertiary>{userData?.email}</UIText>
        </UIBlock>
      </UIBlock>

      <TiqueBitPlan />
    </UIBlock>
  );
};
