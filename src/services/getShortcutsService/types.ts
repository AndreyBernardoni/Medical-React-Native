export interface RejectError {
  ui: string;
  msg?: string;
}

export interface GetShortcutsResponseType {
  start_date: string;
  end_date: string;
  amount_totals: AmountTotals;
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
