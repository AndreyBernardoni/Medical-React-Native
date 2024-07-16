export interface RejectError {
  ui: string;
  msg?: string;
}

export interface GetVacationsBalancesResponseType {
  _meta: Meta;
  _items: VacationsBalanceItem[];
  _links: Links;
}

export interface GetVacationsPeriodsResponseType {
  _meta: Meta;
  _items: VacationsPeriodItem[];
  _links: Links;
}

interface Links {
  next: {
    href: string;
  };
}

interface VacationsPeriodItem {
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

interface VacationsBalanceItem {
  final_balance: number;
  full_name: string;
  _id: string;
}

export interface GetVacationsSolicitationResponseType {
  _meta: Meta;
  _items: LeaveRequestItem[];
  _links: Links;
}

export interface LeaveRequestItem {
  _id: string;
  employee: Employee;
  leave_type: string;
  start_date: string;
  end_date: string;
  paid_leave: boolean;
  approval_info: ApprovalInfo;
}

export interface Meta {
  max_results: number;
  page: number;
  total: number;
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
