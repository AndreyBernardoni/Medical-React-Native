import React from 'react';

import { UIBlock } from '../../../components/UI/Block';
import { UIText } from '../../../components/UI/Text';

import { useNavigation } from '@react-navigation/native';
import { Userpic } from 'react-native-userpic';
import { UIIcon } from '../../../components/UI/Icon';
import { useUserStore } from '../../../stores/userStore';

export const HomeGreeting = () => {
  const { data } = useUserStore();

  const navigation = useNavigation();

  const role = data?.role === 'caregiver' ? 'Cuidador' : 'Idoso';

  return (
    <UIBlock isRow hAlign="between">
      <UIBlock>
        <UIIcon
          name="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      </UIBlock>
      <UIBlock isRow gap={16}>
        <UIBlock>
          <UIText size="l" semibold>
            {data?.name}
          </UIText>

          <UIText secondary align="right" size="s">
            {role}
          </UIText>
        </UIBlock>
        <Userpic name={data?.name} colorize />
      </UIBlock>

      {/* <TiqueBitPlan /> */}
    </UIBlock>
  );
};
