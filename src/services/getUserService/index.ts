import { GetUserResponseType } from './types';
import { TIQUE_API_URL } from '../api/api';
import { API_ROUTES } from '../api/api_routes';
import { authGet } from '../useService';

export const getUser = async (): Promise<GetUserResponseType> => {
  const ORIGIN = '@Services/getUserService/getUser():';

  return new Promise(async (resolve, reject) => {
    try {
      const route = TIQUE_API_URL + API_ROUTES.GET_USER;

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
      console.error(ORIGIN + 'Erro ao recuperar user:', error);
      return reject({ msg: 'GET_USER_ERROR', ui: 'Erro ao recuperar user.' });
    }
  });
};
