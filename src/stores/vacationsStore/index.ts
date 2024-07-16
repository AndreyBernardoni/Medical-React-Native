import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  Balances,
  Periods,
  RejectError,
  Solicitations,
  VacationsPersistTypes,
  VacationsStateTypes,
} from './types';
import zustandStorage from '../storage';
import {
  getVacationsBalances,
  getVacationsPeriods,
  getVacationsSolicitations,
} from '../../services/getVacationsService';

const initialState = {
  data: {
    solicitations: null,
    periods: null,
    balances: null,
  },
  error: null,
  loading: false,
  loadingMore: false,
  refreshing: false,
};

export const useVacationsStore = create<VacationsStateTypes>(
  (persist as VacationsPersistTypes)(
    set => ({
      data: initialState.data,
      loading: initialState.loading,
      loadingMore: initialState.loadingMore,
      refreshing: initialState.refreshing,
      error: initialState.error,
      setData: data =>
        set(state => ({
          data: { ...state.data, ...data } as VacationsStateTypes['data'],
        })),
      setError: error => set({ error }),
      setLoading: loading => set({ loading }),
      setRefreshing: refreshing => set({ refreshing }),
      setLoadingMore: loadingMore => set({ loadingMore }),

      getVacationsSolicitations: async ({
        onSuccess,
        onError,
        type = 'all',
      }) => {
        set({ loading: true, error: null });

        const ORIGIN = '@Stores/vacationsStore/getVacationsSolicitations()';

        try {
          console.log(ORIGIN);
          const res: Solicitations = await getVacationsSolicitations({
            type,
          });

          console.log(ORIGIN + ' - Success:', res);

          set(state => ({
            data: {
              ...state.data,
              solicitations: res,
            },
            loading: false,
            error: null,
          }));

          if (onSuccess) {
            onSuccess(res);
          }

          console.log(ORIGIN + ' - Successed!');
        } catch (error) {
          set({
            loading: false,
            error: error as RejectError,
          });

          if (onError) {
            onError((error as RejectError).msg || 'Unknown error');
          }

          console.log(ORIGIN + ' - Error:', error);
        }
      },
      loadMoreVacationsSolicitations: async ({
        onSuccess,
        onError,
        page,
        type,
      }) => {
        set({ loadingMore: true, error: null });

        const ORIGIN =
          '@Stores/vacationsStore/loadMoreVacationsSolicitations()';

        try {
          console.log(ORIGIN);

          const res: Solicitations = await getVacationsSolicitations({
            type,
            page,
          });

          console.log(ORIGIN + ' - Success:', res);

          set(state => ({
            data: {
              ...state.data,
              solicitations: {
                _items: [
                  ...(state.data.solicitations?._items || []),
                  ...res._items,
                ],
                _meta: res._meta,
                _links: res._links,
              },
            },
            loadingMore: false,
            error: null,
          }));

          if (onSuccess) {
            onSuccess(res);
          }

          console.log(ORIGIN + ' - Successed!');
        } catch (error) {
          set({
            loadingMore: false,
            error: error as RejectError,
          });

          if (onError) {
            onError((error as RejectError).msg || 'Unknown error');
          }

          console.log(ORIGIN + ' - Error:', error);
        }
      },
      refreshVacationsSolicitations: async ({
        onSuccess,
        onError,
        type = 'all',
        page = 1,
      }) => {
        set({ refreshing: true, error: null });

        const ORIGIN = '@Stores/vacationsStore/refreshVacationsSolicitations()';

        try {
          console.log(ORIGIN);
          const res: Solicitations = await getVacationsSolicitations({
            type,
            page,
          });

          console.log(ORIGIN + ' - Success:', res);

          set(state => ({
            data: {
              ...state.data,
              solicitations: res,
            },
            refreshing: false,
            error: null,
          }));

          if (onSuccess) {
            onSuccess(res);
          }

          console.log(ORIGIN + ' - Successed!');
        } catch (error) {
          set({
            refreshing: false,
            error: error as RejectError,
          });

          if (onError) {
            onError((error as RejectError).msg || 'Unknown error');
          }

          console.log(ORIGIN + ' - Error:', error);
        }
      },

      getVacationsPeriods: async ({
        onSuccess,
        onError,
        status = 'all',
        page = 1,
      }) => {
        set({ loading: true, error: null });

        const ORIGIN = '@Stores/vacationsStore/getVacationsPeriods()';

        try {
          console.log(ORIGIN);
          const res: Periods = await getVacationsPeriods({
            status,
            page,
          });

          console.log(ORIGIN + ' - Success:', res);

          set(state => ({
            data: {
              ...state.data,
              periods: res,
            },
            loading: false,
            error: null,
          }));

          if (onSuccess) {
            onSuccess(res);
          }

          console.log(ORIGIN + ' - Successed!');
        } catch (error) {
          set({
            loading: false,
            error: error as RejectError,
          });

          if (onError) {
            onError((error as RejectError).msg || 'Unknown error');
          }

          console.log(ORIGIN + ' - Error:', error);
        }
      },
      refreshVacationsPeriods: async ({
        onSuccess,
        onError,
        status = 'all',
        page = 1,
      }) => {
        set({ refreshing: true, error: null });

        const ORIGIN = '@Stores/vacationsStore/refreshVacationsPeriods()';

        try {
          console.log(ORIGIN);
          const res: Periods = await getVacationsPeriods({
            status,
            page,
          });

          console.log(ORIGIN + ' - Success:', res);

          set(state => ({
            data: {
              ...state.data,
              periods: res,
            },
            refreshing: false,
            error: null,
          }));

          if (onSuccess) {
            onSuccess(res);
          }

          console.log(ORIGIN + ' - Successed!');
        } catch (error) {
          set({
            loading: false,
            error: error as RejectError,
          });

          if (onError) {
            onError((error as RejectError).msg || 'Unknown error');
          }

          console.log(ORIGIN + ' - Error:', error);
        }
      },

      getVacationsBalances: async ({ onSuccess, onError, page = 1 }) => {
        set({ loading: true, error: null });

        const ORIGIN = '@Stores/vacationsStore/getVacationsBalances()';

        try {
          console.log(ORIGIN);

          const res: Balances = await getVacationsBalances({
            page,
          });

          console.log(ORIGIN + ' - Success:', res);

          set(state => ({
            data: {
              ...state.data,
              balances: res,
            },
            loading: false,
            error: null,
          }));

          if (onSuccess) {
            onSuccess(res);
          }

          console.log(ORIGIN + ' - Successed!');
        } catch (error) {
          set({
            loading: false,
            error: error as RejectError,
          });

          if (onError) {
            onError((error as RejectError).msg || 'Unknown error');
          }

          console.log(ORIGIN + ' - Error:', error);
        }
      },
      loadMoreVacationsBalances: async ({ onSuccess, onError, page = 1 }) => {
        set({ loadingMore: true, error: null });

        const ORIGIN = '@Stores/vacationsStore/loadMoreVacationsBalances()';

        try {
          console.log(ORIGIN);

          const res: any = await getVacationsBalances({
            page,
          });

          console.log(ORIGIN + ' - Success:', res);

          set(state => ({
            data: {
              ...state.data,
              balances: {
                _items: [...(state.data.balances?._items || []), ...res._items],
                _meta: res._meta,
                _links: res._links,
              },
            },
            loadingMore: false,
            error: null,
          }));

          if (onSuccess) {
            onSuccess(res);
          }

          console.log(ORIGIN + ' - Successed!');
        } catch (error) {
          set({
            loadingMore: false,
            error: error as RejectError,
          });

          if (onError) {
            onError((error as RejectError).msg || 'Unknown error');
          }

          console.log(ORIGIN + ' - Error:', error);
        }
      },
      refreshVacationsBalances: async ({ onSuccess, onError, page = 1 }) => {
        set({ refreshing: true, error: null });

        const ORIGIN = '@Stores/vacationsStore/refreshVacationsBalances()';

        try {
          console.log(ORIGIN);

          const res: Balances = await getVacationsBalances({
            page,
          });

          console.log(ORIGIN + ' - Success:', res);

          set(state => ({
            data: {
              ...state.data,
              balances: res,
            },
            refreshing: false,
            error: null,
          }));

          if (onSuccess) {
            onSuccess(res);
          }

          console.log(ORIGIN + ' - Successed!');
        } catch (error) {
          set({
            refreshing: false,
            error: error as RejectError,
          });

          if (onError) {
            onError((error as RejectError).msg || 'Unknown error');
          }

          console.log(ORIGIN + ' - Error:', error);
        }
      },

      logout: () => {
        set(initialState);
      },
    }),
    {
      name: 'vacations-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
