export interface RejectError {
  ui: string;
  msg?: string;
}

export interface GetStatusResponseType {
  employees_status: EmployeeStatus[];
  totals: Totals;
}

export interface EmployeeStatus {
  employee_id: string;
  employee_department: string;
  employee_name: string;
  status: Status;
}

export interface Status {
  status: string;
  worked_so_far: string;
  late_for: string;
}

export interface Totals {
  working: number;
  late: number;
  on_duty_off_day: number;
  off_duty: number;
  extra_time: number;
  early_leave: number;
  interval_time: number;
  absent_journey: number;
  today_birthdays: number;
  today_sentiments: number;
}
