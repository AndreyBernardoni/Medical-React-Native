import React from 'react';
import { AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { HomeTopbar } from './Topbar';
import { HomeCards } from './Cards';
import { HomeGreeting } from './Greeting';
import { HomeInfo } from './Info';
import { HomeShortcuts } from './Shortcuts';

import { UIBlock } from '../../components/UI/Block';
import { UIScroll } from '../../components/UI/Scroll';

import { useUserStore } from '../../stores/userStore';
import { useStatusStore } from '../../stores/statusStore';
import { useShortcutsStore } from '../../stores/shortcutsStore';
import { useEmployersStore } from '../../stores/employersStore';
import { useNetInfo } from '@react-native-community/netinfo';

export const HomeScreen = () => {
  const RELOAD_INTERVAL = 1000 * 15; // 15 segundos

  const { login } = useUserStore();
  const { getStatus } = useStatusStore();
  const { getShortcuts } = useShortcutsStore();
  const { getEmployers } = useEmployersStore();

  const loadingUser = useUserStore().loading;
  const loadingStatus = useStatusStore().loading;
  const loadingShortcuts = useShortcutsStore().loading;
  const loadingEmployers = useUserStore().loading;

  const isLoading =
    loadingUser || loadingStatus || loadingShortcuts || loadingEmployers;

  const [isManualRefresh, setIsManualRefresh] = React.useState(false);

  const { isConnected } = useNetInfo();

  const refreshing = React.useMemo(() => {
    return isConnected ? isManualRefresh && isLoading : false;
  }, [isConnected, isManualRefresh, isLoading]);

  const intervalRef = React.useRef(null);

  const onRefresh = React.useCallback(() => {
    if (isConnected) {
      reload(true);
    }
  }, [isConnected, reload]);

  const startInterval = React.useCallback(() => {
    const id = setInterval(() => reload(false), RELOAD_INTERVAL);
    console.log('@Home/startInterval', id);
    return id;
  }, [RELOAD_INTERVAL, reload]);

  const stopInterval = React.useCallback(id => {
    console.log('@Home/stopInterval', id);
    clearInterval(id);
  }, []);

  const fetchData = React.useCallback(() => {
    if (!isConnected) {
      return Promise.resolve();
    }

    return Promise.all([
      login({}),
      getStatus({}),
      getShortcuts({}),
      getEmployers({}),
    ]);
  }, [getEmployers, getShortcuts, getStatus, isConnected, login]);

  const reload = React.useCallback(
    (manual = false) => {
      if (manual) {
        setIsManualRefresh(true);
      }
      fetchData().finally(() => setIsManualRefresh(false));
    },
    [fetchData],
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log('@screen/Home/useFocusEffect -> focus');

      const id = startInterval();
      intervalRef.current = id;

      return () => {
        console.log('@screen/Home/useFocusEffect -> blur');
        stopInterval(intervalRef.current);
      };
    }, [startInterval, stopInterval]),
  );

  React.useEffect(() => {
    const appListener = AppState.addEventListener('change', type => {
      if (type === 'active') {
        console.log('@screen/Home/appListener/active -> onStart & interval');
        fetchData();

        const id = startInterval();
        intervalRef.current = id;
      } else {
        console.log('@screen/Home/appListener/!active -> stop interval');
        stopInterval(intervalRef.current);
      }
    });

    return () => {
      appListener.remove();
    };
  }, [fetchData, startInterval, stopInterval]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData, getShortcuts, getStatus, login]);

  return (
    <UIScroll isSafe onRefresh={onRefresh} refreshing={refreshing}>
      <UIBlock padding="l" gap={'l'}>
        <HomeTopbar />
        <HomeGreeting />
        <HomeInfo />
        <HomeCards />
        <HomeShortcuts />
      </UIBlock>
    </UIScroll>
  );
};
