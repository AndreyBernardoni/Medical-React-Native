import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import zustandStorage from '../storage';
import { EmployersPersistTypes, EmployersStateTypes } from './types';
import { RejectError } from './types';
import { getEmployers } from '../../services/getEmployersService';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const useEmployersStore = create<EmployersStateTypes>(
  (persist as EmployersPersistTypes)(
    set => ({
      data: initialState.data,
      loading: initialState.loading,
      error: initialState.error,
      setData: data =>
        set(state => ({
          data: { ...state.data, ...data } as EmployersStateTypes['data'],
        })),
      setError: error => set({ error }),
      setLoading: loading => set({ loading }),
      getEmployers: async ({ onSuccess, onError, page = 1 }) => {
        set({ loading: true, error: null });
        const ORIGIN = '@Stores/EmployersStore/getEmployers()';

        try {
          console.log(ORIGIN);
          const res = await getEmployers({
            page,
          });

          console.log(ORIGIN + ' - Success:', res._items);

          set({
            data: res._items,
            loading: false,
            error: null,
          });

          if (onSuccess) {
            onSuccess(res._items);
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
      name: 'employers-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
