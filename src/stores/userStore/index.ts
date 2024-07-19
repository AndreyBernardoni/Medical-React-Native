import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { RejectError, UserPersistTypes, UserStateTypes } from './types';
import zustandStorage from '../storage';
import { GetUserResponseType } from '../../services/getUserService/types';
import { signInUser, signUpUser } from '../../services/getUserService';

const initialState = {
  data: null,
  error: null,
  loading: false,
  loggedIn: false,
};

export const useUserStore = create<UserStateTypes>(
  (persist as UserPersistTypes)(
    set => ({
      data: initialState.data,
      loading: initialState.loading,
      error: initialState.error,
      loggedIn: initialState.loggedIn,
      setData: data =>
        set(state => ({
          data: { ...state.data, ...data } as UserStateTypes['data'],
        })),
      setError: error => set({ error }),
      setLoading: loading => set({ loading }),
      signIn: async ({ onSuccess, onError, body }) => {
        set({ loading: true, error: null });

        const ORIGIN = '@Stores/userStore/login()';

        try {
          console.log(ORIGIN);
          const res: GetUserResponseType = await signInUser({
            body,
          });

          console.log(ORIGIN + ' - Success:', res);

          set({
            data: res,
            loading: false,
            error: null,
            loggedIn: true,
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
      signUp: async ({ onSuccess, onError, body }) => {
        set({ loading: true, error: null });

        const ORIGIN = '@Stores/userStore/signUp()';

        try {
          console.log(ORIGIN + body);

          const res: GetUserResponseType = await signUpUser({
            body,
          });

          console.log(ORIGIN + ' - Success:', res);

          set({
            data: res,
            loading: false,
            error: null,
            loggedIn: true,
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
