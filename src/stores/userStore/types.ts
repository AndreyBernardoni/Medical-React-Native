import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export interface RejectError {
  ui: string;
  msg?: string;
}

export interface UserStateTypes {
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
  } | null;
  loading: boolean;
  error: RejectError | null;
  loggedIn: boolean;
  setData: (data: Partial<UserStateTypes['data']>) => void;
  setError: (error: RejectError) => void;
  setLoading: (loading: boolean) => void;
  signIn: (params: {
    onSuccess?: (data: Partial<UserStateTypes['data']>) => void;
    onError?: (error: string) => void;
    body: any;
  }) => Promise<void>;
  signUp: (params: {
    onSuccess?: (data: Partial<UserStateTypes['data']>) => void;
    onError?: (error: string) => void;
    body: any;
  }) => Promise<void>;
  logout: () => void;
}

export type UserPersistTypes = (
  config: StateCreator<UserStateTypes>,
  options: PersistOptions<UserStateTypes>,
) => StateCreator<UserStateTypes>;
