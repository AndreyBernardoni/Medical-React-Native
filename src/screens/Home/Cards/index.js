import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { UIText } from '../../../components/UI/Text';
import { UIBlock } from '../../../components/UI/Block';
import { UISkeleton } from '../../../components/Skeleton';

import { SCREENS } from '../../../constants/screens';

import { useStatusStore } from '../../../stores/statusStore';

export const HomeCards = () => {
  const { navigate } = useNavigation();

  const { data } = useStatusStore();

  const onWorking = React.useCallback(() => {
    navigate(SCREENS.Employees, { status: 'working' });
  }, [navigate]);

  const onLate = React.useCallback(() => {
    navigate(SCREENS.Employees, { status: 'late' });
  }, [navigate]);

  const onExtra = React.useCallback(() => {
    navigate(SCREENS.Employees, { status: 'extra_time' });
  }, [navigate]);

  const onEarly = React.useCallback(() => {
    navigate(SCREENS.Employees, { status: 'early_leave' });
  }, [navigate]);

  return (
    <UIBlock gap={'xs'}>
      <UIBlock isRow gap={'xs'}>
        <UISkeleton height={78} isFlex loading={!data?.totals} borderRadius={8}>
          <Card
            label={'Trabalhando'}
            value={data?.totals?.working}
            onPress={onWorking}
          />
        </UISkeleton>
        <UISkeleton height={78} isFlex loading={!data?.totals} borderRadius={8}>
          <Card
            label={'Atrasados'}
            value={data?.totals?.late}
            onPress={onLate}
          />
        </UISkeleton>
      </UIBlock>

      <UIBlock isRow gap={'xs'}>
        <UISkeleton height={78} isFlex loading={!data?.totals} borderRadius={8}>
          <Card
            label={'Hora extra'}
            value={data?.totals?.extra_time}
            onPress={onExtra}
          />
        </UISkeleton>

        <UISkeleton height={78} isFlex loading={!data?.totals} borderRadius={8}>
          <Card
            label={'Saída antecipada'}
            value={data?.totals?.early_leave}
            onPress={onEarly}
          />
        </UISkeleton>
      </UIBlock>
    </UIBlock>
  );
};

const Card = ({ label, value, onPress }) => {
  return (
    <UIBlock
      isFlex
      tertiary
      radius={'xs'}
      gap={'xs'}
      padding={'s'}
      onPress={onPress}>
      <UIText size="l" bold>
        {value}
      </UIText>

      <UIText secondary>{label}</UIText>
    </UIBlock>
  );
};
