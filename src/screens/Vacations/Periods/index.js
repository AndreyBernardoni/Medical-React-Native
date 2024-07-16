import React from 'react';
import { UIBlock } from '../../../components/UI/Block';
import { UIText } from '../../../components/UI/Text';
import { UISelect } from '../../../components/UI/Select';
import { UISkeleton } from '../../../components/Skeleton';

import { useNetInfo } from '@react-native-community/netinfo';

import { useVacationsStore } from '../../../stores/vacationsStore';

export const PeriodsHeader = ({ initialSelect, setType }) => {
  const PERIODS_OPTIONS = [
    {
      label: 'Todos',
      value: 'all',
    },
    {
      label: 'Em dia',
      value: 'ok',
    },
    {
      label: 'Quase vencidos',
      value: 'about_to_expire',
    },
    {
      label: 'Vencidos',
      value: 'expired',
    },
  ];

  const [selected, setSelected] = React.useState(initialSelect || 'all');

  const { getVacationsPeriods, loading } = useVacationsStore();
  const total = useVacationsStore().data.periods?._meta?.total;

  const { isConnected } = useNetInfo();

  React.useEffect(() => {
    if (isConnected) {
      getVacationsPeriods({ status: selected });
    }
  }, [getVacationsPeriods, isConnected, selected]);

  return (
    <UIBlock gap={'m'}>
      <UISelect
        isRadio
        selected={selected}
        options={PERIODS_OPTIONS}
        onConfirm={item => {
          setSelected(item);
          setType(item);
        }}
      />

      {loading ? (
        <UISkeleton height={22} width={150} borderRadius={6} isFlex />
      ) : (
        <UIText tertiary>{total + ' resultados'}</UIText>
      )}
    </UIBlock>
  );
};

export const PeriodsItem = ({ item }) => {
  return (
    <UIBlock>
      <UIText>{item.employee.full_name}</UIText>
    </UIBlock>
  );
};
