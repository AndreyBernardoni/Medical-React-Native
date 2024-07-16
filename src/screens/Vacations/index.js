import React from 'react';

import { useTheme } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { UISkeleton } from '../../components/Skeleton';
import { UIBlock } from '../../components/UI/Block';
import { UITabs } from '../../components/UI/Tabs';
import { UIBool } from '../../components/UI/Bool';
import { UIHeader } from '../../components/UI/Header';
import { UILoading } from '../../components/UI/Loading';
import { UIArrowToTop } from '../../components/UI/ArrowTop';
import { Empty } from './Empty';

import { RequestsHeader, RequestsItem } from './Requests';
import { PeriodsHeader, PeriodsItem } from './Periods';
import { BalancesHeader, BalancesItem } from './Balances';
import { FlatList, RefreshControl } from 'react-native';

import { useVacationsStore } from '../../stores/vacationsStore';

const TABS = [
  {
    label: 'Solicitações',
    value: 'requests',
  },
  {
    label: 'Períodos',
    value: 'periods',
  },
  {
    label: 'Saldos',
    value: 'balances',
  },
];

const REQUESTS_OPTIONS = [
  {
    label: 'Todos',
    value: 'all',
  },
  {
    label: 'Aprovados',
    value: 'approved',
  },
  {
    label: 'Pendentes',
    value: 'pending',
  },
  {
    label: 'Reprovados',
    value: 'rejected',
  },
];

export const VacationsScreen = ({ route }) => {
  const [tab, setTab] = React.useState(TABS[0].value);
  const [type, setType] = React.useState('all');
  const [showArrowUp, setShowArrowUp] = React.useState(false);

  const { colors } = useTheme();

  const scrollRef = React.useRef();

  const {
    loading,
    loadingMore,
    refreshing,
    loadMoreVacationsSolicitations,
    refreshVacationsSolicitations,
    loadMoreVacationsBalances,
    refreshVacationsBalances,
    refreshVacationsPeriods,
  } = useVacationsStore();

  const { isConnected } = useNetInfo();

  const solicitations = useVacationsStore().data.solicitations;
  const periods = useVacationsStore().data.periods;
  const balances = useVacationsStore().data.balances;

  const canLoadMore = React.useMemo(() => {
    return !loading && !loadingMore && !refreshing && isConnected;
  }, [isConnected, loading, loadingMore, refreshing]);

  const initialRequestsSelection = React.useMemo(() => {
    if (route?.params?.requestSelect) {
      return REQUESTS_OPTIONS.find(
        option => option.value === route.params.requestSelect,
      );
    }

    return 'all';
  }, [route]);

  const data = React.useMemo(() => {
    if (loading) {
      return null;
    }

    return tab === 'requests'
      ? solicitations?._items
      : tab === 'periods'
      ? periods?._items
      : balances?._items;
  }, [balances?._items, loading, periods?._items, solicitations?._items, tab]);

  const loadMoreSolicitations = React.useCallback(() => {
    if (!canLoadMore) {
      return;
    }

    if (solicitations?._meta.total === solicitations?._items.length) {
      return;
    }
    const nextPage = solicitations?._meta.page + 1;

    loadMoreVacationsSolicitations({
      page: nextPage,
      type,
    });
  }, [
    canLoadMore,
    loadMoreVacationsSolicitations,
    solicitations?._items.length,
    solicitations?._meta.page,
    solicitations?._meta.total,
    type,
  ]);

  const loadMorePeriods = React.useCallback(() => {
    if (!canLoadMore) {
      return;
    }

    if (periods?._meta.total === periods?._items.length) {
      return;
    }

    refreshVacationsPeriods({
      href: periods?._links?.next?.href,
    });
  }, [
    canLoadMore,
    periods?._meta.total,
    periods?._items.length,
    periods?._links?.next?.href,
    refreshVacationsPeriods,
  ]);

  const loadMoreBalances = React.useCallback(() => {
    if (!canLoadMore) {
      return;
    }

    if (balances?._meta.total === balances?._items.length) {
      return;
    }

    loadMoreVacationsBalances({
      page: balances?._meta.page + 1,
    });
  }, [
    balances?._items.length,
    balances?._meta.page,
    balances?._meta.total,
    canLoadMore,
    loadMoreVacationsBalances,
  ]);

  const renderItem = React.useCallback(
    ({ item }) => {
      if (loading) {
        return null;
      }

      return (
        <>
          <UIBool condition={tab === 'requests'}>
            <UIBlock hPadding={'l'} bPadding="m">
              <RequestsItem item={item} />
            </UIBlock>
          </UIBool>
          <UIBool condition={tab === 'periods'}>
            <UIBlock hPadding={'l'} bPadding="m">
              <PeriodsItem item={item} />
            </UIBlock>
          </UIBool>
          <UIBool condition={tab === 'balances'}>
            <UIBlock hPadding={'l'} bPadding="m">
              <BalancesItem item={item} />
            </UIBlock>
          </UIBool>
        </>
      );
    },
    [loading, tab],
  );

  const Header = React.useCallback(() => {
    return (
      <UIBlock padding={'l'} gap={'m'}>
        <UIHeader
          title={'Férias'}
          description={'Veja os pedidos e agendamentos de férias.'}
        />

        <UITabs tab={tab} tabs={TABS} onChange={setTab} isOutline />

        <UIBool condition={tab === 'requests'}>
          <RequestsHeader
            initialSelect={initialRequestsSelection}
            setType={setType}
          />
        </UIBool>

        <UIBool condition={tab === 'periods'}>
          <PeriodsHeader
            initialSelect={initialRequestsSelection}
            setType={setType}
          />
        </UIBool>

        <UIBool condition={tab === 'balances'}>
          <BalancesHeader />
        </UIBool>
      </UIBlock>
    );
  }, [initialRequestsSelection, tab]);

  const onTop = React.useCallback(() => {
    scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [scrollRef]);

  const onScroll = React.useCallback(
    event => {
      const positionY = event?.nativeEvent?.contentOffset?.y || 0;
      if (positionY > 200 && !showArrowUp) {
        setShowArrowUp(true);
      }
      if (positionY < 200 && showArrowUp) {
        setShowArrowUp(false);
      }
    },
    [showArrowUp],
  );

  const onRefresh = React.useCallback(() => {
    if (tab === 'requests') {
      refreshVacationsSolicitations({ type });
    } else if (tab === 'periods') {
      refreshVacationsPeriods({ status: type });
    } else {
      refreshVacationsBalances({});
    }
  }, [
    refreshVacationsBalances,
    refreshVacationsPeriods,
    refreshVacationsSolicitations,
    tab,
    type,
  ]);

  return (
    <UIBlock gap={'m'} isSafe isFlex color={colors.white}>
      <FlatList
        style={{
          flex: 1,
        }}
        ref={scrollRef}
        onScroll={onScroll}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListHeaderComponent={Header}
        data={data}
        renderItem={({ item }) => renderItem({ item })}
        onEndReachedThreshold={0.2}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={
          tab === 'requests'
            ? loadMoreSolicitations
            : tab === 'periods'
            ? loadMorePeriods
            : loadMoreBalances
        }
        refreshControl={
          isConnected && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
        ListFooterComponent={loadingMore ? <UILoading large /> : null}
        ListEmptyComponent={
          loading ? (
            <UIBlock hPadding={'l'} bPadding={'m'}>
              <UIBlock gap={16}>
                <UISkeleton height={76} borderRadius={12} isFlex />
                <UISkeleton height={76} borderRadius={12} isFlex />
                <UISkeleton height={76} borderRadius={12} isFlex />
                <UISkeleton height={76} borderRadius={12} isFlex />
                <UISkeleton height={76} borderRadius={12} isFlex />
                <UISkeleton height={76} borderRadius={12} isFlex />
                <UISkeleton height={76} borderRadius={12} isFlex />
              </UIBlock>
            </UIBlock>
          ) : (
            <Empty text="Nenhum resultado encontrado" />
          )
        }
      />
      <UIArrowToTop onPress={onTop} isVisible={showArrowUp} />
    </UIBlock>
  );
};
