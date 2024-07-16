import { GetEmployersResponseType } from './types';
import { TIQUE_API_URL } from '../api/api';
import { API_ROUTES } from '../api/api_routes';
import { authGet } from '../useService';

export const getEmployers = async ({
  page = 1,
}: {
  page: number;
}): Promise<GetEmployersResponseType> => {
  const ORIGIN = '@Services/getEmployersServices/getEmployers():';

  return new Promise(async (resolve, reject) => {
    try {
      const route = TIQUE_API_URL + API_ROUTES.GET_EMPLOYERS + `?page=${page}`;

      console.log('route:', route);

      const response: GetEmployersResponseType = await authGet({
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
      console.error(ORIGIN + 'Erro ao recuperar dados do Employers:', error);
      return reject({
        msg: 'GET_EMPLOYERS_ERROR',
        ui: 'Erro ao recuperar atalhos.',
      });
    }
  });
};
