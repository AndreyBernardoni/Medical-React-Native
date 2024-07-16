import { GetStatusResponseType } from './types';
import { TIQUE_API_URL } from '../api/api';
import { API_ROUTES } from '../api/api_routes';
import { authGet } from '../useService';

export const getStatus = async ({
  period = 'current',
  page = 1,
}: {
  period: string;
  page: number;
}): Promise<GetStatusResponseType> => {
  const ORIGIN = '@Services/getStatusServices/getStatus():';

  return new Promise(async (resolve, reject) => {
    try {
      const route =
        TIQUE_API_URL +
        API_ROUTES.GET_STATUS +
        `?period=${period}&page=${page}`;

      const response = await authGet({
        route,
        onSuccess: data => {
          console.log(ORIGIN + 'onSuccess:', data);
        },
        onError: error => {
          console.log(ORIGIN + 'onError:', error);
        },
      });

      return resolve(response);
    } catch (error) {
      console.error(ORIGIN + 'Erro ao recuperar dados de status:', error);
      return reject({
        msg: 'GET_STATUS_ERROR',
        ui: 'Erro ao recuperar status.',
      });
    }
  });
};
