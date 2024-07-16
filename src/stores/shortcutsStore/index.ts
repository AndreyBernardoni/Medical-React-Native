import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import zustandStorage from '../storage';
import { ShortcutsPersistTypes, ShortcutsStateTypes } from './types';
import { RejectError } from './types';
import { getShortcuts } from '../../services/getShortcutsService';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const useShortcutsStore = create<ShortcutsStateTypes>(
  (persist as ShortcutsPersistTypes)(
    set => ({
      data: initialState.data,
      loading: initialState.loading,
      error: initialState.error,
      setData: data =>
        set(state => ({
          data: { ...state.data, ...data } as ShortcutsStateTypes['data'],
        })),
      setError: error => set({ error }),
      setLoading: loading => set({ loading }),
      getShortcuts: async ({
        onSuccess,
        onError,
        period = 'current',
        page = 1,
      }) => {
        set({ loading: true, error: null });
        const ORIGIN = '@Stores/shortcutsStore/getShortcuts()';

        try {
          console.log(ORIGIN);
          const res: ShortcutsStateTypes['data'] = await getShortcuts({
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
      name: 'shortcuts-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
