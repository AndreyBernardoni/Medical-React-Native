export interface RejectError {
  ui: string;
  msg?: string;
}

export interface GetUserResponseType {
  _id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  error?: RejectError | null;
}
