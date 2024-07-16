export interface RejectError {
  ui: string;
  msg?: string;
}

export interface GetUserResponseType {
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
  error?: RejectError | null;
}
