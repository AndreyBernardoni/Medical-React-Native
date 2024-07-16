import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthPersistTypes, AuthStateTypes, RejectError } from './types';
import zustandStorage, { clearAllStores } from '../storage';
import { signIn } from '../../services/getAuthService';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const useAuthStore = create<AuthStateTypes>(
  (persist as AuthPersistTypes)(
    set => ({
      data: initialState.data,
      error: initialState.error,
      loading: initialState.loading,
      setData: data =>
        set(state => ({
          data: { ...state.data, ...data } as AuthStateTypes['data'],
        })),
      setError: error => set({ error }),
      setLoading: loading => set({ loading }),
      login: async ({ email, password, onSuccess, onError }) => {
        set({ loading: true, error: null });

        const ORIGIN = '@Stores/authStore/login()';

        try {
          console.log(ORIGIN);
          const res = await signIn(email, password);

          set({ data: res, loading: false });

          if (onSuccess) {
            onSuccess(res);
          }

          console.log(ORIGIN + ' - Success:', res);
        } catch (error) {
          set({
            loading: false,
            error: error as RejectError,
          });

          if (onError) {
            onError(error as string);
          }

          console.log(ORIGIN + ' - Error:', error);
        }
      },

      logout: ({
        onSuccess,
        onError,
      }: {
        onSuccess?: (data: AuthStateTypes['data']) => void;
        onError?: (error: string) => void;
      }) => {
        const ORIGIN = '@Stores/authStore/logout()';

        try {
          set(initialState);
          clearAllStores();
          console.log(ORIGIN + ' - Success');

          if (onSuccess) {
            onSuccess(initialState.data);
          }
        } catch (error) {
          console.log(ORIGIN + ' - Error', error);
          if (onError) {
            onError(error as string);
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
