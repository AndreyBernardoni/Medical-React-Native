import { useAuthStore } from '../../stores/authStore';
import { tiqueApi } from '../api/api';
import { ServiceParamsType } from './types';

async function getToken() {
  try {
    const token = useAuthStore.getState().data?.token;
    return token;
  } catch (error) {
    console.log('@Services/useService/getToken() - Error:', error);
    return null;
  }
}

async function getAuthHeader() {
  try {
    const token = await getToken();
    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    console.log('@Services/useService/getAuthHeader() - Error:', error);
    return null;
  }
}

export async function authGet({
  route,
  onSuccess,
  onError,
}: ServiceParamsType): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const ORIGIN = '@Services/useService/authGet():';

    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) {
        return reject({ ui: 'sem credenciais', msg: 'EMPTY_AUTH_HEADER' });
      }

      const response = await tiqueApi.get(route, { headers: authHeader });
      const data = response?.data;

      console.log(ORIGIN + 'data:', data);

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
