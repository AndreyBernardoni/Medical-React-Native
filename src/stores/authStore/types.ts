import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export interface RejectError {
  ui: string;
  msg?: string;
}

export interface AuthStateTypes {
  data?: {
    token?: string | null;
  } | null;
  error: RejectError | null;
  loading: boolean;
  setData: (data: Partial<AuthStateTypes['data']>) => void;
  setError: (error: RejectError | null) => void;
  setLoading: (loading: boolean) => void;
  login: (params: {
    email: string;
    password: string;
    onSuccess?: (data: Partial<AuthStateTypes['data']>) => void;
    onError?: (error: string) => void;
  }) => Promise<void>;
  logout: (params: {
    onSuccess?: (data: AuthStateTypes['data']) => void;
    onError?: (error: string) => void;
  }) => void;
}

export type AuthPersistTypes = (
  config: StateCreator<AuthStateTypes>,
  options: PersistOptions<AuthStateTypes>,
) => StateCreator<AuthStateTypes>;
