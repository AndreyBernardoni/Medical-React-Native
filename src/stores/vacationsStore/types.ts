import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export interface RejectError {
  ui: string;
  msg?: string;
}

export interface GetVacationsResponseType {
  solicitations?: Solicitations | null;
  periods?: Periods | null;
  balances?: Balances | null;
}

interface Links {
  next: {
    href: string;
  };
}

export interface Solicitations {
  _meta: Meta;
  _items: VacationsSolicitationItem[];
  _links: Links;
}

export interface Periods {
  _meta: Meta;
  _items: VacationsPeriodItem[];
  _links: Links;
}

export interface Balances {
  _meta: Meta;
  _items: VacationsBalanceItem[];
  _links: Links;
}

export interface Meta {
  max_results: number;
  page: number;
  total: number;
}

export interface VacationsSolicitationItem {
  _id: string;
  employee: Employee;
  leave_type: string;
  start_date: string;
  end_date: string;
  paid_leave: boolean;
  approval_info: ApprovalInfo;
}
export interface VacationsPeriodItem {
  employee: Employee;
  acquisitive_period: AcquisitivePeriod;
  concessive_period: ConcessivePeriod;
}

interface AcquisitivePeriod {
  cycle: string;
  start_at: string;
  end_at: string;
  vacation_days_left: number;
  total_vacations_allowed: number;
  status: string;
}

interface ConcessivePeriod {
  cycle: string;
  start_at: string;
  end_at: string;
}

export interface Employee {
  _id: string;
  full_name: string;
}

export interface ApprovalInfo {
  approved: boolean;
  change_request: ChangeRequest;
}

export interface ChangeRequest {
  request_date: string;
  approved_by: ApprovedBy;
  approval_date: string;
}

export interface ApprovedBy {
  _id: string;
  name: string;
}

interface VacationsBalanceItem {
  final_balance: number;
  full_name: string;
  _id: string;
}

export interface VacationsStateTypes {
  data: GetVacationsResponseType;
  error: RejectError | null;
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;

  setData: (data: Partial<VacationsStateTypes['data']>) => void;
  setError: (error: RejectError) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMore: (loadingMore: boolean) => void;
  setRefreshing: (refreshing: boolean) => void;

  getVacationsSolicitations: (params: {
    onSuccess?: (data: Partial<Solicitations>) => void;
    onError?: (error: string) => void;
    type?: string;
  }) => Promise<void>;
  loadMoreVacationsSolicitations: (params: {
    onSuccess?: (data: Partial<Solicitations>) => void;
    onError?: (error: string) => void;
    type?: string;
    page?: number;
  }) => Promise<void>;
  refreshVacationsSolicitations: (params: {
    onSuccess?: (data: Partial<Solicitations>) => void;
    onError?: (error: string) => void;
    type?: string;
    page?: number;
  }) => Promise<void>;

  getVacationsPeriods: (params: {
    onSuccess?: (data: Partial<Periods>) => void;
    onError?: (error: string) => void;
    status?: string;
    page?: number;
  }) => Promise<void>;
  refreshVacationsPeriods: (params: {
    onSuccess?: (data: Partial<Periods>) => void;
    onError?: (error: string) => void;
    status?: string;
    page?: number;
  }) => Promise<void>;

  getVacationsBalances: (params: {
    onSuccess?: (data: Partial<Balances>) => void;
    onError?: (error: string) => void;
    page?: number;
  }) => Promise<void>;
  loadMoreVacationsBalances: (params: {
    onSuccess?: (data: Partial<Solicitations>) => void;
    onError?: (error: string) => void;
    page?: number;
  }) => Promise<void>;
  refreshVacationsBalances: (params: {
    onSuccess?: (data: Partial<Balances>) => void;
    onError?: (error: string) => void;
    page?: number;
  }) => Promise<void>;

  logout: () => void;
}

export type VacationsPersistTypes = (
  config: StateCreator<VacationsStateTypes>,
  options: PersistOptions<VacationsStateTypes>,
) => StateCreator<VacationsStateTypes>;
