import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { RejectError, UserPersistTypes, UserStateTypes } from './types';
import zustandStorage from '../storage';
import { getUser } from '../../services/getUserService';
import { GetUserResponseType } from '../../services/getUserService/types';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const useUserStore = create<UserStateTypes>(
  (persist as UserPersistTypes)(
    set => ({
      data: initialState.data,
      loading: initialState.loading,
      error: initialState.error,
      setData: data =>
        set(state => ({
          data: { ...state.data, ...data } as UserStateTypes['data'],
        })),
      setError: error => set({ error }),
      setLoading: loading => set({ loading }),
      login: async ({ onSuccess, onError }) => {
        set({ loading: true, error: null });

        const ORIGIN = '@Stores/userStore/login()';

        try {
          console.log(ORIGIN);
          const res: GetUserResponseType = await getUser();

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
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
