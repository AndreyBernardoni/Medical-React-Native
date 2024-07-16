import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { UIButtonItems } from '../../../components/UI/ButtonItems';
import { UIBlock } from '../../../components/UI/Block';

import { SCREENS } from '../../../constants/screens';
import { useShortcutsStore } from '../../../stores/shortcutsStore';

export const HomeShortcuts = () => {
  const { navigate } = useNavigation();
  const { data } = useShortcutsStore();

  const isLoading = !data?.amount_totals;

  console.log('data', data);

  const groups = [
    {
      title: 'Hora extra',
      loading: isLoading,
      items: [
        {
          label: 'Tempo de hora extra',
          value: data?.amount_totals?.extra_time,
          onPress: () =>
            navigate(SCREENS.Employees, {
              status: 'extra_time',
              period: 'current',
            }),
        },
        {
          label: 'Custo de hora extra',
          value: 'R$' + data?.amount_totals?.extra_time_cost,
          onPress: () =>
            navigate(SCREENS.Employees, {
              status: 'extra_time_cost',
              period: 'current',
            }),
        },
        {
          label: 'Excederam 10h por dia',
          value: data?.amount_totals?.over_10h_day,
          onPress: () =>
            navigate(SCREENS.Employees, {
              status: 'more_10h_day',
              period: 'current',
            }),
        },
      ],
    },
    {
      title: 'Intervalo',
      loading: isLoading,
      items: [
        {
          label: 'Fizeram menos de 1h',
          value: data?.amount_totals?.less_interval,
          onPress: () =>
            navigate(SCREENS.Employees, {
              status: 'less_1h_interval',
              period: 'current',
            }),
        },
        {
          label: 'Não fizeram intervalo',
          value: data?.amount_totals?.no_interval,
          onPress: () =>
            navigate(SCREENS.Employees, {
              status: 'no_interval',
              period: 'current',
            }),
        },
        {
          label: 'Excederam 6h sem intervalo',
          value: data?.amount_totals?.over_6h_no_interval,
          onPress: () =>
            navigate(SCREENS.Employees, {
              status: 'more_6h_no_interval',
              period: 'current',
            }),
        },
      ],
    },
    {
      title: 'Escala',
      loading: isLoading,
      items: [
        {
          label: 'Menos de 11h interjornada',
          value: data?.amount_totals?.less_11h_between,
          onPress: () =>
            navigate(SCREENS.Employees, {
              status: 'less_11h_between',
              period: 'current',
            }),
        },
        {
          label: 'Absenteísmo',
          value: data?.amount_totals?.absenteeism.toFixed(2) + '%',
          onPress: () =>
            navigate(SCREENS.Employees, {
              status: 'absenteeism',
              period: 'current',
            }),
        },
        // {
        //   label: 'Dias sem registro',
        //   value: '21',
        //   onPress: () =>
        //     navigate(SCREENS.Employees, {
        //       status: 'less_11h_between',
        //       period: 'current',
        //     }),
        // },
      ],
    },
  ];

  return (
    <UIBlock gap={'m'}>
      {groups?.map(({ title, items, loading }, groupIndex) => (
        <UIButtonItems
          key={groupIndex}
          title={title}
          items={items}
          loading={loading}
        />
      ))}
    </UIBlock>
  );
};
