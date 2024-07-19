import { useUserStore } from '../../stores/userStore';
import { medicalApi } from '../api/api';
import { ServiceParamsType } from './types';

async function checkAuth() {
  const User = useUserStore.getState().data;

  if (!User) {
    return false;
  }

  return true;
}

export async function authGet({
  route,
  onSuccess,
  onError,
  bypassLogin,
}: ServiceParamsType): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const authHeader = await checkAuth();
      if (!authHeader && !bypassLogin) {
        return reject({ ui: 'sem credenciais', msg: 'EMPTY_AUTH_HEADER' });
      }

      const response = await medicalApi.get(route);
      const data = response?.data;

      if (onSuccess) {
        onSuccess(data);
      }

      resolve(data);
    } catch (error) {
      if (onError) {
        onError(error);
      }

      reject(error);
    }
  });
}
export async function authPost({
  route,
  body,
  onSuccess,
  onError,
  bypassLogin,
}: ServiceParamsType): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const authHeader = await checkAuth();
      if (!authHeader && !bypassLogin) {
        return reject({ ui: 'sem credenciais', msg: 'EMPTY_AUTH_HEADER' });
      }

      const response = await medicalApi.post(route, body);
      const data = response?.data;

      if (onSuccess) {
        onSuccess(data);
      }

      resolve(data);
    } catch (error) {
      if (onError) {
        onError(error);
      }

      reject(error);
    }
  });
}
