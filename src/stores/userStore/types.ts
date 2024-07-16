import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export interface RejectError {
  ui: string;
  msg?: string;
}

export interface UserStateTypes {
  data: {
    _id: string;
    email: string;
    token_verification: string;
    _etag: string;
    _version: number;
    user_id: string;
    verified_user: boolean;
    roles: string[];
    _created: string;
    mobile_phone: string;
    allowed_sites: string[];
    _updated: string;
    full_name: string;
    _deleted: boolean;
    send_adjustment_email: boolean;
    account_creator: boolean;
    intercom_chat: boolean;
    is_freemium: boolean;
    is_convenia: boolean;
  } | null;
  loading: boolean;
  error: RejectError | null;
  setData: (data: Partial<UserStateTypes['data']>) => void;
  setError: (error: RejectError) => void;
  setLoading: (loading: boolean) => void;
  login: (params: {
    onSuccess?: (data: Partial<UserStateTypes['data']>) => void;
    onError?: (error: string) => void;
  }) => Promise<void>;
  logout: () => void;
}

export type UserPersistTypes = (
  config: StateCreator<UserStateTypes>,
  options: PersistOptions<UserStateTypes>,
) => StateCreator<UserStateTypes>;
