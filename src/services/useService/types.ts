export interface ServiceParamsType {
  route: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}
