import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { UISkeleton } from '../../../components/Skeleton';
import { UIBlock } from '../../../components/UI/Block';
import { UIText } from '../../../components/UI/Text';

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
        <UISkeleton height={78} isFlex loading={false} borderRadius={8}>
          <Card
            label={'Remédios administrados'}
            value={3}
            onPress={onWorking}
          />
        </UISkeleton>
        <UISkeleton height={78} isFlex loading={false} borderRadius={8}>
          <Card
            label={'Remédios não administrados'}
            value={0}
            onPress={onLate}
          />
        </UISkeleton>
      </UIBlock>

      <UIBlock isRow gap={'xs'}>
        <UISkeleton height={78} isFlex loading={false} borderRadius={8}>
          <Card label={'Idosos cadastrados'} value={1} onPress={onExtra} />
        </UISkeleton>

        <UISkeleton height={78} isFlex loading={false} borderRadius={8}>
          <Card label={'Remédios para hoje'} value={10} onPress={onEarly} />
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
