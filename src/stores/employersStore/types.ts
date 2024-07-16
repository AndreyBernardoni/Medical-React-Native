import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export interface RejectError {
  ui: string;
  msg?: string;
}

interface Address {
  cep: string;
  state: string;
  street_name: string;
  city: string;
  complement: string;
  street_number: string;
}

interface HoursBank {
  type: string;
  end_date: string;
  start_date: string;
  enabled: boolean;
  duration_months: number;
}

interface PushSettings {
  missing_records: boolean;
  journey_6h_straight: boolean;
  time_record: boolean;
  time_approval: boolean;
  '10h_journey': boolean;
  leave_approval: boolean;
  interval_end: boolean;
}

interface Convenia {
  send_app_link: boolean;
}

interface WorkManagement {
  hours_bank: HoursBank;
  push_settings: PushSettings;
  group_night_additional: boolean;
  auto_dsr_discount: boolean;
  employee_save_ts_pdf: boolean;
  auto_sunday_extra_missing_off: boolean;
  employee_show_salary_info: boolean;
  auto_vacation_absence_discount: boolean;
  dsr_disc_in_holiday_if_unjust_abs_bf_holiday: boolean;
  convenia: Convenia;
  delay_dsr_discount_enabled: boolean;
  delay_dsr_discount_value: number;
}

interface Code {
  code?: string | number | boolean;
  label?: string;
}

interface ExportData {
  pontomatic?: { codes: Record<string, Code>; empresa: Code };
  dominio?: {
    codes: Record<string, Code>;
    empresa: Code;
    hours_bank_as_extra: Code;
    sexagesimal: Code;
  };
  alterdata?: { cod_empresa: Code; codes: Record<string, Code> };
  totvs?: { codes: Record<string, Code> };
  athenas?: { cod_empresa: Code; codes: Record<string, Code> };
  metadados?: { codes: Record<string, Code> };
  contmatic?: {
    company_name: Code;
    codes: Record<string, Code>;
    sexagesimal: Code;
  };
  cenarius?: { codes: Record<string, Code> };
  adp?: { codes: Record<string, Code> };
  microsiga?: { codes: Record<string, Code> };
  prosoft?: { codes: Record<string, Code>; cod_empresa: Code };
  'sci-unico'?: { cod_empresa: Code; codes: Record<string, Code> };
  senior?: {
    tab_eve: Code;
    codes: Record<string, Code>;
    hours_bank_as_extra: Code;
    centesimal: Code;
  };
  system?: { codes: Record<string, Code> };
  masterfolha?: { codes: Record<string, Code> };
  questor_zen?: { codes: Record<string, Code>; cod_empresa: Code };
  sage?: { codes: Record<string, Code> };
}

export interface Item {
  _id: string;
  _deleted: boolean;
  user_id: string;
  _updated: string;
  period_cut_day: number;
  _created: string;
  name: string;
  address: Address;
  _version: number;
  work_management: WorkManagement;
  export_data: ExportData;
}

export interface EmployersStateTypes {
  data: Item[] | null;
  loading: boolean;
  error: RejectError | null;
  setData: (data: Partial<EmployersStateTypes['data']>) => void;
  setError: (error: RejectError) => void;
  setLoading: (loading: boolean) => void;
  getEmployers: (params: {
    onSuccess?: (data: Partial<EmployersStateTypes['data']>) => void;
    onError?: (error: string) => void;
    page?: number;
  }) => Promise<void>;
  logout: () => void;
}

export type EmployersPersistTypes = (
  config: StateCreator<EmployersStateTypes>,
  options: PersistOptions<EmployersStateTypes>,
) => StateCreator<EmployersStateTypes>;
