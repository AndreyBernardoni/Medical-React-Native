import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export interface RejectError {
  ui: string;
  msg?: string;
}

export interface AmountTotals {
  extra_time: string;
  extra_time_cost: number;
  over_10h_day: number;
  less_interval: number;
  no_interval: number;
  over_6h_no_interval: number;
  less_11h_between: number;
  absenteeism: number;
  empty_worked_days: number;
}

export interface GetShortcutsResponseType {
  start_date: string;
  end_date: string;
  amount_totals: AmountTotals;
}

export interface ShortcutsStateTypes {
  data: {
    start_date: string;
    end_date: string;
    amount_totals: AmountTotals;
  } | null;
  loading: boolean;
  error: RejectError | null;
  setData: (data: Partial<ShortcutsStateTypes['data']>) => void;
  setError: (error: RejectError) => void;
  setLoading: (loading: boolean) => void;
  getShortcuts: (params: {
    onSuccess?: (data: Partial<ShortcutsStateTypes['data']>) => void;
    onError?: (error: string) => void;
    period?: string;
    page?: number;
  }) => Promise<void>;
  logout: () => void;
}

export type ShortcutsPersistTypes = (
  config: StateCreator<ShortcutsStateTypes>,
  options: PersistOptions<ShortcutsStateTypes>,
) => StateCreator<ShortcutsStateTypes>;
