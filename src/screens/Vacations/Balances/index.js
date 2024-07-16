import React from 'react';
import { Column } from 'react-smart-layout';

import { UIText } from '../../../components/UI/Text';
import { UISkeleton } from '../../../components/Skeleton';
import { UIBlock } from '../../../components/UI/Block';

import { useNetInfo } from '@react-native-community/netinfo';

import { useVacationsStore } from '../../../stores/vacationsStore';

export const BalancesHeader = () => {
  const { getVacationsBalances, loading } = useVacationsStore();
  const total = useVacationsStore().data.balances?._meta.total;

  const { isConnected } = useNetInfo();

  React.useEffect(() => {
    if (isConnected) {
      getVacationsBalances({});
    }
  }, [getVacationsBalances, isConnected]);

  return (
    <UIBlock>
      {loading ? (
        <UISkeleton height={22} width={150} borderRadius={6} isFlex />
      ) : (
        <UIText tertiary>{total + ' resultados'}</UIText>
      )}
    </UIBlock>
  );
};

export const BalancesItem = ({ item }) => {
  return (
    <Column>
      <UIText secondary>{item?.full_name}</UIText>
      <UIText primary>{item?.final_balance}</UIText>
    </Column>
  );
};
