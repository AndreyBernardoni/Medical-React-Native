import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { RejectError, StatusPersistTypes, StatusStateTypes } from './types';
import zustandStorage from '../storage';
import { getStatus } from '../../services/getStatusService';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const useStatusStore = create<StatusStateTypes>(
  (persist as StatusPersistTypes)(
    set => ({
      data: initialState.data,
      loading: initialState.loading,
      error: initialState.error,
      setData: data =>
        set(state => ({
          data: { ...state.data, ...data } as StatusStateTypes['data'],
        })),
      setError: error => set({ error }),
      setLoading: loading => set({ loading }),
      getStatus: async ({
        onSuccess,
        onError,
        period = 'current',
        page = 1,
      }) => {
        set({ loading: true, error: null });

        const ORIGIN = '@Stores/statusStore/getStatus()';

        try {
          console.log(ORIGIN);
          const res: StatusStateTypes['data'] = await getStatus({
            period,
            page,
          });

          console.log(ORIGIN + ' - Success:', res);

          set({
            data: res,
            loading: false,
            error: null,
          });

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
      logout: () => {
        set(initialState);
      },
    }),
    {
      name: 'status-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
